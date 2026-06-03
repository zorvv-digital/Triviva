"""
Git publish operations for the Triviva admin server.
Handles staging, rule-based commit message generation, and pushing.
"""

import subprocess
import sys

# Rule-based commit labels: file_id -> (scope, human label)
_LABELS = {
    "packages.json":             ("packages",     "travel packages catalog"),
    "offer.json":                ("offers",        "promotional campaigns"),
    "contact.json":              ("contact",       "agency contact information"),
    "gallery.json":              ("gallery",       "gallery media"),
    "testimonials.json":         ("testimonials",  "customer testimonials"),
    "last_trips.json":           ("stories",       "curator trip stories"),
    "vehicles.json":             ("fleet",         "rental vehicles"),
    "perfect_destinations.json": ("destinations",  "perfect destinations grid"),
}


def generate_commit_message(modified_files):
    """
    Build a Conventional Commits message from the set of modified file IDs.

    Examples:
      {"packages.json"}               → content(packages): update travel packages catalog
      {"offer.json","contact.json"}   → content(offers,contact): update promotional campaigns and agency contact information
      4+ files                        → content: update 4 data sections
    """
    matched = [(scope, label) for fid, (scope, label) in _LABELS.items() if fid in modified_files]

    if not matched:
        return "content: update website data"

    scopes = [s for s, _ in matched]
    labels = [l for _, l in matched]

    if len(matched) == 1:
        return f"content({scopes[0]}): update {labels[0]}"
    elif len(matched) <= 3:
        scope_str = ",".join(scopes)
        label_str = ", ".join(labels[:-1]) + f" and {labels[-1]}"
        return f"content({scope_str}): update {label_str}"
    else:
        return f"content: update {len(matched)} data sections"


def _run(cmd, cwd, timeout=120):
    """Run a subprocess command and return the CompletedProcess."""
    return subprocess.run(
        cmd,
        cwd=cwd,
        capture_output=True,
        text=True,
        timeout=timeout,
        encoding="utf-8",
        errors="replace",
    )


def _friendly_error(raw_stderr, operation):
    """Convert raw git error text into a non-technical message."""
    err = (raw_stderr or "").lower()
    if "authentication failed" in err or "could not read username" in err:
        return (
            f"{operation} failed: GitHub authentication error. "
            "Make sure your Git credentials are saved on this computer."
        )
    if "rejected" in err or "non-fast-forward" in err:
        return (
            f"{operation} failed: The remote has newer changes. "
            "Run 'git pull' in the project folder first, then try publishing again."
        )
    if "no such file" in err or "'git' is not recognized" in err:
        return (
            f"{operation} failed: Git is not installed or not in PATH. "
            "Install Git from https://git-scm.com and restart the admin server."
        )
    if "nothing to commit" in err:
        return "Nothing to publish — no data files were changed."
    return f"{operation} failed: {raw_stderr.strip()[:300]}"


def git_publish(project_dir, commit_message):
    """
    Stage all public/data changes, commit with the given message, and push.

    Returns:
        (success: bool, message: str)
    """
    # 1. Stage data files
    r = _run(["git", "add", "public/data"], cwd=project_dir, timeout=30)
    if r.returncode != 0:
        return False, _friendly_error(r.stderr, "Staging files")

    # 2. Check whether anything is actually staged
    r = _run(["git", "diff", "--cached", "--quiet"], cwd=project_dir, timeout=10)
    if r.returncode == 0:
        return False, "Nothing to publish — save some changes in the admin first."

    # 3. Commit
    r = _run(["git", "commit", "-m", commit_message], cwd=project_dir)
    if r.returncode != 0:
        return False, _friendly_error(r.stderr or r.stdout, "Creating commit")

    # 4. Push
    r = _run(["git", "push"], cwd=project_dir, timeout=120)
    if r.returncode != 0:
        return False, _friendly_error(r.stderr or r.stdout, "Pushing to GitHub")

    return True, commit_message

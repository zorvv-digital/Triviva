// Triviva Portal Admin — API client
const TrivivaAPI = {
  async fetchFiles() {
    const res = await fetch("/api/files");
    if (!res.ok) throw new Error("Could not fetch editable files list.");
    return res.json();
  },

  async fetchFile(name) {
    const res = await fetch(`/api/file?name=${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error(`Could not load "${name}".`);
    return res.json();
  },

  async saveFile(name, data) {
    const res = await fetch(`/api/file?name=${encodeURIComponent(name)}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Server returned ${res.status} while saving "${name}".`);
    return res.json();
  },

  async fetchPackageDetail(id) {
    const res = await fetch(`/api/package-detail?id=${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error(`Could not load details for package "${id}".`);
    return res.json();
  },

  async savePackageDetail(id, data) {
    const res = await fetch(`/api/package-detail?id=${encodeURIComponent(id)}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Server returned ${res.status} while saving details for "${id}".`);
    return res.json();
  },

  async uploadImage(file, uploadParams) {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`/api/upload?${uploadParams}`, {
      method: "POST",
      body:   formData,
    });
    if (!res.ok) throw new Error("Image upload failed.");
    return res.json();
  },

  async publishSite(customMessage = "") {
    const res = await fetch("/api/publish", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ message: customMessage }),
    });
    // Always parse the body — even error responses carry a message
    const data = await res.json().catch(() => ({ success: false, error: "Unexpected server response." }));
    return data;
  },
};

window.TrivivaAPI = TrivivaAPI;

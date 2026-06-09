// Triviva Portal Admin - Application Controller & State Orchestrator
const TrivivaApp = {
  activeFileId: null,
  currentData: null,
  packagesList: [],
  activePackageIndex: null,
  activePackageDetails: null,
  activePackageTab: "basic",
  modifiedFiles: new Set(), // tracks which files were saved since last publish

  async init() {
    try {
      // Preload packages list for offers checkboxes & mapping
      const pkgs = await TrivivaAPI.fetchFile('packages.json');
      this.packagesList = pkgs || [];

      // Wire up save button
      const saveBtn = document.getElementById("btn-save");
      if (saveBtn) {
        saveBtn.addEventListener("click", () => this.saveChanges());
      }

      // Inject Publish button next to Save button
      if (saveBtn && saveBtn.parentNode) {
        const publishBtn = document.createElement("button");
        publishBtn.id = "btn-publish";
        publishBtn.className =
          "bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-3 rounded-xl " +
          "transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-emerald-600/15 active:scale-[0.98]";
        publishBtn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i> Publish Live`;
        publishBtn.addEventListener("click", () => this.publishChanges());
        saveBtn.parentNode.insertBefore(publishBtn, saveBtn.nextSibling);
        lucide.createIcons();
      }

      // Populate sidebar
      this.renderSidebar(TrivivaApp.ORDERED_FILES);
    } catch (err) {
      this.showToast("Connection Error", "Could not connect to admin server.", "error");
    }
  },

  ORDERED_FILES: [
    { id: "packages.json", label: "Travel Packages Catalog" },
    { id: "offer.json", label: "Promotional Campaigns" },
    { id: "perfect_destinations.json", label: "Perfect Destinations Grid" },
    { id: "gallery.json", label: "Gallery Media Catalog" },
    { id: "testimonials.json", label: "Customer Testimonials" },
    { id: "last_trips.json", label: "Curator Memory Stories" },
    { id: "vehicles.json", label: "Fleet & Vehicles List" },
    { id: "contact.json", label: "Contact Info & Working Hours" }
  ],

  renderSidebar(files) {
    const nav = document.getElementById("sidebar-nav");
    if (!nav) return;
    nav.innerHTML = "";
    files.forEach(file => {
      const btn = document.createElement("button");
      btn.className = "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between border border-transparent hover:bg-white text-mutedgray hover:text-charcoal text-xs mb-1";
      
      let iconName = "database";
      if (file.id === "packages.json") iconName = "compass";
      else if (file.id === "offer.json") iconName = "tag";
      else if (file.id === "perfect_destinations.json") iconName = "star";
      else if (file.id === "gallery.json") iconName = "image";
      else if (file.id === "testimonials.json") iconName = "message-square";
      else if (file.id === "last_trips.json") iconName = "book-open";
      else if (file.id === "vehicles.json") iconName = "bus";
      else if (file.id === "contact.json") iconName = "phone-call";

      btn.innerHTML = `
        <div class="flex items-center gap-2.5">
          <i data-lucide="${iconName}" class="w-4 h-4 text-mutedgray"></i>
          <span>${file.label}</span>
        </div>
        <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-mutedgray/65"></i>
      `;
      btn.onclick = () => this.loadFile(file.id, file.label);
      nav.appendChild(btn);
    });
    lucide.createIcons();
  },

  async loadFile(id, label) {
    const btns = document.querySelectorAll("#sidebar-nav button");
    btns.forEach(btn => btn.className = btn.className.replace("active-nav-link", ""));

    const clickedBtn = Array.from(btns).find(b => b.textContent.includes(label));
    if (clickedBtn) {
      clickedBtn.classList.add("active-nav-link");
    }

    this.activeFileId = id;
    this.activePackageIndex = null;
    this.activePackageDetails = null;

    document.getElementById("welcome-panel").classList.add("hidden");
    document.getElementById("editor-panel").classList.remove("hidden");
    document.getElementById("active-file-title").innerHTML = `${label} <span class="text-xs text-mutedgray font-mono">(${id})</span>`;

    try {
      this.currentData = await TrivivaAPI.fetchFile(id);
      this.renderForm(id, this.currentData);
    } catch (err) {
      this.showToast("Load Failed", `Could not retrieve details for ${id}.`, "error");
    }
  },

  renderForm(fileId, data) {
    const container = document.getElementById("form-container");
    if (fileId === "offer.json") {
      TrivivaUI.renderOfferForm(container, data);
    } else if (fileId === "packages.json") {
      TrivivaUI.renderPackagesForm(container, data);
    } else if (fileId === "contact.json") {
      TrivivaUI.renderContactForm(container, data);
    } else if (fileId === "testimonials.json") {
      TrivivaUI.renderTestimonialsForm(container, data);
    } else if (fileId === "last_trips.json") {
      TrivivaUI.renderStoriesForm(container, data);
    } else if (fileId === "vehicles.json") {
      TrivivaUI.renderVehiclesForm(container, data);
    } else if (fileId === "perfect_destinations.json") {
      TrivivaUI.renderPerfectDestinationsForm(container, data);
    } else if (fileId === "gallery.json") {
      TrivivaUI.renderGalleryForm(container, data);
    }
  },

  async handleImageUpload(fileInput, targetFieldId, uploadParams) {
    const file = fileInput.files[0];
    if (!file) return;

    let finalParams = uploadParams;
    const pkgIdInput = document.getElementById('pkg-details-id');
    if (pkgIdInput && pkgIdInput.value) {
      finalParams = `packageId=${pkgIdInput.value.trim()}`;
    }

    try {
      this.showToast("Uploading...", "Saving image directly in targeted directory...", "success");
      const data = await TrivivaAPI.uploadImage(file, finalParams);
      if (data.success) {
        const inputEl = document.getElementById(targetFieldId);
        if (inputEl) {
          inputEl.value = data.url;
          inputEl.dispatchEvent(new Event('change', { bubbles: true }));
        }
        this.showToast("Uploaded!", "Image added to correct folder successfully.", "success");
      } else {
        this.showToast("Upload Failed", data.error || "Save error occurred.", "error");
      }
    } catch (err) {
      this.showToast("Upload Failed", "Network transport issues occurred.", "error");
    }
  },

  // Campaigns
  setActiveExitIntent(campaignId) {
    this.currentData.forEach(offer => {
      offer.isPrimaryExitOffer = (offer.id === campaignId);
    });
    this.renderForm("offer.json", this.currentData);
  },

  updateOfferField(idx, field, value) {
    this.currentData[idx][field] = value;
  },

  updateOfferPackages(idx, wrapper) {
    const checkedBoxes = wrapper.querySelectorAll(`input[name='applicablePackages-${idx}']:checked`);
    const list = Array.from(checkedBoxes).map(cb => cb.value);
    this.currentData[idx].applicablePackages = list;
  },

  addOffer() {
    const newOffer = {
      id: "campaign-" + Date.now().toString().slice(-4),
      isActive: false,
      isPrimaryExitOffer: false,
      title: "Exclusive Discount Campaign",
      subtitle: "",
      description: "Receive a 15% discount on curated travel packages. Book this week.",
      promoCode: "SUMMER15",
      discountPercentage: 15,
      applicablePackages: []
    };
    this.currentData.push(newOffer);
    this.renderForm("offer.json", this.currentData);
  },

  deleteOffer(index) {
    if (confirm("Delete this promotional offer?")) {
      this.currentData.splice(index, 1);
      this.renderForm("offer.json", this.currentData);
    }
  },

  // Packages
  async loadPackageInEditor(pkg, index) {
    this.activePackageIndex = index;
    const workspace = document.getElementById("pkg-editor-workspace");
    if (!workspace) return;
    workspace.innerHTML = `
      <div class="animate-pulse flex flex-col gap-4">
        <div class="h-10 bg-brandnav rounded-xl"></div>
        <div class="h-64 bg-brandnav rounded-xl"></div>
      </div>
    `;

    try {
      this.activePackageDetails = await TrivivaAPI.fetchPackageDetail(pkg.id);
      TrivivaUI.renderPackageWorkspace(pkg, index);
    } catch (err) {
      this.showToast("Error", "Could not load package specification detail file.", "error");
    }
  },

  setPackageTab(tab) {
    this.activePackageTab = tab;
    if (this.activePackageIndex !== null) {
      TrivivaUI.renderPackageWorkspace(this.currentData[this.activePackageIndex], this.activePackageIndex);
    }
  },

  updatePackageField(idx, field, value) {
    this.currentData[idx][field] = value;
  },

  updatePackageDetailDirectField(field, value) {
    this.activePackageDetails[field] = value;
  },

  updatePackageHighlight(idx, hlIdx, value) {
    this.currentData[idx].highlights[hlIdx] = value;
  },

  addPackageHighlight(idx) {
    if (!this.currentData[idx].highlights) this.currentData[idx].highlights = [];
    this.currentData[idx].highlights.push("");
    TrivivaUI.renderPackageWorkspace(this.currentData[idx], idx);
  },

  removePackageHighlight(idx, hlIdx) {
    this.currentData[idx].highlights.splice(hlIdx, 1);
    TrivivaUI.renderPackageWorkspace(this.currentData[idx], idx);
  },

  updateItineraryField(dIdx, field, value) {
    this.activePackageDetails.itinerary[dIdx][field] = value;
  },

  addItineraryDay() {
    if (!this.activePackageDetails.itinerary) this.activePackageDetails.itinerary = [];
    this.activePackageDetails.itinerary.push({ day: `Day ${this.activePackageDetails.itinerary.length + 1}`, title: "Activities", description: "" });
    TrivivaUI.renderPackageWorkspace(this.currentData[this.activePackageIndex], this.activePackageIndex);
  },

  deleteItineraryDay(dIdx) {
    this.activePackageDetails.itinerary.splice(dIdx, 1);
    TrivivaUI.renderPackageWorkspace(this.currentData[this.activePackageIndex], this.activePackageIndex);
  },

  updateIncludedItem(idx, value) {
    this.activePackageDetails.included[idx] = value;
  },

  addIncludedItem() {
    if (!this.activePackageDetails.included) this.activePackageDetails.included = [];
    this.activePackageDetails.included.push("");
    TrivivaUI.renderPackageWorkspace(this.currentData[this.activePackageIndex], this.activePackageIndex);
  },

  removeIncludedItem(idx) {
    this.activePackageDetails.included.splice(idx, 1);
    TrivivaUI.renderPackageWorkspace(this.currentData[this.activePackageIndex], this.activePackageIndex);
  },

  updateGalleryImage(idx, value) {
    this.activePackageDetails.gallery[idx] = value;
    TrivivaUI.renderPackageWorkspace(this.currentData[this.activePackageIndex], this.activePackageIndex);
  },

  addGalleryImage() {
    if (!this.activePackageDetails.gallery) this.activePackageDetails.gallery = [];
    this.activePackageDetails.gallery.push("");
    TrivivaUI.renderPackageWorkspace(this.currentData[this.activePackageIndex], this.activePackageIndex);
  },

  removeGalleryImage(idx) {
    this.activePackageDetails.gallery.splice(idx, 1);
    TrivivaUI.renderPackageWorkspace(this.currentData[this.activePackageIndex], this.activePackageIndex);
  },

  addPackage() {
    const newId = "tour-" + Date.now().toString().slice(-4);
    const newPkg = {
      id: newId,
      title: "New Custom Guided Tour",
      location: "Destination, India",
      duration: "5 Days / 4 Nights",
      price: 25000,
      rating: 4.8,
      image: "/placeholder.svg",
      description: "A summary of the tour destination and general itinerary.",
      highlights: ["Highlight detail one"],
      region: "domestic",
      categories: ["Domestic"],
      priority: 10,
      showInHero: false
    };
    this.currentData.push(newPkg);
    this.activePackageIndex = this.currentData.length - 1;
    this.activePackageDetails = {
      included: ["Tour Guide", "Stay", "Transfer"],
      itinerary: [{ day: "Day 1", title: "Arrival", description: "Arrive at hotel." }],
      gallery: [],
      lat: 0,
      lng: 0
    };
    this.renderForm("packages.json", this.currentData);
    this.loadPackageInEditor(newPkg, this.activePackageIndex);
  },

  deletePackage(index) {
    if (confirm("Permanently delete this package? This cannot be undone.")) {
      this.currentData.splice(index, 1);
      this.activePackageIndex = null;
      this.activePackageDetails = null;
      this.renderForm("packages.json", this.currentData);
    }
  },

  // Contact
  updateContactField(field, value) {
    this.currentData[field] = value;
  },
  updateContactSubArray(field, value) {
    if (!this.currentData.contact) this.currentData.contact = {};
    if (!this.currentData.contact[field]) this.currentData.contact[field] = { title: "", lines: [] };
    this.currentData.contact[field].lines = value.split(",").map(s => s.trim());
  },
  updateSocialField(network, value) {
    if (!this.currentData.socials) this.currentData.socials = {};
    if (!this.currentData.socials[network]) this.currentData.socials[network] = { handle: "", url: "" };
    this.currentData.socials[network].handle = value;
    this.currentData.socials[network].url = `https://${network}.com/${value}`;
  },

  // Testimonials
  updateTestimonial(index, field, value) {
    this.currentData[index][field] = value;
  },
  addTestimonial() {
    this.currentData.push({
      name: "New Guest",
      text: "The trip was perfect and exceeded every single expectation.",
      rating: 5,
      avatar: "NG"
    });
    this.renderForm("testimonials.json", this.currentData);
  },
  deleteTestimonial(index) {
    if (confirm("Delete this review testimonial?")) {
      this.currentData.splice(index, 1);
      this.renderForm("testimonials.json", this.currentData);
    }
  },

  // Stories
  updateStory(index, field, value) {
    this.currentData[index][field] = value;
  },
  addStory() {
    this.currentData.push({
      id: "story-" + Date.now().toString().slice(-4),
      location: "Agra, India",
      title: "Taj Mahal Sunset View",
      image: "/data/stories/Memory1.webp",
      story: "A descriptive story about this trip."
    });
    this.renderForm("last_trips.json", this.currentData);
  },
  deleteStory(index) {
    if (confirm("Delete this story?")) {
      this.currentData.splice(index, 1);
      this.renderForm("last_trips.json", this.currentData);
    }
  },

  // Vehicles
  updateVehicle(index, field, value) {
    this.currentData[index][field] = value;
  },
  addVehicle() {
    this.currentData.push({
      id: "vehicle-" + Date.now().toString().slice(-4),
      name: "Volvo Luxury Tour Bus",
      type: "coach",
      capacity: "35 Seats",
      image: "/placeholder.svg",
      description: "Comfortable coach for group tours.",
      amenities: ["Air Conditioning", "Reclining Seats"],
      rating: 4.8,
      priority: 5
    });
    this.renderForm("vehicles.json", this.currentData);
  },
  deleteVehicle(index) {
    if (confirm("Delete this vehicle?")) {
      this.currentData.splice(index, 1);
      this.renderForm("vehicles.json", this.currentData);
    }
  },

  // Perfect Destinations
  updatePerfectDestination(index, field, value) {
    this.currentData[index][field] = value;
  },
  addPerfectDestination() {
    this.currentData.push({
      id: "new-tour",
      name: "Destination Name",
      rating: 4.8,
      details: "5 Days / 4 Nights",
      image: "/placeholder.svg"
    });
    this.renderForm("perfect_destinations.json", this.currentData);
  },
  deletePerfectDestination(index) {
    if (confirm("Delete this destination entry?")) {
      this.currentData.splice(index, 1);
      this.renderForm("perfect_destinations.json", this.currentData);
    }
  },

  // Gallery
  updateGalleryEnabled(val) {
    this.currentData.enabled = val;
  },
  updateGalleryItemField(index, field, value) {
    this.currentData.images[index][field] = value;
  },
  addGalleryItem() {
    if (!this.currentData.images) this.currentData.images = [];
    this.currentData.images.push({
      image: "/placeholder.svg",
      alt: "New Adventure Photo",
      className: "col-span-1 md:col-span-1 row-span-1"
    });
    this.renderForm("gallery.json", this.currentData);
  },
  deleteGalleryItem(index) {
    if (confirm("Remove this image from live gallery?")) {
      this.currentData.images.splice(index, 1);
      this.renderForm("gallery.json", this.currentData);
    }
  },

  // Main Save changes trigger
  async saveChanges() {
    if (!this.activeFileId || !this.currentData) return;

    const saveBtn = document.getElementById("btn-save");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `<div class="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin"></div> Saving...`;
    }

    try {
      const status = await TrivivaAPI.saveFile(this.activeFileId, this.currentData);
      
      if (status.success) {
        // Sync active package details when saving packages.json
        if (this.activeFileId === "packages.json" && this.activePackageIndex !== null && this.activePackageDetails) {
          const activePkg = this.currentData[this.activePackageIndex];
          const mergedDetails = {
            ...this.activePackageDetails,
            id:              activePkg.id,
            title:           activePkg.title,
            location:        activePkg.location,
            duration:        activePkg.duration,
            price:           activePkg.price,
            rating:          activePkg.rating,
            description:     activePkg.description,
            highlights:      activePkg.highlights,
            image:           activePkg.image,
            region:          activePkg.region,
            categories:      activePkg.categories,
            priority:        activePkg.priority,
            bestTimeToVisit: activePkg.bestTimeToVisit || [],
            showInHero:      activePkg.showInHero || false,
          };
          await TrivivaAPI.savePackageDetail(activePkg.id, mergedDetails);
          this.packagesList = JSON.parse(JSON.stringify(this.currentData));
        }

        // Track this file as modified (used to build publish commit message)
        this.modifiedFiles.add(this.activeFileId);

        if (status.warnings && status.warnings.length > 0) {
          this.showToast(
            "Saved with warnings",
            status.warnings[0] + (status.warnings.length > 1 ? ` (+${status.warnings.length - 1} more)` : ""),
            "error"
          );
        } else {
          this.showToast("Saved!", `${this.activeFileId} has been written to disk.`, "success");
        }
      } else {
        this.showToast("Save Failed", status.error || "Could not write content.", "error");
      }
    } catch (err) {
      this.showToast("Error", "Network connection issues occurred.", "error");
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> Save All Changes`;
      }
      lucide.createIcons();
    }
  },

  // ── Publish to GitHub ────────────────────────────────────────────────────

  async publishChanges() {
    const publishBtn = document.getElementById("btn-publish");
    if (publishBtn) {
      publishBtn.disabled = true;
      publishBtn.innerHTML = `<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Publishing...`;
    }

    try {
      const result = await TrivivaAPI.publishSite();
      if (result.success) {
        this.modifiedFiles.clear();
        this.showToast(
          "Published!",
          `Live site update pushed. Commit: "${result.commitMessage}"`,
          "success"
        );
      } else {
        this.showToast("Publish Failed", result.error || "Could not push to GitHub.", "error");
      }
    } catch (err) {
      this.showToast("Publish Failed", "Could not reach the admin server.", "error");
    } finally {
      if (publishBtn) {
        publishBtn.disabled = false;
        publishBtn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i> Publish Live`;
        lucide.createIcons();
      }
    }
  },

  showToast(title, message, type = "success") {
    const toast = document.getElementById("toast");
    const iconWrapper = document.getElementById("toast-icon-wrapper");
    const icon = document.getElementById("toast-icon");
    const titleEl = document.getElementById("toast-title");
    const descEl = document.getElementById("toast-message");

    if (!toast || !iconWrapper || !icon || !titleEl || !descEl) return;

    titleEl.innerText = title;
    descEl.innerText = message;

    if (type === "success") {
      toast.className = toast.className.replace(/border-red-500\/30/g, "border-emerald-500/30");
      iconWrapper.className = iconWrapper.className.replace(/bg-red-500\/10/g, "bg-emerald-500/10");
      iconWrapper.className = iconWrapper.className.replace(/text-red-600/g, "text-emerald-600");
      icon.setAttribute("data-lucide", "check-circle");
    } else {
      toast.className = toast.className.replace(/border-emerald-500\/30/g, "border-red-500/30");
      iconWrapper.className = iconWrapper.className.replace(/bg-emerald-500\/10/g, "bg-red-500/10");
      iconWrapper.className = iconWrapper.className.replace(/text-emerald-600/g, "text-red-600");
      icon.setAttribute("data-lucide", "alert-circle");
    }

    lucide.createIcons();
    toast.classList.remove("translate-y-20", "opacity-0");
    
    setTimeout(() => {
      toast.classList.add("translate-y-20", "opacity-0");
    }, 4500);
  },

  validateId(inputEl, currentIndex, fileId) {
    const val = inputEl.value.trim();
    const feedbackEl = inputEl.nextElementSibling;
    
    const validChars = /^[a-z0-9_-]+$/;
    let errorMsg = "";
    
    if (!val) {
      errorMsg = "ID is required.";
    } else if (inputEl.value.includes(" ")) {
      errorMsg = "Spaces are not allowed.";
    } else if (!validChars.test(val)) {
      errorMsg = "Use lowercase alphanumeric, hyphens (-) or underscores (_) only.";
    } else {
      let isDuplicate = false;
      if (fileId === "packages.json") {
        isDuplicate = this.currentData.some((pkg, idx) => idx !== currentIndex && pkg.id === val);
      } else if (fileId === "offer.json") {
        isDuplicate = this.currentData.some((offer, idx) => idx !== currentIndex && offer.id === val);
      } else if (fileId === "last_trips.json") {
        isDuplicate = this.currentData.some((story, idx) => idx !== currentIndex && story.id === val);
      } else if (fileId === "vehicles.json") {
        isDuplicate = this.currentData.some((veh, idx) => idx !== currentIndex && veh.id === val);
      }
      
      if (isDuplicate) {
        errorMsg = "This identifier already exists.";
      }
    }
    
    const saveBtn = document.getElementById("btn-save");
    if (errorMsg) {
      inputEl.classList.add("border-red-500", "focus:border-red-500");
      inputEl.classList.remove("focus:border-primary", "border-brandborder");
      feedbackEl.innerText = errorMsg;
      feedbackEl.className = "text-[9px] text-red-500 mt-1 block id-feedback font-semibold animate-pulse";
      if (saveBtn) saveBtn.disabled = true;
    } else {
      inputEl.classList.remove("border-red-500", "focus:border-red-500");
      inputEl.classList.add("focus:border-primary", "border-brandborder");
      feedbackEl.innerText = "Identifier is valid and available.";
      feedbackEl.className = "text-[9px] text-emerald-600 mt-1 block id-feedback font-semibold";
      
      this.currentData[currentIndex].id = val;
      
      if (fileId === "packages.json" && this.activePackageIndex === currentIndex && this.activePackageDetails) {
        this.activePackageDetails.id = val;
      }
      
      const allErrors = document.querySelectorAll(".id-feedback.text-red-500");
      if (allErrors.length === 0 && saveBtn) {
        saveBtn.disabled = false;
      }
    }
  }
};

window.TrivivaApp = TrivivaApp;
TrivivaApp.init();

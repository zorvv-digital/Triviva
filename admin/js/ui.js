// Triviva Portal Admin - UI Rendering Modules
const TrivivaUI = {
  // --- GENERIC IMAGE UPLOADER ---
  renderImageUploaderHtml(fieldId, currentValue, uploadParams = "") {
    return `
      <div class="flex gap-2 font-sans">
        <input type="text" id="${fieldId}" value="${currentValue || ''}" class="flex-1 bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors font-mono" placeholder="Image URL path" />
        <label class="bg-brandnav hover:bg-brandborder text-charcoal text-[10px] font-bold px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1 shrink-0 border border-brandborder select-none">
          <i data-lucide="upload" class="w-3.5 h-3.5 text-primary"></i> Upload
          <input type="file" accept="image/*" class="hidden" onchange="TrivivaApp.handleImageUpload(this, '${fieldId}', '${uploadParams}')" />
        </label>
      </div>
    `;
  },

  // --- FORM 1: OFFERS ---
  renderOfferForm(container, offers) {
    // Render exit intent dropdown at the top
    container.innerHTML = `
      <div class="flex flex-col gap-6 font-sans">
        <div class="flex items-center justify-between border-b border-brandborder pb-4">
          <h3 class="text-sm font-bold text-charcoal flex items-center gap-2 font-display">
            <i data-lucide="tag" class="text-primary w-4.5 h-4.5"></i> Promotional Campaigns
          </h3>
          <button onclick="TrivivaApp.addOffer()" class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add New Offer
          </button>
        </div>

        <!-- Single Exit-Intent Campaign Dropdown Selector -->
        <div class="bg-brandnav/30 border border-brandborder p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
              <i data-lucide="sparkles" class="w-4 h-4"></i>
            </div>
            <div>
              <span class="text-xs font-bold text-charcoal block">Active Exit Intent Modal Campaign</span>
              <span class="text-[10px] text-mutedgray block">Only one campaign can show on exit intent.</span>
            </div>
          </div>
          <select onchange="TrivivaApp.setActiveExitIntent(this.value)" class="bg-white border border-brandborder rounded-xl px-4 py-2 text-xs text-charcoal focus:outline-none focus:border-primary shadow-inner min-w-[200px]">
            <option value="">-- No Active Exit Intent Offer --</option>
            ${offers.map((offer, idx) => `
              <option value="${offer.id}" ${offer.isPrimaryExitOffer ? 'selected' : ''}>${offer.title || offer.id} (${offer.id})</option>
            `).join("")}
          </select>
        </div>

        <div class="flex flex-col gap-6" id="offers-list"></div>
      </div>
    `;

    const listDiv = document.getElementById("offers-list");

    offers.forEach((offer, index) => {
      const card = document.createElement("div");
      const isOffer1 = index === 0;
      const offerLabel = isOffer1 ? "Offer One: International Curations" : `Offer ${index + 1}: Domestic Escapes`;
      const borderAccent = isOffer1 ? "border-l-4 border-l-orange-500" : "border-l-4 border-l-amber-600";
      const bgAccent = isOffer1 ? "bg-orange-50/20" : "bg-amber-50/20";

      card.className = `p-6 rounded-2xl border border-brandborder ${borderAccent} ${bgAccent} flex flex-col gap-5 relative overflow-hidden group transition-all`;
      card.dataset.index = index;

      const packageCheckboxes = TrivivaApp.packagesList.map(pkg => {
        const isChecked = offer.applicablePackages && offer.applicablePackages.includes(pkg.id);
        return `
          <label class="flex items-center gap-3 p-3 bg-white border border-brandborder hover:border-primary/40 rounded-xl cursor-pointer select-none transition-colors">
            <input type="checkbox" name="applicablePackages-${index}" value="${pkg.id}" ${isChecked ? 'checked' : ''} class="w-4 h-4 rounded text-primary focus:ring-primary accent-primary" />
            <div class="flex flex-col">
              <span class="text-xs font-semibold text-charcoal">${pkg.title}</span>
              <span class="text-[10px] text-mutedgray font-mono">${pkg.id}</span>
            </div>
          </label>
        `;
      }).join("");

      card.innerHTML = `
        <div class="flex items-center justify-between border-b border-brandborder pb-3">
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-primary font-mono uppercase tracking-wider">${offerLabel}</span>
            <span class="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${offer.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'}">
              ${offer.isActive ? 'Active' : 'Draft'}
            </span>
            ${offer.isPrimaryExitOffer ? `
              <span class="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-orange-100 text-orange-800 flex items-center gap-1 shadow-sm border border-orange-200">
                <i data-lucide="sparkles" class="w-2.5 h-2.5"></i> Exit Intent Active
              </span>
            ` : ''}
          </div>
          <button onclick="TrivivaApp.deleteOffer(${index})" class="text-mutedgray hover:text-red-600 p-1.5 rounded-lg hover:bg-brandnav transition-colors" title="Delete Offer">
            <i data-lucide="trash" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Offer Unique ID</label>
            <input type="text" value="${offer.id || ''}" oninput="TrivivaApp.validateId(this, ${index}, 'offer.json')" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono transition-colors" placeholder="e.g. summer-discount" required />
            <span class="text-[9px] text-mutedgray mt-1 block id-feedback font-medium">Use lowercase letters, numbers, hyphens (-) or underscores (_). No spaces.</span>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Discount Percentage (%)</label>
            <input type="number" min="0" max="100" value="${offer.discountPercentage || 0}" onchange="TrivivaApp.updateOfferField(${index}, 'discountPercentage', parseInt(this.value))" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors font-mono" placeholder="15" required />
          </div>
          <div class="flex items-center gap-6 mt-4 md:mt-0">
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" ${offer.isActive ? 'checked' : ''} onchange="TrivivaApp.updateOfferField(${index}, 'isActive', this.checked)" class="w-4 h-4 rounded text-primary focus:ring-primary accent-primary" />
              <span class="text-xs font-semibold text-charcoal">Campaign Active</span>
            </label>
          </div>

          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Offer Title</label>
            <input type="text" value="${offer.title || ''}" onchange="TrivivaApp.updateOfferField(${index}, 'title', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors" placeholder="Exclusive Getaway Deals" required />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Promo Code Box Text</label>
            <input type="text" value="${offer.promoCode || ''}" onchange="TrivivaApp.updateOfferField(${index}, 'promoCode', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors font-mono" placeholder="ADVENTURE15" />
          </div>

          <div class="md:col-span-3">
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Campaign Description</label>
            <textarea onchange="TrivivaApp.updateOfferField(${index}, 'description', this.value)" rows="2" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors leading-relaxed" placeholder="Unlock 15% discount for a limited time..." required>${offer.description || ''}</textarea>
          </div>
        </div>

        <div class="border-t border-brandborder pt-4 mt-2">
          <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-3 flex items-center gap-1">
            <i data-lucide="check-square" class="w-3.5 h-3.5 text-primary"></i> Select Qualified Packages (Exit-Intent Cards)
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3" onchange="TrivivaApp.updateOfferPackages(${index}, this)">
            ${packageCheckboxes}
          </div>
        </div>
      `;
      listDiv.appendChild(card);
    });
    lucide.createIcons();
  },

  // --- FORM 2: PACKAGES ---
  renderPackagesForm(container, packages) {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 border-b border-brandborder pb-4 font-sans">
        <h3 class="text-sm font-bold text-charcoal flex items-center gap-2 font-display">
          <i data-lucide="compass" class="text-primary w-4.5 h-4.5"></i> Travel Packages Catalog
        </h3>
        <button onclick="TrivivaApp.addPackage()" class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add New Package
        </button>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
        <div class="lg:col-span-1 border-r border-brandborder pr-0 lg:pr-6 flex flex-col gap-2 max-h-[600px] overflow-y-auto custom-scrollbar" id="pkg-selection-list">
          <!-- Dynamic selection list -->
        </div>
        <div class="lg:col-span-2" id="pkg-editor-workspace">
          <div class="p-8 border border-dashed border-brandborder rounded-2xl text-center text-mutedgray text-sm">
            Select a travel package from the side list to begin modification.
          </div>
        </div>
      </div>
    `;

    this.renderPackageSelectionList(packages);
  },

  renderPackageSelectionList(packages) {
    const container = document.getElementById("pkg-selection-list");
    container.innerHTML = "";
    packages.forEach((pkg, index) => {
      const item = document.createElement("button");
      item.className = "w-full text-left p-3 rounded-xl border border-brandborder bg-white hover:bg-brandnav/30 text-charcoal transition-all flex items-center justify-between text-xs mb-1";
      item.innerHTML = `
        <div class="flex flex-col">
          <span class="font-semibold text-charcoal">${pkg.title || 'Untitled Tour'}</span>
          <span class="text-[10px] text-mutedgray mt-1 font-mono">${pkg.location} • ₹${(pkg.price || 0).toLocaleString()}</span>
        </div>
        <i data-lucide="edit-3" class="w-3.5 h-3.5 text-mutedgray"></i>
      `;
      item.onclick = () => TrivivaApp.loadPackageInEditor(pkg, index);
      container.appendChild(item);
    });
    lucide.createIcons();
  },

  renderPackageWorkspace(pkg, index) {
    const workspace = document.getElementById("pkg-editor-workspace");
    workspace.innerHTML = `
      <div class="flex flex-col gap-5 border border-brandborder p-5 rounded-2xl bg-white shadow-sm font-sans">
        <!-- Editor Sub Header -->
        <div class="flex items-center justify-between border-b border-brandborder pb-3">
          <div>
            <h4 class="text-sm font-bold text-charcoal font-display">${pkg.title || 'Curating Tour'}</h4>
            <p class="text-[10px] text-mutedgray font-mono">ID: ${pkg.id}</p>
          </div>
          <button onclick="TrivivaApp.deletePackage(${index})" class="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Delete Package
          </button>
        </div>

        <!-- Tabs Navigation -->
        <div class="flex gap-4 border-b border-brandborder text-xs">
          <button onclick="TrivivaApp.setPackageTab('basic')" class="pb-2 ${TrivivaApp.activePackageTab === 'basic' ? 'tab-active' : 'text-mutedgray'}">Basic Settings</button>
          <button onclick="TrivivaApp.setPackageTab('itinerary')" class="pb-2 ${TrivivaApp.activePackageTab === 'itinerary' ? 'tab-active' : 'text-mutedgray'}">Itinerary</button>
          <button onclick="TrivivaApp.setPackageTab('included')" class="pb-2 ${TrivivaApp.activePackageTab === 'included' ? 'tab-active' : 'text-mutedgray'}">Inclusions</button>
          <button onclick="TrivivaApp.setPackageTab('gallery')" class="pb-2 ${TrivivaApp.activePackageTab === 'gallery' ? 'tab-active' : 'text-mutedgray'}">Gallery Media</button>
        </div>

        <!-- Tab Work Area -->
        <div id="pkg-tab-content" class="flex flex-col gap-4"></div>
      </div>
    `;
    this.renderPackageTabContent(pkg, index);
    lucide.createIcons();
  },

  renderPackageTabContent(pkg, index) {
    const tabContent = document.getElementById("pkg-tab-content");
    tabContent.innerHTML = "";

    if (TrivivaApp.activePackageTab === "basic") {
      const imgUploaderHtml = this.renderImageUploaderHtml(`pkg-cover-${index}`, pkg.image, `packageId=${pkg.id}`);
      tabContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Package Unique ID</label>
            <input type="text" id="pkg-details-id" value="${pkg.id || ''}" oninput="TrivivaApp.validateId(this, ${index}, 'packages.json')" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono transition-colors" placeholder="e.g. ooty-tour-pack" required />
            <span class="text-[9px] text-mutedgray mt-1 block id-feedback font-medium">Use lowercase letters, numbers, hyphens (-) or underscores (_). No spaces.</span>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Region Type</label>
            <select onchange="TrivivaApp.updatePackageField(${index}, 'region', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors">
              <option value="domestic" ${pkg.region === 'domestic' ? 'selected' : ''}>Domestic (India)</option>
              <option value="international" ${pkg.region === 'international' ? 'selected' : ''}>International</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Tour Title</label>
            <input type="text" value="${pkg.title || ''}" onchange="TrivivaApp.updatePackageField(${index}, 'title', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors" placeholder="Bali: Bliss & Island Magic" required />
          </div>

          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Location Name</label>
            <input type="text" value="${pkg.location || ''}" onchange="TrivivaApp.updatePackageField(${index}, 'location', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors" placeholder="Bali, Indonesia" required />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Duration Details</label>
            <input type="text" value="${pkg.duration || ''}" onchange="TrivivaApp.updatePackageField(${index}, 'duration', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors" placeholder="5 Days / 4 Nights" required />
          </div>

          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Original Price (₹)</label>
            <input type="number" value="${pkg.price || 0}" onchange="TrivivaApp.updatePackageField(${index}, 'price', parseInt(this.value))" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors font-mono" placeholder="25000" required />
          </div>
          <div class="flex items-center gap-6 mt-6">
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" ${pkg.showInHero ? 'checked' : ''} onchange="TrivivaApp.updatePackageField(${index}, 'showInHero', this.checked)" class="w-4 h-4 rounded text-primary focus:ring-primary accent-primary" />
              <span class="text-xs font-semibold text-charcoal">Show in Carousel</span>
            </label>
          </div>

          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Short Description</label>
            <textarea onchange="TrivivaApp.updatePackageField(${index}, 'description', this.value)" rows="3" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors leading-relaxed" required>${pkg.description || ''}</textarea>
          </div>

          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Cover Image (Package specific uploads)</label>
            <div onchange="TrivivaApp.updatePackageField(${index}, 'image', document.getElementById('pkg-cover-${index}').value)">
              ${imgUploaderHtml}
            </div>
          </div>
          
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Latitude (Map)</label>
            <input type="number" step="any" value="${TrivivaApp.activePackageDetails.lat || 0}" onchange="TrivivaApp.updatePackageDetailDirectField('lat', parseFloat(this.value))" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors font-mono" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Longitude (Map)</label>
            <input type="number" step="any" value="${TrivivaApp.activePackageDetails.lng || 0}" onchange="TrivivaApp.updatePackageDetailDirectField('lng', parseFloat(this.value))" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none transition-colors font-mono" />
          </div>
        </div>
        
        <div class="border-t border-brandborder pt-5 mt-4">
          <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-2">Key Highlight Tags</label>
          <div id="pkg-highlights-container" class="flex flex-col gap-2">
            ${(pkg.highlights || []).map((hl, hlIdx) => `
              <div class="flex gap-2 items-center">
                <input type="text" value="${hl}" onchange="TrivivaApp.updatePackageHighlight(${index}, ${hlIdx}, this.value)" class="flex-1 bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-1.5 text-xs text-charcoal focus:outline-none" />
                <button onclick="TrivivaApp.removePackageHighlight(${index}, ${hlIdx})" class="text-mutedgray hover:text-red-650 p-1.5"><i data-lucide="minus-circle" class="w-4 h-4"></i></button>
              </div>
            `).join("")}
          </div>
          <button onclick="TrivivaApp.addPackageHighlight(${index})" class="text-xs text-primary font-semibold hover:text-primary-dark mt-2 flex items-center gap-1 select-none">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Highlight Tag
          </button>
        </div>
      `;
    } 
    
    else if (TrivivaApp.activePackageTab === "itinerary") {
      tabContent.innerHTML = `
        <div class="flex items-center justify-between mb-4 pb-2 border-b border-brandborder">
          <h5 class="text-xs font-bold text-mutedgray uppercase tracking-wider">Day-by-Day Tour Itinerary</h5>
          <button onclick="TrivivaApp.addItineraryDay()" class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-[10px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add New Day
          </button>
        </div>
        <div class="flex flex-col gap-4" id="itinerary-days-list">
          ${(TrivivaApp.activePackageDetails.itinerary || []).map((day, dIdx) => `
            <div class="p-4 rounded-xl bg-brandnav/30 border border-brandborder flex flex-col gap-3 relative group">
              <button onclick="TrivivaApp.deleteItineraryDay(${dIdx})" class="absolute top-3 right-3 text-mutedgray hover:text-red-500 p-1.5 transition-colors">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div class="col-span-1">
                  <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1">Day Tag</label>
                  <input type="text" value="${day.day || ''}" onchange="TrivivaApp.updateItineraryField(${dIdx}, 'day', this.value)" class="w-full bg-white border border-brandborder rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none font-mono" placeholder="Day 1" />
                </div>
                <div class="col-span-3">
                  <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1">Day Title</label>
                  <input type="text" value="${day.title || ''}" onchange="TrivivaApp.updateItineraryField(${dIdx}, 'title', this.value)" class="w-full bg-white border border-brandborder rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none" placeholder="Arrival & Leisure" />
                </div>
              </div>
              <div>
                <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1">Activities Description</label>
                <textarea onchange="TrivivaApp.updateItineraryField(${dIdx}, 'description', this.value)" rows="2" class="w-full bg-white border border-brandborder rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none leading-relaxed" placeholder="Detailed day description...">${day.description || ''}</textarea>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    } 
    
    else if (TrivivaApp.activePackageTab === "included") {
      tabContent.innerHTML = `
        <div class="flex items-center justify-between mb-4 pb-2 border-b border-brandborder">
          <h5 class="text-xs font-bold text-mutedgray uppercase tracking-wider">Services Included in Package</h5>
          <button onclick="TrivivaApp.addIncludedItem()" class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-[10px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Included Item
          </button>
        </div>
        <div class="flex flex-col gap-2" id="included-items-list">
          ${(TrivivaApp.activePackageDetails.included || []).map((item, idx) => `
            <div class="flex items-center gap-2">
              <input type="text" value="${item}" onchange="TrivivaApp.updateIncludedItem(${idx}, this.value)" class="flex-1 bg-white border border-brandborder rounded-xl px-4 py-2 text-xs text-charcoal focus:outline-none" />
              <button onclick="TrivivaApp.removeIncludedItem(${idx})" class="text-mutedgray hover:text-red-600 p-2"><i data-lucide="minus-circle" class="w-4 h-4"></i></button>
            </div>
          `).join("")}
        </div>
      `;
    } 
    
    else if (TrivivaApp.activePackageTab === "gallery") {
      tabContent.innerHTML = `
        <div class="flex items-center justify-between mb-4 pb-2 border-b border-brandborder">
          <h5 class="text-xs font-bold text-mutedgray uppercase tracking-wider">Image Gallery (Package specific uploads)</h5>
          <button onclick="TrivivaApp.addGalleryImage()" class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-[10px] font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-all">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add New Image
          </button>
        </div>
        <div class="flex flex-col gap-4" id="gallery-list">
          ${(TrivivaApp.activePackageDetails.gallery || []).map((img, idx) => {
            const uploaderHtml = this.renderImageUploaderHtml(`gallery-img-${idx}`, img, `packageId=${pkg.id}`);
            return `
              <div class="p-4 bg-white border border-brandborder rounded-xl flex flex-col sm:flex-row gap-4 items-center">
                <div class="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-brandnav border border-brandborder">
                  <img src="${img}" alt="Preview" class="w-full h-full object-cover" onerror="this.src='/placeholder.svg'" />
                </div>
                <div class="flex-1 w-full" onchange="TrivivaApp.updateGalleryImage(${idx}, document.getElementById('gallery-img-${idx}').value)">
                  ${uploaderHtml}
                </div>
                <button onclick="TrivivaApp.removeGalleryImage(${idx})" class="text-mutedgray hover:text-red-500 p-2"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }
    lucide.createIcons();
  },

  // --- FORM 3: CONTACT ---
  renderContactForm(container, contact) {
    container.innerHTML = `
      <div class="flex items-center gap-2 mb-6 border-b border-brandborder pb-4 font-sans">
        <i data-lucide="phone-call" class="text-primary w-4.5 h-4.5"></i>
        <h3 class="text-sm font-bold text-charcoal font-display">Agency Contact Details</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
        <div>
          <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Agency Name</label>
          <input type="text" value="${contact.agencyName || ''}" onchange="TrivivaApp.updateContactField('agencyName', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none transition-colors" />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Slogan / Tagline</label>
          <input type="text" value="${contact.tagline || ''}" onchange="TrivivaApp.updateContactField('tagline', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none transition-colors" />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Phone Lines (comma separated)</label>
          <input type="text" value="${(contact.contact?.phone?.lines || []).join(', ')}" onchange="TrivivaApp.updateContactSubArray('phone', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none transition-colors font-mono" />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-1.5">Emails (comma separated)</label>
          <input type="text" value="${(contact.contact?.email?.lines || []).join(', ')}" onchange="TrivivaApp.updateContactSubArray('email', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none transition-colors font-mono" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-mutedgray uppercase tracking-wide mb-2">Social Profiles Handles (Instagram, Twitter, YouTube)</label>
          <div class="grid grid-cols-3 gap-4">
            <input type="text" value="${contact.socials?.instagram?.handle || ''}" onchange="TrivivaApp.updateSocialField('instagram', this.value)" class="bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono" placeholder="Instagram handle" />
            <input type="text" value="${contact.socials?.twitter?.handle || ''}" onchange="TrivivaApp.updateSocialField('twitter', this.value)" class="bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono" placeholder="Twitter handle" />
            <input type="text" value="${contact.socials?.youtube?.handle || ''}" onchange="TrivivaApp.updateSocialField('youtube', this.value)" class="bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono" placeholder="YouTube handle" />
          </div>
        </div>
      </div>
    `;
  },

  // --- FORM 4: TESTIMONIALS ---
  renderTestimonialsForm(container, testimonials) {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 border-b border-brandborder pb-4 font-sans">
        <h3 class="text-sm font-bold text-charcoal flex items-center gap-2 font-display">
          <i data-lucide="message-square" class="text-primary w-4.5 h-4.5"></i> Customer Testimonials
        </h3>
        <button onclick="TrivivaApp.addTestimonial()" class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Review
        </button>
      </div>
      <div class="flex flex-col gap-6 font-sans" id="testimonials-list"></div>
    `;

    const list = document.getElementById("testimonials-list");
    testimonials.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "p-5 rounded-2xl bg-white border border-brandborder flex flex-col gap-4 relative group shadow-sm";
      row.innerHTML = `
        <button onclick="TrivivaApp.deleteTestimonial(${index})" class="absolute top-4 right-4 text-mutedgray hover:text-red-650 p-1.5 hover:bg-brandnav rounded transition-all">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Reviewer Name</label>
            <input type="text" value="${item.name || ''}" onchange="TrivivaApp.updateTestimonial(${index}, 'name', this.value)" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Stars Rating (1 to 5)</label>
            <input type="number" min="1" max="5" value="${item.rating || 5}" onchange="TrivivaApp.updateTestimonial(${index}, 'rating', parseInt(this.value))" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Initials Avatar</label>
            <input type="text" value="${item.avatar || ''}" onchange="TrivivaApp.updateTestimonial(${index}, 'avatar', this.value)" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono" placeholder="e.g. SA" />
          </div>
          
          <div class="md:col-span-3">
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Review Quote Message</label>
            <textarea onchange="TrivivaApp.updateTestimonial(${index}, 'text', this.value)" rows="2" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none leading-relaxed">${item.text || ''}</textarea>
          </div>
        </div>
      `;
      list.appendChild(row);
    });
    lucide.createIcons();
  },

  // --- FORM 5: STORIES ---
  renderStoriesForm(container, stories) {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 border-b border-brandborder pb-4 font-sans">
        <h3 class="text-sm font-bold text-charcoal flex items-center gap-2 font-display">
          <i data-lucide="book-open" class="text-primary w-4.5 h-4.5"></i> Curator Memory Stories
        </h3>
        <button onclick="TrivivaApp.addStory()" class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add New Story
        </button>
      </div>
      <div class="flex flex-col gap-6 font-sans" id="stories-list"></div>
    `;

    const list = document.getElementById("stories-list");
    stories.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "p-5 rounded-2xl bg-white border border-brandborder flex flex-col gap-4 relative group shadow-sm";
      const imgUploaderHtml = this.renderImageUploaderHtml(`story-img-${index}`, item.image, 'target=stories');

      row.innerHTML = `
        <button onclick="TrivivaApp.deleteStory(${index})" class="absolute top-4 right-4 text-mutedgray hover:text-red-650 p-1.5 hover:bg-brandnav rounded transition-all">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Story Code ID</label>
            <input type="text" value="${item.id || ''}" oninput="TrivivaApp.validateId(this, ${index}, 'last_trips.json')" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono transition-colors" placeholder="e.g. kashmir-valleys" required />
            <span class="text-[9px] text-mutedgray mt-1 block id-feedback font-medium">Use lowercase letters, numbers, hyphens (-) or underscores (_). No spaces.</span>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Location</label>
            <input type="text" value="${item.location || ''}" onchange="TrivivaApp.updateStory(${index}, 'location', this.value)" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Story Title</label>
            <input type="text" value="${item.title || ''}" onchange="TrivivaApp.updateStory(${index}, 'title', this.value)" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Story Cover Image (Stories directory)</label>
            <div onchange="TrivivaApp.updateStory(${index}, 'image', document.getElementById('story-img-${index}').value)">
              ${imgUploaderHtml}
            </div>
          </div>
          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Story Text Description</label>
            <textarea onchange="TrivivaApp.updateStory(${index}, 'story', this.value)" rows="3" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none leading-relaxed">${item.story || ''}</textarea>
          </div>
        </div>
      `;
      list.appendChild(row);
    });
    lucide.createIcons();
  },

  // --- FORM 6: VEHICLES ---
  renderVehiclesForm(container, vehicles) {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 border-b border-brandborder pb-4 font-sans">
        <h3 class="text-sm font-bold text-charcoal flex items-center gap-2 font-display">
          <i data-lucide="bus" class="text-primary w-4.5 h-4.5"></i> Fleet & Vehicles List
        </h3>
        <button onclick="TrivivaApp.addVehicle()" class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Vehicle
        </button>
      </div>
      <div class="flex flex-col gap-6 font-sans" id="vehicles-list"></div>
    `;

    const list = document.getElementById("vehicles-list");
    vehicles.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "p-5 rounded-2xl bg-white border border-brandborder flex flex-col gap-4 relative group shadow-sm";
      const imgUploaderHtml = this.renderImageUploaderHtml(`vehicle-img-${index}`, item.image, 'target=vehicles');

      row.innerHTML = `
        <button onclick="TrivivaApp.deleteVehicle(${index})" class="absolute top-4 right-4 text-mutedgray hover:text-red-650 p-1.5 hover:bg-brandnav rounded transition-all">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Vehicle Code ID</label>
            <input type="text" value="${item.id || ''}" oninput="TrivivaApp.validateId(this, ${index}, 'vehicles.json')" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono transition-colors" placeholder="e.g. traveller-tempo-12" required />
            <span class="text-[9px] text-mutedgray mt-1 block id-feedback font-medium">Use lowercase letters, numbers, hyphens (-) or underscores (_). No spaces.</span>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Vehicle Name</label>
            <input type="text" value="${item.name || ''}" onchange="TrivivaApp.updateVehicle(${index}, 'name', this.value)" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Vehicle Type</label>
            <select onchange="TrivivaApp.updateVehicle(${index}, 'type', this.value)" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none">
              <option value="coach" ${item.type === 'coach' ? 'selected' : ''}>Luxury Coach</option>
              <option value="minibus" ${item.type === 'minibus' ? 'selected' : ''}>Mini Bus / Traveller</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Seating Capacity</label>
            <input type="text" value="${item.capacity || ''}" onchange="TrivivaApp.updateVehicle(${index}, 'capacity', this.value)" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none" placeholder="17 Seats" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Rating</label>
            <input type="number" step="0.1" value="${item.rating || 4.8}" onchange="TrivivaApp.updateVehicle(${index}, 'rating', parseFloat(this.value))" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Display Priority</label>
            <input type="number" value="${item.priority || 1}" onchange="TrivivaApp.updateVehicle(${index}, 'priority', parseInt(this.value))" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Vehicle Image (Vehicles directory)</label>
            <div onchange="TrivivaApp.updateVehicle(${index}, 'image', document.getElementById('vehicle-img-${index}').value)">
              ${imgUploaderHtml}
            </div>
          </div>
          <div class="md:col-span-3">
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Vehicle Description</label>
            <textarea onchange="TrivivaApp.updateVehicle(${index}, 'description', this.value)" rows="2" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none leading-relaxed">${item.description || ''}</textarea>
          </div>
        </div>
      `;
      list.appendChild(row);
    });
    lucide.createIcons();
  },

  // --- FORM 7: PERFECT DESTINATIONS ---
  renderPerfectDestinationsForm(container, destinations) {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 border-b border-brandborder pb-4 font-sans">
        <h3 class="text-sm font-bold text-charcoal flex items-center gap-2 font-display">
          <i data-lucide="star" class="text-primary w-4.5 h-4.5"></i> Perfect Destinations Grid
        </h3>
        <button onclick="TrivivaApp.addPerfectDestination()" class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Destination
        </button>
      </div>
      <div class="flex flex-col gap-6 font-sans" id="destinations-list"></div>
    `;

    const list = document.getElementById("destinations-list");
    destinations.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "p-5 rounded-2xl bg-white border border-brandborder flex flex-col gap-4 relative group shadow-sm";
      const imgUploaderHtml = this.renderImageUploaderHtml(`dest-img-${index}`, item.image, `packageId=${item.id}`);

      row.innerHTML = `
        <button onclick="TrivivaApp.deletePerfectDestination(${index})" class="absolute top-4 right-4 text-mutedgray hover:text-red-650 p-1.5 hover:bg-brandnav rounded transition-all">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Linked Target Package (Selection Dropdown)</label>
            <select onchange="TrivivaApp.updatePerfectDestination(${index}, 'id', this.value)" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-primary">
              <option value="">-- Match a Package --</option>
              ${TrivivaApp.packagesList.map(pkg => `
                <option value="${pkg.id}" ${item.id === pkg.id ? 'selected' : ''}>${pkg.title} (${pkg.id})</option>
              `).join("")}
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Display Name</label>
            <input type="text" value="${item.name || ''}" onchange="TrivivaApp.updatePerfectDestination(${index}, 'name', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Rating</label>
            <input type="number" step="0.01" value="${item.rating || 4.8}" onchange="TrivivaApp.updatePerfectDestination(${index}, 'rating', parseFloat(this.value))" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none font-mono" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Details Tag</label>
            <input type="text" value="${item.details || ''}" onchange="TrivivaApp.updatePerfectDestination(${index}, 'details', this.value)" class="w-full bg-white border border-brandborder focus:border-primary rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none" placeholder="5 Days / 4 Nights" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Image Cover (Saved inside package folder)</label>
            <div onchange="TrivivaApp.updatePerfectDestination(${index}, 'image', document.getElementById('dest-img-${index}').value)">
              ${imgUploaderHtml}
            </div>
          </div>
        </div>
      `;
      list.appendChild(row);
    });
    lucide.createIcons();
  },

  // --- FORM 8: GALLERY ---
  renderGalleryForm(container, galleryData) {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 border-b border-brandborder pb-4 font-sans">
        <h3 class="text-sm font-bold text-charcoal flex items-center gap-2 font-display">
          <i data-lucide="image" class="text-primary w-4.5 h-4.5"></i> Gallery Media Catalog
        </h3>
        <div class="flex items-center gap-4">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" id="gallery-enabled" ${galleryData.enabled ? 'checked' : ''} onchange="TrivivaApp.updateGalleryEnabled(this.checked)" class="w-4 h-4 rounded text-primary focus:ring-primary accent-primary" />
            <span class="text-xs font-semibold text-charcoal">Enable Gallery Page</span>
          </label>
          <button onclick="TrivivaApp.addGalleryItem()" class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Image
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-6 font-sans" id="gallery-items-list"></div>
    `;

    const list = document.getElementById("gallery-items-list");
    (galleryData.images || []).forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "p-5 rounded-2xl bg-white border border-brandborder flex flex-col gap-4 relative group shadow-sm";
      const imgUploaderHtml = this.renderImageUploaderHtml(`gal-item-img-${index}`, item.image, 'target=gallery');

      row.innerHTML = `
        <button onclick="TrivivaApp.deleteGalleryItem(${index})" class="absolute top-4 right-4 text-mutedgray hover:text-red-650 p-1.5 hover:bg-brandnav rounded transition-all">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Alt Description Text</label>
            <input type="text" value="${item.alt || ''}" onchange="TrivivaApp.updateGalleryItemField(${index}, 'alt', this.value)" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Grid Class Layout</label>
            <select onchange="TrivivaApp.updateGalleryItemField(${index}, 'className', this.value)" class="w-full bg-white border border-brandborder rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none">
              <option value="col-span-1 md:col-span-1 row-span-1" ${item.className === 'col-span-1 md:col-span-1 row-span-1' ? 'selected' : ''}>Square (1x1)</option>
              <option value="col-span-1 md:col-span-2 row-span-1" ${item.className === 'col-span-1 md:col-span-2 row-span-1' ? 'selected' : ''}>Horizontal (2x1)</option>
              <option value="col-span-1 md:col-span-1 row-span-2" ${item.className === 'col-span-1 md:col-span-1 row-span-2' ? 'selected' : ''}>Vertical (1x2)</option>
              <option value="col-span-1 md:col-span-2 row-span-2" ${item.className === 'col-span-1 md:col-span-2 row-span-2' ? 'selected' : ''}>Large (2x2)</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="block text-[10px] font-bold text-mutedgray uppercase mb-1.5">Gallery Image URL (Gallery directory)</label>
            <div onchange="TrivivaApp.updateGalleryItemField(${index}, 'image', document.getElementById('gal-item-img-${index}').value)">
              ${imgUploaderHtml}
            </div>
          </div>
        </div>
      `;
      list.appendChild(row);
    });
    lucide.createIcons();
  }
};

window.TrivivaUI = TrivivaUI;

/**
 * Interactive Map Picker - Module Chọn Vị Trí Trực Tiếp Trên Bản Đồ Google Map
 * Hỗ trợ di chuyển ghim vị trí trên bản đồ bằng chuột (PC) hoặc vuốt tay (Mobile)
 * Tự động Reverse Geocoding ra tên địa chỉ chuẩn tiếng Việt khi dừng ghim
 * Quản lý: Mr Vinh - Hotline/Zalo: 0984.650.950
 */

const MapPicker = {
  map: null,
  targetField: "dropoff", // "pickup" | "dropoff"
  currentLat: 10.7769,
  currentLon: 106.7009,
  currentAddressName: "",
  reverseTimer: null,
  onConfirmCallback: null,

  init() {
    const modal = document.getElementById("mapPickerModal");
    const closeBtn = document.getElementById("btnCloseMapPicker");
    const confirmBtn = document.getElementById("btnConfirmLocation");
    const myLocationBtn = document.getElementById("btnMapPickerMyLocation");

    if (!modal) return;

    closeBtn?.addEventListener("click", () => this.close());
    confirmBtn?.addEventListener("click", () => this.confirm());
    myLocationBtn?.addEventListener("click", () => this.locateMe());

    // Đóng khi click ngoài khung modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) this.close();
    });

    // Bắt phím Esc để đóng
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        this.close();
      }
    });
  },

  /**
   * Mở modal chọn vị trí trên bản đồ
   * @param {string} field "pickup" hoặc "dropoff"
   * @param {object} initialCoords { lat, lon }
   * @param {function} callback Hàm callback nhận kết quả { address, lat, lon, field }
   */
  open(field = "dropoff", initialCoords = null, callback = null) {
    this.targetField = field;
    this.onConfirmCallback = callback;

    const modal = document.getElementById("mapPickerModal");
    const titleEl = document.getElementById("mapPickerTitle");
    const subtitleEl = document.getElementById("mapPickerSubtitle");

    if (field === "pickup") {
      titleEl.innerText = "Chọn điểm đón";
      subtitleEl.innerText = "Đưa ghim đến đúng điểm đón";
    } else {
      titleEl.innerText = "Chọn điểm đến";
      subtitleEl.innerText = "Đưa ghim đến đúng điểm đến";
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Tọa độ mặc định: nếu là điểm đón thì TP.HCM, nếu điểm đến thì Đồng Xoài (Bình Phước)
    let targetLat = initialCoords?.lat || (field === "pickup" ? 10.7769 : 11.5333);
    let targetLon = initialCoords?.lon || (field === "pickup" ? 106.7009 : 106.8833);

    // Chờ animation hiển thị rồi khởi tạo / căn chỉnh bản đồ
    setTimeout(() => {
      this.ensureMap(targetLat, targetLon);
    }, 180);
  },

  close() {
    const modal = document.getElementById("mapPickerModal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  ensureMap(lat, lon) {
    const container = document.getElementById("interactiveMapContainer");
    if (!container || typeof L === "undefined") return;

    if (!this.map) {
      // Khởi tạo Leaflet Map
      this.map = L.map("interactiveMapContainer", {
        center: [lat, lon],
        zoom: 15,
        zoomControl: true
      });

      // Lớp bản đồ Google Maps Tiles chuẩn nét (đầy đủ tên đường tiếng Việt)
      const googleTileLayer = L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 19,
        attribution: "&copy; Google Maps"
      });

      // Lớp OpenStreetMap dự phòng
      const osmTileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
      });

      googleTileLayer.addTo(this.map);

      // Bắt sự kiện người dùng di chuyển bản đồ bằng chuột hoặc ngón tay
      const pinEl = document.querySelector(".map-center-fixed-pin");

      this.map.on("movestart", () => {
        pinEl?.classList.add("lifting");
        const nameEl = document.getElementById("mapSelectedAddressName");
        if (nameEl) nameEl.innerText = "Đang di chuyển bản đồ để chọn...";
      });

      this.map.on("moveend", () => {
        pinEl?.classList.remove("lifting");
        const center = this.map.getCenter();
        this.currentLat = center.lat;
        this.currentLon = center.lng;
        this.updateCoordinatesDisplay(center.lat, center.lng);
        this.debounceReverseGeocode(center.lat, center.lng);
      });
    } else {
      this.map.invalidateSize();
      this.map.setView([lat, lon], 15, { animate: false });
    }

    this.currentLat = lat;
    this.currentLon = lon;
    this.updateCoordinatesDisplay(lat, lon);
    this.reverseGeocode(lat, lon);
  },

  updateCoordinatesDisplay(lat, lon) {
    const coordsEl = document.getElementById("mapSelectedCoordinates");
    if (coordsEl) {
      coordsEl.innerText = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
    }
  },

  debounceReverseGeocode(lat, lon) {
    clearTimeout(this.reverseTimer);
    this.reverseTimer = setTimeout(() => {
      this.reverseGeocode(lat, lon);
    }, 320);
  },

  async reverseGeocode(lat, lon) {
    const nameEl = document.getElementById("mapSelectedAddressName");
    if (nameEl) nameEl.innerText = "⏳ Đang xác định địa chỉ...";

    try {
      // Ưu tiên Nominatim OpenStreetMap (đầy đủ chi tiết xã/phường)
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
      const res = await fetch(url, {
        headers: { "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8" }
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.display_name) {
          const formatted = this.formatAddress(data);
          this.currentAddressName = formatted;
          if (nameEl) nameEl.innerText = formatted;
          return;
        }
      }
    } catch (e) {
      console.warn("Nominatim reverse failed, fallbacking to Photon:", e);
    }

    // Dự phòng qua Photon Reverse API
    try {
      const photonUrl = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`;
      const res2 = await fetch(photonUrl);
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2.features && data2.features.length > 0) {
          const p = data2.features[0].properties;
          const full = [p.name, p.street, p.district, p.city, p.state].filter(Boolean).join(", ");
          this.currentAddressName = full || p.name;
          if (nameEl) nameEl.innerText = this.currentAddressName;
          return;
        }
      }
    } catch (e2) {
      console.warn("Photon reverse failed:", e2);
    }

    // Fallback tọa độ
    const fallbackText = `Vị trí đã chọn (${lat.toFixed(5)}, ${lon.toFixed(5)})`;
    this.currentAddressName = fallbackText;
    if (nameEl) nameEl.innerText = fallbackText;
  },

  formatAddress(data) {
    const a = data.address || {};
    const parts = [
      a.house_number ? `Số ${a.house_number}` : "",
      a.road || a.pedestrian,
      a.suburb || a.quarter || a.neighbourhood || a.ward,
      a.city_district || a.district || a.county,
      a.city || a.state || a.province
    ].filter(Boolean);

    if (parts.length >= 2) {
      return parts.join(", ");
    }
    return data.display_name;
  },

  locateMe() {
    if (!navigator.geolocation) {
      alert("Thiết bị của bạn chưa hỗ trợ GPS.");
      return;
    }

    const nameEl = document.getElementById("mapSelectedAddressName");
    if (nameEl) nameEl.innerText = "⏳ Đang lấy vị trí GPS của bạn...";

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        if (this.map) {
          this.map.flyTo([lat, lon], 16, { duration: 1.2 });
        }
      },
      (err) => {
        console.warn("Geolocation error:", err);
        alert("Không thể định vị GPS. Vui lòng cho phép quyền truy cập vị trí trên trình duyệt.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  },

  confirm() {
    if (!this.currentAddressName) {
      this.currentAddressName = `Tọa độ: ${this.currentLat.toFixed(5)}, ${this.currentLon.toFixed(5)}`;
    }

    const result = {
      address: this.currentAddressName,
      lat: this.currentLat,
      lon: this.currentLon,
      field: this.targetField
    };

    if (this.onConfirmCallback) {
      this.onConfirmCallback(result);
    }

    this.close();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  MapPicker.init();
});

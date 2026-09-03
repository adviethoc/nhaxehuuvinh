/**
 * Module Tìm Kiếm Địa Chỉ Bản Đồ Chuẩn Google Maps & Đo Quãng Đường Thực Tế
 * Hỗ trợ Autocomplete địa chỉ Việt Nam (số nhà, tên đường, phường/xã, quận/huyện)
 * Sử dụng Nominatim OpenStreetMap + Photon + OSRM Routing
 * Dự phòng Haversine thông minh khi mất mạng
 */

const MapGeocoder = {
  debounceTimer: null,

  /**
   * Tìm kiếm gợi ý địa chỉ chuẩn tại Việt Nam
   */
  async searchAddress(query) {
    if (!query || query.trim().length < 2) return [];

    const cleanQuery = query.trim();

    try {
      // Ưu tiên gọi Nominatim (rất chuẩn xác cho địa chỉ tiếng Việt)
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanQuery)}&format=json&countrycodes=vn&limit=5&addressdetails=1`;
      const res = await fetch(url, {
        headers: {
          "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8"
        }
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          return data.map(item => {
            return {
              displayName: item.display_name,
              shortName: this.formatShortAddress(item),
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon)
            };
          });
        }
      }
    } catch (e) {
      console.warn("Nominatim fallbacking to Photon:", e);
    }

    // Dự phòng qua Photon API (nhanh và chịu tải tốt)
    try {
      const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQuery)}&limit=5&bbox=102.14,8.18,109.46,23.39`;
      const res2 = await fetch(photonUrl);
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2.features && data2.features.length > 0) {
          return data2.features.map(f => {
            const p = f.properties;
            const full = [p.name, p.street, p.district, p.city, p.state].filter(Boolean).join(", ");
            return {
              displayName: full || p.name,
              shortName: p.name || full,
              lat: f.geometry.coordinates[1],
              lon: f.geometry.coordinates[0]
            };
          });
        }
      }
    } catch (e2) {
      console.warn("Photon fallback failed:", e2);
    }

    return [];
  },

  /**
   * Làm gọn địa chỉ hiển thị dễ nhìn cho khách
   */
  formatShortAddress(item) {
    const a = item.address || {};
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
    return item.display_name;
  },

  /**
   * Tính quãng đường đường bộ thực tế (km) giữa 2 tọa độ qua OSRM
   */
  async getRoadDistance(lat1, lon1, lat2, lon2) {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const distanceKm = Math.round(route.distance / 1000);
          const durationMins = Math.round(route.duration / 60);
          const hours = Math.floor(durationMins / 60);
          const mins = durationMins % 60;
          const durationText = hours > 0 ? `${hours} giờ ${mins} phút` : `${mins} phút`;

          return {
            distanceKm: Math.max(distanceKm, 5),
            durationText: durationText,
            isExactRoad: true
          };
        }
      }
    } catch (e) {
      console.warn("OSRM routing timeout or error, using Haversine road estimation:", e);
    }

    // Dự phòng bằng công thức Haversine nhân hệ số uốn khúc đường bộ Việt Nam (~1.28)
    const fallbackKm = calculateHaversineKm(lat1, lon1, lat2, lon2);
    return {
      distanceKm: Math.max(fallbackKm, 10),
      durationText: estimateTravelTime(fallbackKm),
      isExactRoad: false
    };
  },

  /**
   * Thiết lập thanh tìm kiếm tự động có gợi ý (Autocomplete) chuẩn TienChuyen24h
   */
  setupAutocomplete(inputId, dropdownId, onSelectCallback) {
    const inputEl = document.getElementById(inputId);
    const dropdownEl = document.getElementById(dropdownId);
    if (!inputEl || !dropdownEl) return;

    inputEl.addEventListener("input", (e) => {
      const q = e.target.value;
      clearTimeout(this.debounceTimer);

      if (!q || q.trim().length < 2) {
        dropdownEl.innerHTML = "";
        dropdownEl.style.display = "none";
        return;
      }

      dropdownEl.innerHTML = `
        <div style="padding: 12px 16px; font-size: 0.85rem; color: #64748B; display: flex; align-items: center; gap: 8px;">
          <span>⏳ Đang tìm kiếm địa chỉ bản đồ...</span>
        </div>
      `;
      dropdownEl.style.display = "block";

      this.debounceTimer = setTimeout(async () => {
        const results = await this.searchAddress(q);

        if (!results || results.length === 0) {
          dropdownEl.innerHTML = `
            <div style="padding: 12px 16px; font-size: 0.85rem; color: #94A3B8;">
              Không tìm thấy địa chỉ chính xác. Hãy nhập thêm tên Quận/Huyện hoặc Thành phố (VD: ${q}, TP.HCM).
            </div>
          `;
          return;
        }

        dropdownEl.innerHTML = results.map((item, idx) => `
          <div class="autocomplete-item" data-idx="${idx}">
            <div class="autocomplete-pin-icon">📍</div>
            <div class="autocomplete-text-box">
              <div class="autocomplete-title">${item.shortName}</div>
              <div class="autocomplete-subtitle">Chạm để chọn</div>
            </div>
          </div>
        `).join("");

        // Bắt sự kiện click chọn địa chỉ
        const items = dropdownEl.querySelectorAll(".autocomplete-item");
        items.forEach(el => {
          el.addEventListener("click", () => {
            const idx = parseInt(el.getAttribute("data-idx"));
            const selected = results[idx];
            inputEl.value = selected.shortName;
            dropdownEl.style.display = "none";
            dropdownEl.innerHTML = "";
            if (onSelectCallback) {
              onSelectCallback(selected);
            }
          });
        });
      }, 380);
    });

    // Ẩn khi bấm ra ngoài
    document.addEventListener("click", (e) => {
      if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
        dropdownEl.style.display = "none";
      }
    });
  }
};

/**
 * Application Core Logic - Dịch Vụ Du Lịch & Tiện Chuyến Hữu Vinh
 * Quản lý: Mr Vinh - Hotline/Zalo: 0984.650.950
 * 100% Xe Điện VinFast (4 chỗ & 7 chỗ)
 */

// Định nghĩa danh sách các Cụm Tuyến Nằm Ngang chuẩn TienChuyen24h
// Giá CHỈ TỪ tự động theo chặng có giá tiện chuyến thấp nhất (8k/km)
const ROUTE_CLUSTERS = [
  {
    id: "hcm-bp",
    title: "TP.HCM ⇄ Bình Phước",
    subtitle: "Tiện chuyến • Giá tốt • Đón tận nơi",
    minPriceText: "640K",
    icon: "🚗"
  },
  {
    id: "hcm-vt",
    title: "TP.HCM ⇄ Vũng Tàu",
    subtitle: "Tiện chuyến • Giá tốt • Chạy cao tốc",
    minPriceText: "720K",
    icon: "🚗"
  },
  {
    id: "hcm-ld",
    title: "TP.HCM ⇄ Lâm Đồng",
    subtitle: "Tiện chuyến • Đà Lạt, Bảo Lộc • Xe êm không say",
    minPriceText: "1440K",
    icon: "🚗"
  },
  {
    id: "bp-dn",
    title: "Bình Phước ⇄ Đồng Nai",
    subtitle: "Tiện chuyến • Giá tốt",
    minPriceText: "640K",
    icon: "🚗"
  },
  {
    id: "bp-vt",
    title: "Bình Phước ⇄ Vũng Tàu",
    subtitle: "Tiện chuyến • Du lịch biển cuối tuần",
    minPriceText: "1280K",
    icon: "🚗"
  },
  {
    id: "bp-dno",
    title: "Bình Phước ⇄ Đắk Nông",
    subtitle: "Tiện chuyến • QL14 Tây Nguyên",
    minPriceText: "960K",
    icon: "🚗"
  },
  {
    id: "bp-ld",
    title: "Bình Phước ⇄ Lâm Đồng",
    subtitle: "Tiện chuyến • Rừng sinh thái Cát Tiên",
    minPriceText: "720K",
    icon: "🚗"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initHorizontalClusters();
  initBookingModal();
  initGeolocation();
});

// ==========================================================================
// 1. RENDER & QUẢN LÝ CÁC CỤM TUYẾN NẰM NGANG (ACCORDION CHUẨN TIENCHUYEN24H)
// ==========================================================================
function initHorizontalClusters() {
  const container = document.getElementById("routesClusterContainer");
  if (!container || typeof ROUTES_DATA === "undefined") return;

  function renderClusters(searchTerm = "") {
    const s = searchTerm.toLowerCase().trim();

    container.innerHTML = ROUTE_CLUSTERS.map((cluster, index) => {
      // Lọc các tuyến con thuộc cụm này
      let subroutes = ROUTES_DATA.filter(r => r.group === cluster.id);

      // Nếu có tìm kiếm, lọc theo từ khóa
      if (s) {
        subroutes = subroutes.filter(r => 
          r.from.toLowerCase().includes(s) || 
          r.to.toLowerCase().includes(s) ||
          cluster.title.toLowerCase().includes(s)
        );
      }

      // Nếu có tìm kiếm mà cụm không có kết quả thì ẩn
      if (s && subroutes.length === 0) {
        return "";
      }

      // Mặc định mở cụm đầu tiên nếu không tìm kiếm, hoặc mở tất cả khi tìm thấy kết quả
      const isOpen = s ? true : (index === 0);

      // Tự động tính giá CHỈ TỪ theo giá tiện chuyến thấp nhất trong cụm
      const allClusterRoutes = ROUTES_DATA.filter(r => r.group === cluster.id);
      const minVal = allClusterRoutes.length > 0 ? Math.min(...allClusterRoutes.map(r => r.tienChuyenPrice)) : 0;
      const displayMinPrice = minVal > 0 ? `${Math.round(minVal / 1000)}K` : cluster.minPriceText;

      return `
        <div class="cluster-item ${isOpen ? 'open' : ''}" id="cluster-${cluster.id}">
          <!-- Thanh tóm tắt cụm nằm ngang -->
          <div class="cluster-summary-bar" onclick="toggleCluster('${cluster.id}')">
            <div class="cluster-left-box">
              <div class="cluster-car-icon">${cluster.icon}</div>
              <div class="cluster-title-box">
                <h4>${cluster.title}</h4>
                <p>${cluster.subtitle}</p>
              </div>
            </div>
            <div class="cluster-right-box">
              <div class="price-chip-yellow">
                <span class="chip-label">CHỈ TỪ</span>
                <span class="chip-price">${displayMinPrice}</span>
                <span class="chip-red-bar"></span>
              </div>
              <div class="cluster-chevron">▼</div>
            </div>
          </div>

          <!-- Danh sách các chặng con nằm ngang khi bung ra -->
          <div class="cluster-drawer-content">
            ${subroutes.map(route => `
              <div class="subroute-horizontal-card">
                <div class="subroute-dest-info">
                  <h5>${route.from} ⇄ ${route.to}</h5>
                  <div class="subroute-meta-text">
                    <span>📍 ${route.distance}</span>
                    <span>⏱ ${route.duration}</span>
                  </div>
                </div>

                <div class="subroute-prices-row">
                  <div class="subroute-price-box highlight-tc">
                    <span class="price-title">Tiện chuyến</span>
                    <span class="price-number">${formatVND(route.tienChuyenPrice)}</span>
                  </div>
                  <div class="subroute-price-box">
                    <span class="price-title">Bao 4 chỗ</span>
                    <span class="price-number">${formatVND(route.price4Seats)}</span>
                  </div>
                  <div class="subroute-price-box">
                    <span class="price-title">Bao 7 chỗ</span>
                    <span class="price-number">${formatVND(route.price7Seats)}</span>
                  </div>
                </div>

                <button class="btn-book-subroute" onclick="openBookingForRoute('${route.id}')">
                  ⚡ Đặt xe ngay
                </button>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    if (s && container.innerHTML.trim() === "") {
      container.innerHTML = `
        <div style="text-align: center; padding: 30px 20px; color: #64748B; background: var(--white); border-radius: var(--radius-md); border: 1px solid var(--slate-200);">
          <div style="font-size: 1.1rem; font-weight: 800; color: var(--slate-800); margin-bottom: 6px;">
            Không tìm thấy Tuyến Cố Định cho từ khóa "<strong>${searchTerm}</strong>"
          </div>
          <p style="font-size: 0.88rem; color: var(--slate-500); margin-bottom: 16px;">
            Địa chỉ này có thể là ngõ hẻm hoặc địa điểm chi tiết. Hãy sử dụng hệ thống đo km bản đồ tự động của chúng tôi:
          </p>
          <a href="booking-custom.html?dropoff=${encodeURIComponent(searchTerm)}" class="btn-prompt-custom" style="display: inline-flex; align-items: center; gap: 8px;">
            📍 Tự Đo Km & Tính Cước Cho "${searchTerm}" (Từ 8k/km) →
          </a>
        </div>
      `;
    } else if (s) {
      // Nếu có kết quả tuyến cố định, vẫn đính kèm thêm 1 nút gợi ý tìm số nhà ngõ hẻm ở cuối
      container.innerHTML += `
        <div style="background: #ECFDF5; border: 1.5px dashed #059669; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 14px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.3rem;">📍</span>
            <div>
              <div style="font-weight: 800; font-size: 0.92rem; color: #065F46;">Muốn đón/trả tận số nhà tại "${searchTerm}"?</div>
              <div style="font-size: 0.78rem; color: #047857;">Hệ thống sẽ đo chính xác từng mét theo bản đồ vệ tinh & áp giá 8k - 9k/km</div>
            </div>
          </div>
          <a href="booking-custom.html?dropoff=${encodeURIComponent(searchTerm)}" style="padding: 8px 18px; background: #059669; color: white; border-radius: 8px; font-weight: 800; font-size: 0.85rem; text-decoration: none;">
            Đo km chi tiết →
          </a>
        </div>
      `;
    }
  }

  // Render lần đầu
  renderClusters("");

  // Bắt sự kiện tìm kiếm nhanh
  const searchInput = document.getElementById("routeSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderClusters(e.target.value);
    });
  }
}

// Hàm đóng/mở cụm tuyến
function toggleCluster(clusterId) {
  const clusterEl = document.getElementById(`cluster-${clusterId}`);
  if (clusterEl) {
    clusterEl.classList.toggle("open");
  }
}

// ==========================================================================
// 2. MODAL ĐẶT XE NHANH & GỬI TIN NHẮN ZALO
// ==========================================================================
let currentSelectedRoute = null;

function initBookingModal() {
  const modal = document.getElementById("bookingModal");
  const closeBtn = document.getElementById("closeModalBtn");

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  const modalForm = document.getElementById("modalBookingForm");
  if (modalForm) {
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleBookingSubmit(modalForm);
    });
  }
}

function openBookingForRoute(routeId) {
  const route = ROUTES_DATA.find(r => r.id === routeId);
  if (!route) return;

  currentSelectedRoute = route;
  const modal = document.getElementById("bookingModal");
  if (!modal) return;

  document.getElementById("modalRouteTitle").innerText = `${route.from} ⇄ ${route.to}`;
  document.getElementById("modalDistance").innerText = `Khoảng cách: ${route.distance} (~${route.duration})`;
  document.getElementById("modalPriceTienChuyen").innerText = formatVND(route.tienChuyenPrice);
  document.getElementById("modalPrice4Seats").innerText = formatVND(route.price4Seats);
  document.getElementById("modalPrice7Seats").innerText = formatVND(route.price7Seats);

  const routeInput = document.getElementById("modalInputRoute");
  if (routeInput) routeInput.value = `${route.from} ⇄ ${route.to}`;

  const dateInput = document.getElementById("modalTravelDate");
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }

  modal.classList.add("active");
}

// ==========================================================================
// 3. XỬ LÝ GỬI ĐƠN & SOẠN TIN NHẮN QUA ZALO MR VINH (0984.650.950)
// ==========================================================================
function handleBookingSubmit(formElement) {
  const formData = new FormData(formElement);
  const routeName = formData.get("routeName") || (currentSelectedRoute ? `${currentSelectedRoute.from} ⇄ ${currentSelectedRoute.to}` : "Chuyến đi tùy chọn");
  const carType = formData.get("carType") === "7seats" ? "Xe điện 7 chỗ" : "Xe điện 4 chỗ";
  const tripType = formData.get("tripType") === "roundtrip" ? "Khứ hồi 2 chiều" : "1 Chiều";
  const serviceType = formData.get("serviceType") === "baoxe" ? "Bao xe riêng trọn gói" : "Vé Tiện Chuyến";
  const pickupAddress = formData.get("pickupAddress") || "Liên hệ xác nhận";
  const travelDate = formData.get("travelDate") || "Hôm nay";
  const travelTime = formData.get("travelTime") || "Sớm nhất";
  const customerName = formData.get("customerName") || "Khách hàng";
  const customerPhone = formData.get("customerPhone") || "";
  const note = formData.get("note") || "Không có";

  if (!customerPhone) {
    alert("Vui lòng nhập số điện thoại để Mr Vinh liên hệ đón quý khách!");
    return;
  }

  const message = `🚕 [ĐẶT XE TIỆN CHUYẾN HỮU VINH 24/7]
- Khách hàng: ${customerName}
- Điện thoại: ${customerPhone}
- Chuyến đi: ${routeName}
- Dịch vụ: ${carType} (${serviceType} - ${tripType})
- Điểm đón: ${pickupAddress}
- Ngày giờ: ${travelTime} ngày ${travelDate}
- Ghi chú: ${note}
(Gửi từ website nhaxehuuvinh.vn)`;

  try {
    const history = JSON.parse(localStorage.getItem("huuvinh_bookings") || "[]");
    history.push({
      time: new Date().toLocaleString("vi-VN"),
      customerName,
      customerPhone,
      routeName,
      carType
    });
    localStorage.setItem("huuvinh_bookings", JSON.stringify(history));
  } catch (err) {}

  // Cấu hình nhận thông báo tự động về điện thoại
  // (Điền Telegram Bot Token hoặc Google Sheets Webhook bên dưới để điện thoại tự động báo chuông khi có khách đặt xe)
  const NOTIFICATION_WEBHOOK = {
    telegram: {
      enabled: false, // Đổi thành true khi bạn điền botToken & chatId
      botToken: "",   // Điền Token từ @BotFather
      chatId: ""      // Điền Chat ID từ @userinfobot
    },
    googleSheetWebhookUrl: "" // Điền URL Webhook Google Apps Script nếu dùng
  };

  // 1. Tự động bắn thông báo ngầm về Telegram của Mr Vinh (nếu được kích hoạt)
  if (NOTIFICATION_WEBHOOK.telegram.enabled && NOTIFICATION_WEBHOOK.telegram.botToken && NOTIFICATION_WEBHOOK.telegram.chatId) {
    try {
      fetch(`https://api.telegram.org/bot${NOTIFICATION_WEBHOOK.telegram.botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: NOTIFICATION_WEBHOOK.telegram.chatId,
          text: message
        })
      }).catch(err => console.warn("Lỗi gửi thông báo Telegram:", err));
    } catch (e) {}
  }

  // 2. Tự động bắn thông báo về Google Sheets (nếu được kích hoạt)
  if (NOTIFICATION_WEBHOOK.googleSheetWebhookUrl) {
    try {
      fetch(NOTIFICATION_WEBHOOK.googleSheetWebhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          time: new Date().toLocaleString("vi-VN"),
          customerName,
          customerPhone,
          routeName,
          carType,
          pickupAddress,
          travelTime,
          travelDate,
          note
        })
      }).catch(err => console.warn("Lỗi gửi Google Sheets:", err));
    } catch (e) {}
  }

  const modal = document.getElementById("bookingModal");
  if (modal) modal.classList.remove("active");

  // 3. Mở thẳng Zalo của Mr Vinh với nội dung đã được soạn sẵn đầy đủ 100%
  const zaloUrl = `https://zalo.me/0984650950?text=${encodeURIComponent(message)}`;
  
  // Hiển thị thông báo thân thiện và tự chuyển tiếp tới Zalo
  alert(`✓ Đã ghi nhận đơn đặt xe của Quý khách ${customerName}!\n\nHệ thống đang chuyển quý khách đến Zalo của Mr Vinh (0984.650.950) để xác nhận chuyến đi.`);
  window.open(zaloUrl, "_blank");
}

// ==========================================================================
// 4. ĐỊNH VỊ GPS VỊ TRÍ HIỆN TẠI
// ==========================================================================
function initGeolocation() {
  const gpsBtns = document.querySelectorAll(".btn-gps-current");
  gpsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetInputId = btn.getAttribute("data-target-input");
      const targetInput = document.getElementById(targetInputId);
      if (!targetInput) return;

      if (!navigator.geolocation) {
        alert("Trình duyệt không hỗ trợ định vị GPS!");
        return;
      }

      btn.innerText = "⏳ Đang định vị...";
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(5);
          const lng = position.coords.longitude.toFixed(5);
          targetInput.value = `Vị trí hiện tại (GPS: ${lat}, ${lng})`;
          btn.innerText = "📍 Đã lấy vị trí GPS";
        },
        () => {
          alert("Không lấy được vị trí. Vui lòng cho phép quyền vị trí trên trình duyệt hoặc tự gõ địa chỉ.");
          btn.innerText = "◎ Dùng vị trí hiện tại";
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  });
}

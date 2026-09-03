/**
 * Application Core Logic - Dịch Vụ Du Lịch & Tiện Chuyến Hữu Vinh
 * Quản lý: Mr Vinh - Hotline/Zalo: 0984.650.950
 */

document.addEventListener("DOMContentLoaded", () => {
  initRoutesDisplay();
  initFaqAccordion();
  initBookingModal();
  initHeroForm();
  initGeolocation();
});

// ==========================================================================
// 1. RENDER VÀ LỌC DANH SÁCH TUYẾN ĐƯỜNG
// ==========================================================================
function initRoutesDisplay() {
  const routesContainer = document.getElementById("routesGridContainer");
  if (!routesContainer || typeof ROUTES_DATA === "undefined") return;

  function renderRoutes(filter = "all") {
    let filtered = ROUTES_DATA;
    if (filter !== "all") {
      filtered = ROUTES_DATA.filter(r => r.group === filter);
    }

    if (filtered.length === 0) {
      routesContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748B;">Không có tuyến nào trong nhóm này. Vui lòng chọn nhóm khác hoặc sử dụng tính năng Tự nhập chuyến.</div>`;
      return;
    }

    routesContainer.innerHTML = filtered.map(route => `
      <article class="route-card" data-route-id="${route.id}">
        <span class="route-badge ${route.isPopular ? 'hot' : ''}">
          ${route.badge || 'Tiện chuyến'}
        </span>
        <div class="route-path">
          <span>${route.from}</span>
          <span class="arrow">⇄</span>
          <span>${route.to}</span>
        </div>
        <div class="route-meta">
          <span>📍 ${route.distance}</span>
          <span>⏱ ${route.duration}</span>
        </div>
        <div class="route-pricing-box">
          <div class="pricing-row tien-chuyen">
            <span>Vé Tiện Chuyến từ:</span>
            <span class="price-val">${formatVND(route.tienChuyenPrice)}</span>
          </div>
          <div class="pricing-row">
            <span>Bao xe 4 chỗ:</span>
            <span class="price-val">${formatVND(route.price4Seats)}</span>
          </div>
          <div class="pricing-row">
            <span>Bao xe 7 chỗ:</span>
            <span class="price-val">${formatVND(route.price7Seats)}</span>
          </div>
        </div>
        <div class="route-card-actions">
          <button class="btn-book-route" onclick="openBookingForRoute('${route.id}')">
            ⚡ Đặt xe tuyến này
          </button>
          <a href="tel:0984650950" class="btn-call-route" title="Gọi trực tiếp Mr Vinh">
            📞
          </a>
        </div>
      </article>
    `).join("");
  }

  // Khởi tạo hiển thị ban đầu
  renderRoutes("all");

  // Xử lý nút filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const group = btn.getAttribute("data-filter");
      renderRoutes(group);
    });
  });
}

// ==========================================================================
// 2. MODAL ĐẶT XE TUYẾN CỐ ĐỊNH & GỬI ZALO
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

  // Xử lý gửi form modal
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
  document.getElementById("modalDistance").innerText = `${route.distance} (~${route.duration})`;
  document.getElementById("modalPriceTienChuyen").innerText = formatVND(route.tienChuyenPrice);
  document.getElementById("modalPrice4Seats").innerText = formatVND(route.price4Seats);
  document.getElementById("modalPrice7Seats").innerText = formatVND(route.price7Seats);

  // Gán giá trị ẩn
  const routeInput = document.getElementById("modalInputRoute");
  if (routeInput) routeInput.value = `${route.from} ⇄ ${route.to}`;

  // Đặt ngày mặc định là hôm nay
  const dateInput = document.getElementById("modalTravelDate");
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
  }

  modal.classList.add("active");
}

// ==========================================================================
// 3. XỬ LÝ GỬI ĐƠN VÀ KẾT NỐI ZALO MR VINH (0984.650.950)
// ==========================================================================
function handleBookingSubmit(formElement) {
  const formData = new FormData(formElement);
  const routeName = formData.get("routeName") || (currentSelectedRoute ? `${currentSelectedRoute.from} ⇄ ${currentSelectedRoute.to}` : "Chuyến đi theo yêu cầu");
  const carType = formData.get("carType") === "7seats" ? "Xe điện VinFast 7 chỗ" : "Xe điện VinFast 4 chỗ";
  const tripType = formData.get("tripType") === "roundtrip" ? "Khứ hồi 2 chiều" : "1 Chiều";
  const serviceType = formData.get("serviceType") === "baoxe" ? "Bao xe nguyên chuyến" : "Vé Tiện Chuyến";
  const pickupAddress = formData.get("pickupAddress") || "Liên hệ xác nhận";
  const travelDate = formData.get("travelDate") || "Hôm nay";
  const travelTime = formData.get("travelTime") || "Càng sớm càng tốt";
  const customerName = formData.get("customerName") || "Khách hàng";
  const customerPhone = formData.get("customerPhone") || "";
  const note = formData.get("note") || "Không có";

  if (!customerPhone) {
    alert("Vui lòng nhập số điện thoại để nhà xe liên hệ đón quý khách!");
    return;
  }

  // Tạo nội dung tin nhắn gửi Zalo
  const message = `🚕 [ĐẶT XE TIỆN CHUYẾN HỮU VINH]
- Khách hàng: ${customerName}
- Số điện thoại: ${customerPhone}
- Lộ trình: ${routeName}
- Loại xe: ${carType} (${serviceType} - ${tripType})
- Điểm đón: ${pickupAddress}
- Ngày giờ đón: ${travelTime} ngày ${travelDate}
- Ghi chú: ${note}
(Gửi từ website nhaxehuuvinh.vn)`;

  // Lưu lịch sử local
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

  // Đóng modal nếu có
  const modal = document.getElementById("bookingModal");
  if (modal) modal.classList.remove("active");

  // Thông báo xác nhận và chuyển tiếp qua Zalo
  const confirmRedirect = confirm(
    `Cảm ơn Quý khách ${customerName}!\nĐơn đặt xe [${routeName}] đã được ghi nhận thành công.\n\nNhấn "OK" để gửi tin nhắn xác nhận tức thì qua Zalo cho Mr Vinh (0984.650.950) hoặc "Hủy" để chờ tài xế gọi lại.`
  );

  if (confirmRedirect) {
    const zaloUrl = `https://zalo.me/0984650950?text=${encodeURIComponent(message)}`;
    window.open(zaloUrl, "_blank");
  } else {
    alert("Dịch Vụ Hữu Vinh đã nhận thông tin và sẽ gọi ngay lại cho quý khách trong 5 phút! Hotline hỗ trợ: 0984.650.950");
  }
}

// ==========================================================================
// 4. KHỞI TẠO FORM TẠI HERO BANNER
// ==========================================================================
function initHeroForm() {
  const heroForm = document.getElementById("heroBookingForm");
  if (!heroForm) return;

  // Điền danh sách tuyến vào select box
  const routeSelect = document.getElementById("heroRouteSelect");
  if (routeSelect && typeof ROUTES_DATA !== "undefined") {
    routeSelect.innerHTML = `<option value="">-- Chọn tuyến đường có sẵn --</option>` +
      ROUTES_DATA.map(r => `<option value="${r.id}">${r.from} ⇄ ${r.to} (Từ ${formatVND(r.tienChuyenPrice)})</option>`).join("");
  }

  // Đặt ngày đi mặc định là hôm nay
  const dateInput = document.getElementById("heroTravelDate");
  if (dateInput) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }

  heroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedRouteId = routeSelect.value;
    if (selectedRouteId) {
      currentSelectedRoute = ROUTES_DATA.find(r => r.id === selectedRouteId);
    }
    handleBookingSubmit(heroForm);
  });
}

// ==========================================================================
// 5. ĐỊNH VỊ GPS VỊ TRÍ HIỆN TẠI
// ==========================================================================
function initGeolocation() {
  const gpsBtns = document.querySelectorAll(".btn-gps-current");
  gpsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetInputId = btn.getAttribute("data-target-input");
      const targetInput = document.getElementById(targetInputId);
      if (!targetInput) return;

      if (!navigator.geolocation) {
        alert("Trình duyệt của bạn không hỗ trợ định vị GPS!");
        return;
      }

      btn.innerText = "⏳ Đang lấy...";
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(5);
          const lng = position.coords.longitude.toFixed(5);
          targetInput.value = `Vị trí hiện tại (GPS: ${lat}, ${lng})`;
          btn.innerText = "📍 Đã định vị";
        },
        (error) => {
          alert("Không thể lấy vị trí. Vui lòng cho phép quyền truy cập vị trí trên trình duyệt!");
          btn.innerText = "📍 Vị trí hiện tại";
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  });
}

// ==========================================================================
// 6. FAQ ACCORDION
// ==========================================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach(i => i.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
}

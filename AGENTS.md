# HƯỚNG DẪN DÀNH CHO AI (AGENT INSTRUCTIONS & REPOSITORY CONTEXT)

> **Tài liệu này được tạo để bất kỳ trợ lý AI nào (Antigravity, Claude, ChatGPT, Gemini, Copilot...) khi đọc vào thư mục này đều nắm bắt 100% ngữ cảnh, cấu trúc mã nguồn, quy tắc kinh doanh và thiết kế của website Nhà Xe Hữu Vinh.**

---

## 1. THÔNG TIN DOANH NGHIỆP & NGỮ CẢNH DỰ ÁN
- **Tên dịch vụ:** Dịch Vụ Du Lịch & Tiện Chuyến Hữu Vinh (Hữu Vinh Car).
- **Chủ xe / Quản lý:** Mr Vinh.
- **Hotline / Zalo liên hệ:** **0984.650.950** (Tất cả nút gọi điện, nhắn tin, đặt xe trên web đều liên kết tới số này).
- **Đội xe phục vụ:** 100% Xe Điện VinFast đời mới (VF6 4 chỗ, VF8 7 chỗ), biển số vàng kinh doanh vận tải: **93H - 064.29** (Tỉnh Bình Phước).
- **Tuyến đường trọng điểm:** Tuyến TP.HCM ⇄ Bình Phước (Đồng Xoài, Chơn Thành, Đồng Phú, Tân Lập, Bình Long, Bù Đăng...) và các tuyến du lịch liên tỉnh (Vũng Tàu, Đà Lạt, Biên Hòa, Đắk Nông, Cát Tiên).
- **Trang web đối chuẩn thiết kế (Benchmark):** `https://tienchuyen24h.vn/`. Chủ xe yêu cầu thiết kế tinh gọn, sạch sẽ, bố cục thanh thoát, không dùng nền tối phức tạp, thân thiện trên cả máy tính lẫn điện thoại.
- **Kho lưu trữ GitHub:** `https://github.com/adviethoc/nhaxehuuvinh` (Nhánh: `main`).

---

## 2. QUY TẮC BẢNG GIÁ & CÔNG THỨC TÍNH CƯỚC (BẮT BUỘC TUÂN THỦ)
Mọi trang web, dữ liệu bảng giá và công cụ tính toán đều phải đồng nhất theo công thức sau:
1. **Vé Tiện chuyến:** `Số km × 8.000 đ / km` (8k/km).
2. **Bao xe 4 chỗ:** `Số km × 10.000 đ / km` (10k/km).
3. **Bao xe 7 chỗ:** `Số km × 11.000 đ / km` (11k/km).
4. **Chuyến 2 chiều (Khứ hồi trong ngày):** Chiều về giảm **60%** so với chiều đi (Khách chỉ trả 40% cho chiều về).
   $$\text{Tổng tiền 2 chiều} = \text{Cước chiều đi} + (\text{Cước chiều đi} \times 0.4) = 1.4 \times \text{Cước chiều đi}$$
5. **Cụm giá "CHỈ TỪ ...":** Phải tự động lấy theo giá **vé tiện chuyến thấp nhất** trong cụm đó (Ví dụ: Cụm Bình Phước có chặng Tân Lập 80 km = 640.000 đ -> Huy hiệu hiển thị `CHỈ TỪ 640K`).

---

## 3. QUY CHUẨN THIẾT KẾ GIAO DIỆN (DESIGN SYSTEM & UI RULES)

### 3.1. Huy hiệu giá vàng viền đỏ (Price Badge)
- Khách hàng đặc biệt yêu cầu huy hiệu giá cụm tuyến nằm ngang phải chuẩn 100% như mẫu `tienchuyen24h.vn`:
  - Khung badge: Nền vàng kem nhạt `#FFF9E6`, viền vàng `#FDE68A`, bo tròn 14px - 16px.
  - Chữ `CHỈ TỪ`: Chữ hoa in đậm, màu đỏ rực `#DC2626`, kích thước `0.68rem`, font-weight `900`.
  - Số tiền (Ví dụ: `640K`, `720K`): Chữ số màu đỏ rực `#DC2626`, kích thước `1.2rem`, font-weight `900`.
  - **Nét gạch nền đỏ uốn cong bên dưới số (`.chip-red-bar`):** Chiều rộng `34px`, chiều cao `3.5px`, màu đỏ rực `#DC2626`, bo góc tròn `9999px`, nằm ngay dưới chân con số để tạo điểm nhấn nổi bật.

### 3.2. Tính tương thích thiết bị (Responsive)
- **Máy tính (Desktop):** Giao diện rộng rãi (Container max 1140px - 1200px), hiển thị thanh menu ngang đầy đủ, bố cục cân đối chuyên nghiệp.
- **Điện thoại (Mobile):** Các thẻ chặng tuyến, bảng tính cước, ảnh xe và popup đều phải co giãn mượt mà, không bị tràn màn hình (không sinh thanh cuộn ngang).

### 3.3. Hình ảnh xe thực tế
- Tuyệt đối **không dùng ảnh xe ảo hoặc ảnh xe hãng chung chung**. Luôn dùng các bức ảnh xe thực tế đã có trong thư mục `assets/images/` thể hiện rõ biển số xe **93H - 064.29** của Mr Vinh.

### 3.4. Chống lưu Cache trình duyệt (Cache Busting)
- Khi chỉnh sửa file CSS hoặc JS, luôn gắn đuôi phiên bản dạng `?v=X.X` (Ví dụ: `style.css?v=3.1`, `app.js?v=3.1`) để khách hàng vào web trên điện thoại tải ngay file mới mà không bị lưu bản cũ.

---

## 4. CẤU TRÚC THƯ MỤC & VAI TRÒ CÁC TẬP TIN

```text
nhaxehuuvinh/
├── index.html                  # Trang chủ: Bố cục cụm tuyến nằm ngang accordion, tìm kiếm tức thì, bộ sưu tập ảnh xe thật 93H-064.29, popup đặt xe nhanh.
├── booking-custom.html         # Trang tự nhập chuyến: Gợi ý địa chỉ Autocomplete, đo km OSRM, modal chọn vị trí bản đồ Google Maps có ghim kéo thả, tính giá chuẩn km.
├── routes/                     # Các trang đích SEO cho từng chặng riêng biệt
│   ├── sai-gon-binh-phuoc.html # Chặng TP.HCM ⇄ Bình Phước (bảng giá chi tiết các huyện thị)
│   ├── sai-gon-dong-xoai.html  # Chặng trọng điểm TP.HCM ⇄ Đồng Xoài
│   └── sai-gon-vung-tau.html   # Chặng du lịch TP.HCM ⇄ Vũng Tàu (chạy cao tốc)
├── assets/
│   ├── css/
│   │   └── style.css           # Toàn bộ mã nguồn CSS hệ thống thiết kế, huy hiệu giá, responsive, modal bản đồ
│   ├── js/
│   │   ├── routes-data.js      # Cơ sở dữ liệu danh sách 15+ tuyến đường, khoảng cách km và giá niêm yết
│   │   ├── fare-calculator.js  # Thuật toán tính cước 10k (4c), 11k (7c), 8k (tiện chuyến), giảm 60% chiều về
│   │   ├── map-geocoder.js     # Tích hợp Autocomplete địa chỉ Việt Nam (Nominatim + Photon) & đo km đường bộ (OSRM)
│   │   ├── map-picker.js       # Module Modal bản đồ Google Maps với ghim cố định trung tâm, lướt chuột/tay và reverse geocode
│   │   └── app.js              # Khởi tạo giao diện, đóng/mở cụm accordion, tìm kiếm tuyến, gửi đơn đặt xe & Zalo
│   ├── vendor/
│   │   └── leaflet/            # Thư viện bản đồ mã nguồn mở Leaflet (leaflet.js & leaflet.css tải cục bộ)
│   └── images/                 # Ảnh thực tế xe VinFast VF6 biển số 93H-064.29 của Mr Vinh
├── sitemap.xml                 # Sơ đồ trang web hỗ trợ Google Search Console
├── robots.txt                  # Cấu hình bot tìm kiếm
├── README.md                   # Tài liệu giới thiệu dự án
└── AGENTS.md                   # File này (Cẩm nang ghi nhớ dành riêng cho AI)
```

---

## 5. MÔ TẢ CHI TIẾT CÁC TÍNH NĂNG ĐÃ HOÀN THIỆN

### 5.1. Bảng giá cụm tuyến nằm ngang (Accordion) tại `index.html`
- Chia thành các cụm tuyến lớn: *TP.HCM ⇄ Bình Phước*, *TP.HCM ⇄ Vũng Tàu*, *TP.HCM ⇄ Lâm Đồng*, *Bình Phước ⇄ Đồng Nai*, *Bình Phước ⇄ Vũng Tàu*, *Bình Phước ⇄ Đắk Nông*, *Bình Phước ⇄ Lâm Đồng*.
- Khi nhấp vào cụm, bung ra danh sách các chặng con nằm ngang với đầy đủ 3 cột giá:
  - **Tiện chuyến** (xanh ngọc)
  - **Bao 4 chỗ**
  - **Bao 7 chỗ**
  - Kèm nút `⚡ Đặt xe ngay` mở popup tự điền sẵn chặng đi.
- **Thanh tìm kiếm nhanh:** Gõ từ khóa (ví dụ `Đồng Xoài`, `Vũng Tàu`, `Bù Đăng`...) hệ thống lọc tự động và bung cụm tương ứng tức thì.

### 5.2. Tính năng Bản đồ Google Maps chọn vị trí trực tiếp tại `booking-custom.html`
- **Mở modal:** Người dùng có thể nhấn `🗺️ Bản đồ` ở ô Điểm đón hoặc `🗺️ Chọn điểm đến trên bản đồ` ở ô Điểm đến.
- **Ghim trung tâm (Fixed Center Pin):** Ghim cố định ở giữa màn hình. Người dùng dùng chuột trên máy tính hoặc vuốt ngón tay trên điện thoại để lướt bản đồ. Khi nhấc tay / dừng chuột, hệ thống gọi Reverse Geocoding để đọc tên đường/xã/phường cụ thể.
- **Nút "Vị trí của tôi":** Định vị GPS và bay bản đồ tới vị trí hiện tại.
- **Nút "Xác nhận vị trí":** Điền tên địa chỉ vào form, lưu tọa độ và tự động đo khoảng cách km đường bộ thực tế qua OSRM, hiển thị ngay cước phí chuẩn xác.

### 5.3. Xử lý gửi đơn đặt xe & Thông báo
- Khi khách điền form và ấn `Xác nhận & Gửi qua Zalo`:
  - Toàn bộ nội dung đơn hàng được lưu vào `localStorage`.
  - Tự động mở ứng dụng Zalo kết nối thẳng tới **Mr Vinh (0984.650.950)** với lời nhắn soạn sẵn đầy đủ thông tin: Tên khách, SĐT, Điểm đón, Điểm đến, Loại xe, Tiền cước.
  - Mã nguồn trong `assets/js/app.js` (hàm `handleBookingSubmit`) đã có sẵn khung kết nối Webhook **Telegram Bot** hoặc **Google Sheets**. Chỉ cần điền Bot Token / Webhook URL là điện thoại của Mr Vinh tự động reng chuông báo có đơn mới ngầm ngay khi khách bấm gửi trên web.

---

## 6. LƯU Ý CHO CÁC PHIÊN LÀM VIỆC TIẾP THEO CỦA AI
- **Giữ vững phong cách TienChuyen24h:** Đơn giản, hiện đại, màu sắc hài hòa (chủ đạo trắng, ngọc `#0D9488`, điểm xuyết vàng kem `#FFF9E6` và đỏ `#DC2626`).
- **Không tự ý thay đổi công thức giá:** 4 chỗ = 10k/km, 7 chỗ = 11k/km, tiện chuyến = 8k/km, khứ hồi giảm 60% chiều về.
- **Khi thêm tuyến đường mới:** Thêm vào mảng `ROUTES_DATA` trong [routes-data.js](file:///d:/nhaxehuuvinh/assets/js/routes-data.js) với trường `distanceKm`, giá sẽ tự động được nhân theo công thức mà không cần tính tay.
- **Sau mỗi lần sửa đổi mã nguồn:** Luôn kiểm tra giao diện bằng trình duyệt, commit và push lên GitHub `origin/main` cho người dùng.

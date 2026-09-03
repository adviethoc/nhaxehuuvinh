# DỊCH VỤ DU LỊCH - ĐƯA ĐÓN TẬN NƠI 24/7 (Hữu Vinh Car)

Website chính thức của dịch vụ xe tiện chuyến, xe ghép và bao xe hợp đồng du lịch liên tỉnh **Hữu Vinh Car**.
- **Quản lý / Tài xế:** Mr Vinh
- **Hotline / Zalo hỗ trợ 24/7:** **0984.650.950**
- **Đội xe thực tế:** 98% xe điện VinFast đời mới (VF6 4 chỗ, VF8 7 chỗ), biển số vàng kinh doanh vận tải: **93H - 064.29**.
- **Tuyến đường phục vụ:** TP.HCM ⇄ Bình Phước (Đồng Xoài, Chơn Thành, Đồng Phú, Tân Lập, Bình Long, Bù Đăng...), Vũng Tàu, Đà Lạt, Biên Hòa, Đắk Nông...

---

## 🌟 Tính Năng Nổi Bật Trên Website

1. **Bảng Giá Cụm Tuyến Nằm Ngang (Chuẩn Accordion TienChuyen24h):**
   - Các tuyến được gom theo từng cụm tỉnh thành khoa học.
   - Thẻ huy hiệu vàng nổi bật với dòng chữ "CHỈ TỪ" màu đỏ và nét gạch nền đỏ uốn cong bên dưới số tiền.
   - Tìm kiếm nhanh chặng tuyến tức thì khi gõ từ khóa.

2. **Công Cụ Tự Nhập Chuyến & Bản Đồ Google Maps (`booking-custom.html`):**
   - **Gợi ý địa chỉ tự động (Autocomplete):** Hỗ trợ tìm kiếm số nhà, tên đường, phường xã tại Việt Nam qua Nominatim & Photon.
   - **Bản đồ chọn vị trí trực tiếp:** Mở modal bản đồ Google Maps, cho phép người dùng kéo thả ghim bằng chuột hoặc vuốt ngón tay cảm ứng trên điện thoại.
   - **Định vị GPS:** Lấy vị trí hiện tại chỉ với 1 chạm.
   - **Đo km đường bộ thực tế:** Tính toán chính xác khoảng cách và thời gian di chuyển qua OSRM Routing Engine.
   - **Tính cước chuẩn xác:**
     - Vé tiện chuyến: 8.000 đ / km
     - Bao xe 4 chỗ: 10.000 đ / km
     - Bao xe 7 chỗ: 11.000 đ / km
     - Khứ hồi 2 chiều trong ngày: Chiều về giảm 60%.

3. **Giao Diện Đồng Bộ & Thân Thiện:**
   - Hoạt động mượt mà trên cả máy tính (Desktop) lẫn điện thoại di động (Mobile).
   - Đầy đủ nút liên hệ nhanh: Gọi điện thoại và nhắn tin Zalo nổi góc màn hình.
   - Các trang đích SEO chi tiết cho từng tuyến trọng điểm trong thư mục `routes/`.

4. **Kết Nối & Gửi Đơn Tự Động:**
   - Tự động chuyển thông tin đơn đặt xe sang Zalo Mr Vinh với nội dung đã được soạn sẵn đầy đủ.
   - Tích hợp sẵn khung Webhook bắn thông báo tức thì về Telegram Bot hoặc lưu vào Google Sheets.

---

## 📂 Cấu Trúc Thư Mục

```text
nhaxehuuvinh/
├── index.html                  # Trang chủ giới thiệu tuyến, bảng giá cụm, ảnh xe thật
├── booking-custom.html         # Trang tự chọn điểm đón/đến & bản đồ đo km tính cước
├── routes/                     # Các trang chặng tuyến chi tiết
│   ├── sai-gon-binh-phuoc.html # TP.HCM đi các huyện thị Bình Phước
│   ├── sai-gon-dong-xoai.html  # Chặng trọng điểm TP.HCM ⇄ Đồng Xoài
│   └── sai-gon-vung-tau.html   # Chặng cao tốc TP.HCM ⇄ Vũng Tàu
├── assets/
│   ├── css/style.css           # Toàn bộ CSS giao diện và hệ thống thiết kế
│   ├── js/
│   │   ├── routes-data.js      # Dữ liệu danh sách tuyến đường và bảng giá
│   │   ├── fare-calculator.js  # Công thức tính cước phí xe theo km
│   │   ├── map-geocoder.js     # Autocomplete địa chỉ và đo km đường bộ OSRM
│   │   ├── map-picker.js       # Module bản đồ Google Maps với ghim lướt chuột/tay
│   │   └── app.js              # Xử lý giao diện, tìm kiếm tuyến và đặt xe
│   ├── vendor/leaflet/         # Thư viện bản đồ Leaflet tải cục bộ
│   └── images/                 # Ảnh thực tế xe VinFast VF6 biển số 93H-064.29
├── sitemap.xml                 # Sơ đồ trang web SEO
├── robots.txt                  # Cấu hình bot tìm kiếm
├── AGENTS.md                   # Cẩm nang ngữ cảnh và quy tắc dành riêng cho AI
└── README.md                   # Giới thiệu dự án
```

---

## 🚀 Chạy Website Trên Môi Trường Cục Bộ (Local)
Website được xây dựng bằng HTML5, Vanilla CSS và JavaScript thuần, không cần build phức tạp:
- Chạy bằng Python:
  ```bash
  python -m http.server 8080
  ```
- Sau đó truy cập `http://localhost:8080` trên trình duyệt.

---
© 2026 Dịch Vụ Du Lịch & Tiện Chuyến Hữu Vinh. Quản lý: Mr Vinh (0984.650.950).
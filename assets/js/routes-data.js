/**
 * Dữ liệu danh sách tuyến đường và bảng giá của Dịch Vụ Du Lịch Hữu Vinh
 * Quản lý: Mr Vinh - Hotline/Zalo: 0984.650.950
 * 100% Xe Điện VinFast (4 chỗ & 7 chỗ)
 * 
 * ĐƠN GIÁ NIÊM YẾT CHUẨN CÔNG THỨC THEO SỐ KM:
 * - Xe 4 chỗ (bao xe): 10.000 đ / km
 * - Xe 7 chỗ (bao xe): 11.000 đ / km
 * - Vé tiện chuyến: 8.000 đ / km
 */

// Đơn giá chuẩn
const RATE_TIEN_CHUYEN = 8000; // 8k/km
const RATE_4_SEATS = 10000;    // 10k/km
const RATE_7_SEATS = 11000;    // 11k/km

const ROUTES_DATA = [
  // Cụm 1: TP.HCM ⇄ Bình Phước
  {
    id: "hcm-dong-xoai",
    group: "hcm-bp",
    groupName: "TP.HCM ⇄ Bình Phước",
    from: "TP.HCM",
    to: "Đồng Xoài (Bình Phước)",
    distanceKm: 100,
    distance: "100 km",
    duration: "Khoảng 2 giờ 15 phút",
    tienChuyenPrice: 100 * RATE_TIEN_CHUYEN, // 800.000đ
    price4Seats: 100 * RATE_4_SEATS,        // 1.000.000đ
    price7Seats: 100 * RATE_7_SEATS,        // 1.100.000đ
    badge: "Hot nhất",
    isPopular: true,
    description: "Đón trả tận nơi tại tất cả các quận huyện TP.HCM và TP. Đồng Xoài. Xe VinFast êm ái, máy lạnh sâu."
  },
  {
    id: "hcm-chon-thanh",
    group: "hcm-bp",
    groupName: "TP.HCM ⇄ Bình Phước",
    from: "TP.HCM",
    to: "Chơn Thành (Bình Phước)",
    distanceKm: 90,
    distance: "90 km",
    duration: "Khoảng 1 giờ 50 phút",
    tienChuyenPrice: 90 * RATE_TIEN_CHUYEN, // 720.000đ
    price4Seats: 90 * RATE_4_SEATS,        // 900.000đ
    price7Seats: 90 * RATE_7_SEATS,        // 990.000đ
    badge: "Phổ biến",
    isPopular: true,
    description: "Tuyến đi qua QL13, KCN Becamex Chơn Thành, đón tận cửa nhà."
  },
  {
    id: "hcm-dong-phu",
    group: "hcm-bp",
    groupName: "TP.HCM ⇄ Bình Phước",
    from: "TP.HCM",
    to: "Đồng Phú (Bình Phước)",
    distanceKm: 90,
    distance: "90 km",
    duration: "Khoảng 2 giờ",
    tienChuyenPrice: 90 * RATE_TIEN_CHUYEN, // 720.000đ
    price4Seats: 90 * RATE_4_SEATS,        // 900.000đ
    price7Seats: 90 * RATE_7_SEATS,        // 990.000đ
    badge: "Ưu đãi",
    isPopular: true,
    description: "Đón trả tận nơi tại Tân Phú, Thuận Phú, Đồng Tâm, Tân Hòa, Đồng Phú."
  },
  {
    id: "hcm-tan-lap",
    group: "hcm-bp",
    groupName: "TP.HCM ⇄ Bình Phước",
    from: "TP.HCM",
    to: "Tân Lập (Đồng Phú – BP)",
    distanceKm: 80,
    distance: "80 km",
    duration: "Khoảng 1 giờ 45 phút",
    tienChuyenPrice: 80 * RATE_TIEN_CHUYEN, // 640.000đ
    price4Seats: 80 * RATE_4_SEATS,        // 800.000đ
    price7Seats: 80 * RATE_7_SEATS,        // 880.000đ
    badge: "Giá rẻ",
    isPopular: false,
    description: "Cửa ngõ Bình Phước, di chuyển thuận tiện nhanh chóng."
  },
  {
    id: "hcm-bu-dang",
    group: "hcm-bp",
    groupName: "TP.HCM ⇄ Bình Phước",
    from: "TP.HCM",
    to: "Bù Đăng (Bình Phước)",
    distanceKm: 130,
    distance: "130 km",
    duration: "Khoảng 3 giờ",
    tienChuyenPrice: 130 * RATE_TIEN_CHUYEN, // 1.040.000đ
    price4Seats: 130 * RATE_4_SEATS,        // 1.300.000đ
    price7Seats: 130 * RATE_7_SEATS,        // 1.430.000đ
    badge: "Đường dài",
    isPopular: false,
    description: "Chạy thẳng theo QL14, phục vụ tận thị trấn Đức Phong và các xã Bù Đăng."
  },
  {
    id: "hcm-binh-long",
    group: "hcm-bp",
    groupName: "TP.HCM ⇄ Bình Phước",
    from: "TP.HCM",
    to: "Bình Long (Bình Phước)",
    distanceKm: 100,
    distance: "100 km",
    duration: "Khoảng 2 giờ 15 phút",
    tienChuyenPrice: 100 * RATE_TIEN_CHUYEN, // 800.000đ
    price4Seats: 100 * RATE_4_SEATS,        // 1.000.000đ
    price7Seats: 100 * RATE_7_SEATS,        // 1.100.000đ
    badge: "Phổ biến",
    isPopular: false,
    description: "Phục vụ An Lộc, Phú Đức, Hưng Chiến và các khu vực lân cận."
  },
  {
    id: "hcm-phuoc-long",
    group: "hcm-bp",
    groupName: "TP.HCM ⇄ Bình Phước",
    from: "TP.HCM",
    to: "Phước Long (Bình Phước)",
    distanceKm: 125,
    distance: "125 km",
    duration: "Khoảng 2 giờ 45 phút",
    tienChuyenPrice: 125 * RATE_TIEN_CHUYEN, // 1.000.000đ
    price4Seats: 125 * RATE_4_SEATS,        // 1.250.000đ
    price7Seats: 125 * RATE_7_SEATS,        // 1.375.000đ
    badge: "Mới",
    isPopular: false,
    description: "Đến chân núi Bà Rá, thị xã Phước Long nhanh chóng, tiện nghi."
  },

  // Cụm 2: TP.HCM ⇄ Bà Rịa - Vũng Tàu
  {
    id: "hcm-vung-tau",
    group: "hcm-vt",
    groupName: "TP.HCM ⇄ Vũng Tàu",
    from: "TP.HCM",
    to: "TP. Vũng Tàu",
    distanceKm: 90,
    distance: "90 km",
    duration: "Khoảng 1 giờ 45 phút",
    tienChuyenPrice: 90 * RATE_TIEN_CHUYEN, // 720.000đ
    price4Seats: 90 * RATE_4_SEATS,        // 900.000đ
    price7Seats: 90 * RATE_7_SEATS,        // 990.000đ
    badge: "Hot du lịch",
    isPopular: true,
    description: "Chạy cao tốc Long Thành - Dầu Giây. Đón trả tận khách sạn Bãi Trước, Bãi Sau, Hồ Tràm."
  },

  // Cụm 3: TP.HCM ⇄ Lâm Đồng
  {
    id: "hcm-da-lat",
    group: "hcm-ld",
    groupName: "TP.HCM ⇄ Lâm Đồng",
    from: "TP.HCM",
    to: "TP. Đà Lạt (Lâm Đồng)",
    distanceKm: 300,
    distance: "300 km",
    duration: "Khoảng 6 giờ",
    tienChuyenPrice: 300 * RATE_TIEN_CHUYEN, // 2.400.000đ
    price4Seats: 300 * RATE_4_SEATS,        // 3.000.000đ
    price7Seats: 300 * RATE_7_SEATS,        // 3.300.000đ
    badge: "Nghỉ dưỡng",
    isPopular: true,
    description: "Xe VinFast điều hòa êm ái, cách âm cực tốt leo đèo an toàn, không lo say xe."
  },
  {
    id: "hcm-bao-loc",
    group: "hcm-ld",
    groupName: "TP.HCM ⇄ Lâm Đồng",
    from: "TP.HCM",
    to: "TP. Bảo Lộc (Lâm Đồng)",
    distanceKm: 180,
    distance: "180 km",
    duration: "Khoảng 3 giờ 45 phút",
    tienChuyenPrice: 180 * RATE_TIEN_CHUYEN, // 1.440.000đ
    price4Seats: 180 * RATE_4_SEATS,        // 1.800.000đ
    price7Seats: 180 * RATE_7_SEATS,        // 1.980.000đ
    badge: "Ưu đãi",
    isPopular: false,
    description: "Thành phố chè, đón trả tận resort hoặc nhà dân Bảo Lộc."
  },

  // Cụm 4: Bình Phước ⇄ Đồng Nai
  {
    id: "dong-xoai-bien-hoa",
    group: "bp-dn",
    groupName: "Bình Phước ⇄ Đồng Nai",
    from: "Đồng Xoài (Bình Phước)",
    to: "Biên Hòa (Đồng Nai)",
    distanceKm: 90,
    distance: "90 km",
    duration: "Khoảng 2 giờ",
    tienChuyenPrice: 90 * RATE_TIEN_CHUYEN, // 720.000đ
    price4Seats: 90 * RATE_4_SEATS,        // 900.000đ
    price7Seats: 90 * RATE_7_SEATS,        // 990.000đ
    badge: "Tiện chuyến",
    isPopular: true,
    description: "Kết nối trung tâm Đồng Xoài về Biên Hòa, KCN Amata, Tam Hiệp."
  },
  {
    id: "dong-phu-bien-hoa",
    group: "bp-dn",
    groupName: "Bình Phước ⇄ Đồng Nai",
    from: "Đồng Phú (Bình Phước)",
    to: "Biên Hòa (Đồng Nai)",
    distanceKm: 80,
    distance: "80 km",
    duration: "Khoảng 1 giờ 45 phút",
    tienChuyenPrice: 80 * RATE_TIEN_CHUYEN, // 640.000đ
    price4Seats: 80 * RATE_4_SEATS,        // 800.000đ
    price7Seats: 80 * RATE_7_SEATS,        // 880.000đ
    badge: "Giá tốt",
    isPopular: false,
    description: "Lộ trình nhanh, linh hoạt đón trả 2 chiều."
  },

  // Cụm 5: Bình Phước ⇄ Vũng Tàu
  {
    id: "dong-xoai-vung-tau",
    group: "bp-vt",
    groupName: "Bình Phước ⇄ Vũng Tàu",
    from: "Đồng Xoài (Bình Phước)",
    to: "TP. Vũng Tàu",
    distanceKm: 160,
    distance: "160 km",
    duration: "Khoảng 3 giờ 30 phút",
    tienChuyenPrice: 160 * RATE_TIEN_CHUYEN, // 1.280.000đ
    price4Seats: 160 * RATE_4_SEATS,        // 1.600.000đ
    price7Seats: 160 * RATE_7_SEATS,        // 1.760.000đ
    badge: "Du lịch biển",
    isPopular: true,
    description: "Tuyến du lịch cuối tuần được yêu thích nhất từ Bình Phước đi tắm biển Vũng Tàu."
  },

  // Cụm 6: Bình Phước ⇄ Đắk Nông
  {
    id: "dong-xoai-gia-nghia",
    group: "bp-dno",
    groupName: "Bình Phước ⇄ Đắk Nông",
    from: "Đồng Xoài (Bình Phước)",
    to: "Gia Nghĩa (Đắk Nông)",
    distanceKm: 120,
    distance: "120 km",
    duration: "Khoảng 2 giờ 30 phút",
    tienChuyenPrice: 120 * RATE_TIEN_CHUYEN, // 960.000đ
    price4Seats: 120 * RATE_4_SEATS,        // 1.200.000đ
    price7Seats: 120 * RATE_7_SEATS,        // 1.320.000đ
    badge: "Tây Nguyên",
    isPopular: false,
    description: "Chạy dọc QL14, phục vụ công tác và thăm người thân tuyến Tây Nguyên."
  },

  // Cụm 7: Bình Phước ⇄ Lâm Đồng
  {
    id: "dong-xoai-cat-tien",
    group: "bp-ld",
    groupName: "Bình Phước ⇄ Lâm Đồng",
    from: "Đồng Xoài (Bình Phước)",
    to: "Cát Tiên (Lâm Đồng)",
    distanceKm: 90,
    distance: "90 km",
    duration: "Khoảng 2 giờ",
    tienChuyenPrice: 90 * RATE_TIEN_CHUYEN, // 720.000đ
    price4Seats: 90 * RATE_4_SEATS,        // 900.000đ
    price7Seats: 90 * RATE_7_SEATS,        // 990.000đ
    badge: "Sinh thái",
    isPopular: false,
    description: "Về rừng quốc gia Cát Tiên và các xã lân cận."
  }
];

// Danh sách tỉnh / địa điểm gợi ý cho bộ chọn tùy chỉnh
const POPULAR_LOCATIONS = [
  "TP.HCM (Quận 1)",
  "TP.HCM (Sân bay Tân Sơn Nhất)",
  "TP.HCM (Bến xe Miền Đông mới / cũ)",
  "TP.HCM (Bệnh viện Chợ Rẫy / Ung Bướu / Nhi Đồng)",
  "TP.HCM (Quận 7, Nhà Bè, Bình Chánh)",
  "Đồng Xoài (Bình Phước)",
  "Chơn Thành (Bình Phước)",
  "Đồng Phú (Bình Phước)",
  "Tân Lập (Đồng Phú, Bình Phước)",
  "Bù Đăng (Bình Phước)",
  "Bình Long (Bình Phước)",
  "Phước Long (Bình Phước)",
  "Lộc Ninh (Bình Phước)",
  "Bù Đốp (Bình Phước)",
  "Biên Hòa (Đồng Nai)",
  "Long Thành (Đồng Nai)",
  "Thủ Dầu Một (Bình Dương)",
  "Bến Cát (Bình Dương)",
  "Tân Uyên (Bình Dương)",
  "TP. Vũng Tàu (Bà Rịa - Vũng Tàu)",
  "Hồ Tràm / Xuyên Mộc (Bà Rịa - Vũng Tàu)",
  "TP. Đà Lạt (Lâm Đồng)",
  "Bảo Lộc (Lâm Đồng)",
  "Gia Nghĩa (Đắk Nông)",
  "Tây Ninh (Núi Bà Đen / Cửa khẩu Mộc Bài)"
];

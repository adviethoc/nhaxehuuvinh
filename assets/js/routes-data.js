/**
 * Dữ liệu danh sách tuyến đường và bảng giá của Dịch Vụ Du Lịch Hữu Vinh
 * Hotline / Zalo: 0984.650.950 - Mr Vinh
 * 100% Xe Điện VinFast (4 chỗ & 7 chỗ)
 */

const ROUTES_DATA = [
  // Cụm TP.HCM ⇄ Bình Phước
  {
    id: "hcm-dong-xoai",
    group: "hcm-bp",
    groupName: "TP.HCM ⇄ Bình Phước",
    from: "TP.HCM",
    to: "Đồng Xoài (Bình Phước)",
    distance: "100 km",
    duration: "Khoảng 2 giờ 15 phút",
    tienChuyenPrice: 550000,
    price4Seats: 1000000,
    price7Seats: 1150000,
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
    distance: "90 km",
    duration: "Khoảng 1 giờ 50 phút",
    tienChuyenPrice: 500000,
    price4Seats: 900000,
    price7Seats: 1100000,
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
    distance: "90 km",
    duration: "Khoảng 2 giờ",
    tienChuyenPrice: 500000,
    price4Seats: 900000,
    price7Seats: 1100000,
    badge: "Ưu đãi",
    isPopular: true,
    description: "Đón trả tận nơi tại Tân Phú, Thuận Phú, Đồng Tâm, Tân Hòa, Đồng Phú."
  },
  {
    id: "hcm-tan-lap",
    group: "hcm-bp",
    groupName: "TP.HCM ⇄ Bình Phước",
    from: "TP.HCM",
    to: "Tân Lập (Đồng Phú - BP)",
    distance: "80 km",
    duration: "Khoảng 1 giờ 45 phút",
    tienChuyenPrice: 450000,
    price4Seats: 800000,
    price7Seats: 950000,
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
    distance: "130 km",
    duration: "Khoảng 3 giờ",
    tienChuyenPrice: 700000,
    price4Seats: 1300000,
    price7Seats: 1500000,
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
    distance: "100 km",
    duration: "Khoảng 2 giờ 15 phút",
    tienChuyenPrice: 550000,
    price4Seats: 1000000,
    price7Seats: 1150000,
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
    distance: "125 km",
    duration: "Khoảng 2 giờ 45 phút",
    tienChuyenPrice: 650000,
    price4Seats: 1200000,
    price7Seats: 1350000,
    badge: "Mới",
    isPopular: false,
    description: "Đến chân núi Bà Rá, thị xã Phước Long nhanh chóng, tiện nghi."
  },

  // Cụm TP.HCM ⇄ Bà Rịa - Vũng Tàu
  {
    id: "hcm-vung-tau",
    group: "hcm-vt",
    groupName: "TP.HCM ⇄ Vũng Tàu",
    from: "TP.HCM",
    to: "TP. Vũng Tàu",
    distance: "90 km",
    duration: "Khoảng 1 giờ 45 phút",
    tienChuyenPrice: 750000,
    price4Seats: 900000,
    price7Seats: 1000000,
    badge: "Hot du lịch",
    isPopular: true,
    description: "Chạy cao tốc Long Thành - Dầu Giây. Đón trả tận khách sạn Bãi Trước, Bãi Sau, Hồ Tràm."
  },

  // Cụm TP.HCM ⇄ Lâm Đồng
  {
    id: "hcm-da-lat",
    group: "hcm-ld",
    groupName: "TP.HCM ⇄ Lâm Đồng",
    from: "TP.HCM",
    to: "TP. Đà Lạt (Lâm Đồng)",
    distance: "300 km",
    duration: "Khoảng 6 giờ",
    tienChuyenPrice: 1400000,
    price4Seats: 2850000,
    price7Seats: 3150000,
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
    distance: "180 km",
    duration: "Khoảng 3 giờ 45 phút",
    tienChuyenPrice: 950000,
    price4Seats: 1800000,
    price7Seats: 2000000,
    badge: "Ưu đãi",
    isPopular: false,
    description: "Thành phố chè, đón trả tận resort hoặc nhà dân Bảo Lộc."
  },

  // Cụm Bình Phước ⇄ Đồng Nai
  {
    id: "dong-xoai-bien-hoa",
    group: "bp-dn",
    groupName: "Bình Phước ⇄ Đồng Nai",
    from: "Đồng Xoài (Bình Phước)",
    to: "Biên Hòa (Đồng Nai)",
    distance: "90 km",
    duration: "Khoảng 2 giờ",
    tienChuyenPrice: 500000,
    price4Seats: 900000,
    price7Seats: 1050000,
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
    distance: "80 km",
    duration: "Khoảng 1 giờ 45 phút",
    tienChuyenPrice: 450000,
    price4Seats: 800000,
    price7Seats: 950000,
    badge: "Giá tốt",
    isPopular: false,
    description: "Lộ trình nhanh, linh hoạt đón trả 2 chiều."
  },

  // Cụm Bình Phước ⇄ Vũng Tàu
  {
    id: "dong-xoai-vung-tau",
    group: "bp-vt",
    groupName: "Bình Phước ⇄ Vũng Tàu",
    from: "Đồng Xoài (Bình Phước)",
    to: "TP. Vũng Tàu",
    distance: "160 km",
    duration: "Khoảng 3 giờ 30 phút",
    tienChuyenPrice: 1050000,
    price4Seats: 1650000,
    price7Seats: 1850000,
    badge: "Du lịch biển",
    isPopular: true,
    description: "Tuyến du lịch cuối tuần được yêu thích nhất từ Bình Phước đi tắm biển Vũng Tàu."
  },

  // Cụm Bình Phước ⇄ Đắk Nông
  {
    id: "dong-xoai-gia-nghia",
    group: "bp-dno",
    groupName: "Bình Phước ⇄ Đắk Nông",
    from: "Đồng Xoài (Bình Phước)",
    to: "Gia Nghĩa (Đắk Nông)",
    distance: "120 km",
    duration: "Khoảng 2 giờ 30 phút",
    tienChuyenPrice: 700000,
    price4Seats: 1200000,
    price7Seats: 1300000,
    badge: "Tây Nguyên",
    isPopular: false,
    description: "Chạy dọc QL14, phục vụ công tác và thăm người thân tuyến Tây Nguyên."
  },

  // Cụm Bình Phước ⇄ Lâm Đồng
  {
    id: "dong-xoai-cat-tien",
    group: "bp-ld",
    groupName: "Bình Phước ⇄ Lâm Đồng",
    from: "Đồng Xoài (Bình Phước)",
    to: "Cát Tiên (Lâm Đồng)",
    distance: "90 km",
    duration: "Khoảng 2 giờ",
    tienChuyenPrice: 500000,
    price4Seats: 900000,
    price7Seats: 1100000,
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

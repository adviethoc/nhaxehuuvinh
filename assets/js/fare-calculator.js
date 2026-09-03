/**
 * Thuật toán tính cước và khoảng cách tự động cho Dịch Vụ Du Lịch Hữu Vinh
 * Hotline / Zalo: 0984.650.950 - Mr Vinh
 */

// Bảng khoảng cách mẫu giữa các trung tâm tỉnh thành (km)
const DISTANCE_MATRIX = {
  "sai gon": {
    "dong xoai": 100,
    "chon thanh": 90,
    "dong phu": 95,
    "tan lap": 80,
    "bu dang": 135,
    "binh long": 100,
    "phuoc long": 125,
    "loc ninh": 125,
    "bien hoa": 35,
    "long thanh": 45,
    "vung tau": 95,
    "ho tram": 115,
    "da lat": 300,
    "bao loc": 180,
    "gia nghia": 230,
    "tay ninh": 95,
    "thu dau mot": 30,
    "ben cat": 50,
    "tan uyen": 40
  },
  "dong xoai": {
    "sai gon": 100,
    "bien hoa": 90,
    "vung tau": 165,
    "da lat": 260,
    "bao loc": 170,
    "gia nghia": 120,
    "chon thanh": 35,
    "dong phu": 15,
    "binh long": 50,
    "phuoc long": 45,
    "bu dang": 55,
    "loc ninh": 65,
    "thu dau mot": 75,
    "tay ninh": 110
  }
};

/**
 * Chuẩn hóa chuỗi tìm kiếm không dấu
 */
function normalizeText(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

/**
 * Ước tính khoảng cách giữa 2 điểm (km)
 */
function estimateDistance(pickup, dropoff) {
  const pNorm = normalizeText(pickup);
  const dNorm = normalizeText(dropoff);

  // Tìm trong matrix trực tiếp
  for (const [origin, destinations] of Object.entries(DISTANCE_MATRIX)) {
    if (pNorm.includes(origin) || (origin === "sai gon" && (pNorm.includes("hcm") || pNorm.includes("ho chi minh") || pNorm.includes("tan son nhat")))) {
      for (const [dest, km] of Object.entries(destinations)) {
        if (dNorm.includes(dest)) {
          return km;
        }
      }
    }
  }

  // Đảo chiều tìm kiếm
  for (const [origin, destinations] of Object.entries(DISTANCE_MATRIX)) {
    if (dNorm.includes(origin) || (origin === "sai gon" && (dNorm.includes("hcm") || dNorm.includes("ho chi minh") || dNorm.includes("tan son nhat")))) {
      for (const [dest, km] of Object.entries(destinations)) {
        if (pNorm.includes(dest)) {
          return km;
        }
      }
    }
  }

  // Fallback ngẫu nhiên có căn cứ dựa trên độ dài chuỗi hoặc mặc định 85km
  let hash = 0;
  for (let i = 0; i < pNorm.length + dNorm.length; i++) {
    hash += (pNorm.charCodeAt(i % pNorm.length) || 0) + (dNorm.charCodeAt(i % dNorm.length) || 0);
  }
  return 60 + (hash % 80);
}

/**
 * Ước tính thời gian di chuyển dựa trên km
 */
function estimateTravelTime(distanceKm) {
  const hours = Math.floor(distanceKm / 45); // Trung bình 45km/h nội/ngoại ô kết hợp
  const mins = Math.round(((distanceKm % 45) / 45) * 60);
  if (hours === 0) {
    return `${Math.max(mins, 25)} phút`;
  }
  return `${hours} giờ ${mins > 0 ? mins + ' phút' : ''}`;
}

/**
 * Tính toán giá cước trọn gói
 * @param {number} distanceKm Khoảng cách (km)
 * @param {string} carType '4seats' | '7seats'
 * @param {string} tripType 'oneway' | 'roundtrip'
 * @param {string} serviceType 'tienchuyen' | 'baoxe'
 */
function calculateFare(distanceKm, carType = "4seats", tripType = "oneway", serviceType = "tienchuyen") {
  let baseRatePerKm = carType === "7seats" ? 11500 : 10000;
  let minFare = carType === "7seats" ? 500000 : 400000;

  // Tính giá bao xe 1 chiều gốc
  let fullCarOneway = Math.max(minFare, distanceKm * baseRatePerKm);
  
  // Làm tròn tới hàng chục nghìn
  fullCarOneway = Math.round(fullCarOneway / 50000) * 50000;

  let fareResult = {
    distanceKm: distanceKm,
    durationText: estimateTravelTime(distanceKm),
    carType: carType,
    tripType: tripType,
    serviceType: serviceType,
    finalPrice: 0,
    price4Seats: fullCarOneway,
    price7Seats: Math.round((fullCarOneway * 1.18) / 50000) * 50000,
    tienChuyenPrice: Math.round((fullCarOneway * 0.58) / 50000) * 50000
  };

  // Tính giá cuối cùng theo tùy chọn
  let targetBase = (carType === "7seats") ? fareResult.price7Seats : fareResult.price4Seats;

  if (serviceType === "tienchuyen") {
    fareResult.finalPrice = Math.round((targetBase * 0.6) / 50000) * 50000;
  } else {
    fareResult.finalPrice = targetBase;
  }

  // Nếu là khứ hồi 2 chiều: Chiều về giảm 40%
  if (tripType === "roundtrip") {
    fareResult.finalPrice = Math.round((fareResult.finalPrice * 1.6) / 50000) * 50000;
  }

  return fareResult;
}

/**
 * Định dạng tiền tệ VNĐ
 */
function formatVND(amount) {
  if (!amount || isNaN(amount)) return "0 đ";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(amount)
    .replace("₫", "đ");
}

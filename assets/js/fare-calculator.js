/**
 * Thuật toán tính cước và khoảng cách tự động cho Dịch Vụ Du Lịch Hữu Vinh
 * Công thức giá theo yêu cầu:
 * - Xe 4 chỗ: 8.000 đ / km (1 chiều)
 * - Xe 7 chỗ: 9.000 đ / km (1 chiều)
 * - Giá 2 chiều (khứ hồi): Chiều về giảm 60% so với chiều đi (Tổng 2 chiều = Chiều đi + 40% Chiều về = 1.4 * Chiều đi)
 * Hotline / Zalo: 0984.650.950 - Mr Vinh
 */

// Đơn giá niêm yết
const FARE_RATES = {
  "4seats": 8000,   // 8k / km
  "7seats": 9000    // 9k / km
};

/**
 * Tính giá cước theo số km thực tế và quy tắc giảm giá khứ hồi
 * @param {number} distanceKm Khoảng cách thực tế (km)
 * @param {string} carType '4seats' | '7seats'
 * @param {string} tripType 'oneway' | 'roundtrip'
 */
function calculateFare(distanceKm, carType = "4seats", tripType = "oneway") {
  // Khoảng cách tối thiểu tính cước là 15km để đảm bảo chi phí điều xe
  const actualKm = Math.max(distanceKm, 15);
  const ratePerKm = FARE_RATES[carType] || 8000;

  // Giá cước chiều đi gốc
  const onewayPrice = Math.round((actualKm * ratePerKm) / 10000) * 10000;

  let returnPrice = 0;
  let finalPrice = onewayPrice;
  let returnDiscountText = "";

  if (tripType === "roundtrip") {
    // Chiều về giảm 60% -> Khách chỉ phải trả 40% giá chiều đi
    returnPrice = Math.round((onewayPrice * 0.4) / 10000) * 10000;
    finalPrice = onewayPrice + returnPrice;
    returnDiscountText = "Chiều về giảm 60%";
  }

  return {
    distanceKm: actualKm,
    durationText: estimateTravelTime(actualKm),
    carType: carType,
    tripType: tripType,
    ratePerKm: ratePerKm,
    onewayPrice: onewayPrice,
    returnPrice: returnPrice,
    finalPrice: finalPrice,
    returnDiscountText: returnDiscountText
  };
}

/**
 * Ước tính thời gian di chuyển dựa trên số km
 */
function estimateTravelTime(distanceKm) {
  const speed = 48; // km/h
  const hours = Math.floor(distanceKm / speed);
  const mins = Math.round(((distanceKm % speed) / speed) * 60);
  if (hours === 0) {
    return `${Math.max(mins, 20)} phút`;
  }
  return `${hours} giờ ${mins > 0 ? mins + ' phút' : ''}`;
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

/**
 * Tính khoảng cách đường chim bay (Haversine Formula) làm fallback
 */
function calculateHaversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const straightKm = R * c;
  // Nhân hệ số uốn khúc đường bộ thực tế ~1.28
  return Math.round(straightKm * 1.28);
}

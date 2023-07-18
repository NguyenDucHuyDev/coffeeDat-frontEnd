
export const formatCurrency = (price, unit = "VND") => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: unit }).format(price)
}
export const formatPrice = (n) => `Rs.${n.toLocaleString("en-US")}`;

export const discountPercent = (price, oldPrice) =>
  oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0;

export function discountCalculate(price, discount) {
  if (discount) {
    return Math.floor((price * (100 - discount)) / 100000) * 1000;
  } else {
    return price;
  }
}

export function sumDiscountCalculate(basket) {
  let sumDiscountPrice = 0;
  basket.list.forEach((item) => {
    if (
      (item.count >= item.product.wholesale.number && item.product.wholesale.price < item.product.price) ||
      item.product.discount
    ) {
      const diffrencePrice =
        (item.product.price -
          discountCalculate(
            item.count >= item.product.wholesale.number ? item.product.wholesale.price : item.product.price,
            item.product.discount
          )) *
        item.count;
      sumDiscountPrice += diffrencePrice;
    }
  });
  return sumDiscountPrice;
}

export function discountPercentageCalculate(initialPrice, finalPrice) {
  if (initialPrice <= finalPrice) {
    return 0;
  }
  return Math.floor(((initialPrice - finalPrice) / initialPrice) * 100) || 1;
}

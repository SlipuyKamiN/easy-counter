export const groupItems = (items) => {
  return Object.values(
    items.reduce((acc, item) => {
      const key = item.name;

      if (!acc[key]) {
        acc[key] = { ...item, quantity: item.quantity || 1 };
      } else {
        acc[key].quantity += 1;
      }

      return acc;
    }, {}),
  );
};

export const getCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    return item.quantity
      ? total + item.price * item.quantity
      : total + item.price;
  }, 0);
};

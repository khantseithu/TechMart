export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state, item) => {
  const existItem = state.cartItems.find((x) => x._id === item._id);
  if (existItem) {
    state.cartItems = state.cartItems.map((x) =>
      x._id === existItem._id ? item : x
    );
  } else {
    state.cartItems = [...state.cartItems, item];
  }

  // calculate the items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // calculate the tax price (15%)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  // calculate the shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // calculate the total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.taxPrice) +
    Number(state.shippingPrice)
  ).toFixed(2);

  // Save cart to local storage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://khantseithu-potential-train-p594gqv6x5636457-5000.preview.app.github.dev'
    : 'https://mern-ecommerce-website.herokuapp.com';

export const PRODUCTS_URL = `/api/products`;
export const USERS_URL = `/api/users`;

import axios from "axios";


const domain = process.env.NEXT_PUBLIC_DOMAIN;

// For Products

export async function productHandler(category, page) {

  let apiUrl = `${domain}/api/products/getproducts?page=${page}`;
  try {
    if (category) {
      apiUrl = `${apiUrl}&category=${category}`;
    }

    const res = await axios.get(apiUrl);
    return {
      data: res.data.data,
      pagination: res.data.pagination
    };
  } catch (error) {
    return error;
  }
}

export async function singleProductHandler(data) {
  try {
    const res = await axios.get(`${domain}/api/products/${data}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

// Admin 

export async function adminProductsHandler() {
  try {
    const res = await axios.get(`${domain}/api/products/adminproduct`);
    return res.data;
  } catch (error) {
    return error;
  }
}


export async function createProductsHandler(formData) {
  try {
    const res = await axios.post(`${domain}/api/products/createproduct`,formData);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function deleteProductHandler(id) {

  try {
    const res = await axios.delete(`${domain}/api/products/deleteproduct?productId=${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
}



// FOR CART 

export async function addToCartHandler(productId) {
  const apiUrl = `${domain}/api/cart/createcart`;
  try {
    const res = await axios.post(apiUrl, { productId });
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getCartHandler() {
  const apiUrl = `${domain}/api/cart/getcart`;
  try {
    const res = await axios.get(apiUrl, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function deleteCartHandler() {
  const apiUrl = `${domain}/api/cart/deletecart`;
  try {
    const res = await axios.delete(apiUrl, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
}
export async function deleteCartItemHandler(cartId) {
  const apiUrl = `${domain}/api/cart/deletesinglecart`;
  try {
    const res = await axios.delete(apiUrl, {
      data: cartId,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function updateCartHandler(cartData) {
  const apiUrl = `${domain}/api/cart/updatecart`;
  try {
    const res = await axios.patch(apiUrl, cartData, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getCheckoutHandler() {
  const apiUrl = `${domain}/api/checkout`;
  try {
    const res = await axios.get(apiUrl, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
}


//FOR USER 

export async function getProfileHandler() {
  const apiUrl = `${domain}/api/users/profile`;
  try {
    const res = await axios.get(apiUrl, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function profileLogoutHandler() {
  const apiUrl = `${domain}/api/users/signout`;
  try {
    const res = await axios.get(apiUrl, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function LogInHandler(formData) {
  const apiUrl = `${domain}/api/users/signin`;
  try {
    const res = await axios.post(apiUrl, formData,{ withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
}

//Payment

export async function paymentHandler(formData) {
  const apiUrl = `${domain}/api/payment/createpayment`;
  try {
    const res = await axios.get(apiUrl, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function verifyPaymentHandler(data) {
  const apiUrl = `${domain}/api/payment/verifypayment`;
  try {
    const res = await axios.post(apiUrl,data, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
}

//Order 
export async function getOrderHandler() {
  const apiUrl = `${domain}/api/orders/getorder`;
  try {
    const res = await axios.get(apiUrl,{ withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getAllOrdersHandler() {
  const apiUrl = `${domain}/api/orders/getallorders`;
  try {
    const res = await axios.get(apiUrl);
    return res.data;
  } catch (error) {
    return error;
  }
}


export async function updateOrderStatusHandler(id) {

  const apiUrl = `${domain}/api/orders/updateorder`;
  try {
    const res = await axios.patch(apiUrl,{orderId:id});
    return res.data;
  } catch (error) {
    return error;
  }
}
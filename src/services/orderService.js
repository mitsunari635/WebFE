import axios from "../axios";

const getOrder = (orderId) => {
  return axios.get(`/api/get-order?id=${orderId}`);
};

// const editOrder = (orderInfo) => {
//     return axios.put(`/api/edit-order`,orderInfo);
// }
const deleteOrder = (orderInfo) => {
  return axios.delete("/api/delete-order", {
    data: {
      id: orderInfo.id,
      orderNumber: orderInfo.orderNumber,
    },
  });
};

const getDetailOrder = (orderNumber) => {
  return axios.get(`/api/get-detail-order?number=${orderNumber}`);
};

const getUserByOrderNumber = (orderNumber) => {
  return axios.get(`/api/get-by-order-number?orderNumber=${orderNumber}`);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const editOrderStatus = (data) => {
  return axios.put("/api/edit-order-status", data);
};

const checkNewOrder = () => {
  return axios.get(`/api/check-new-order`);
};

export {
  getOrder,
  deleteOrder,
  getDetailOrder,
  getUserByOrderNumber,
  getAllCodeService,
  editOrderStatus,
  checkNewOrder,
};

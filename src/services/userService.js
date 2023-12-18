import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  // template string
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserFunc = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserFunc = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserFunc = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const sendContactEmail = (data) => {
  return axios.post(`api/send-contact-email`, data);
};

const sendRequestEmail = (data) => {
  return axios.post(`api/send-request-email`, data);
};

const sendOrderEmail = (data) => {
  return axios.post(`api/send-order-email`, data);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserFunc,
  deleteUserFunc,
  editUserFunc,
  getAllCodeService,
  sendContactEmail,
  sendRequestEmail,
  sendOrderEmail,
};

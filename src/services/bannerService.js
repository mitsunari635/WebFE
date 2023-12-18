import axios from "../axios";

// const handleLoginApi = (email, password) => {
//     return axios.post('/api/login', { email, password });
// }

const getAllBanner = (inputId) => {
  // template string
  return axios.get(`/api/get-all-banner?id=${inputId}`);
};

const createNewBannerFunc = (data) => {
  return axios.post("/api/create-new-banner", data);
};

const deleteBannerFunc = (bannerId) => {
  return axios.delete("/api/delete-banner", {
    data: {
      id: bannerId,
    },
  });
};

const editBannerFunc = (inputData) => {
  return axios.put("/api/edit-banner", inputData);
};

const getAllBannerPageService = (limit) => {
  return axios.get(`/api/get-all-banner-page?limit=${limit}`);
};
export {
  getAllBanner,
  createNewBannerFunc,
  deleteBannerFunc,
  editBannerFunc,
  getAllBannerPageService,
};

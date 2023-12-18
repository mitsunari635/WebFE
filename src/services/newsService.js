import axios from "../axios";

// const handleLoginApi = (email, password) => {
//     return axios.post('/api/login', { email, password });
// }

const getAllNews = (inputId) => {
  // template string
  return axios.get(`/api/get-all-news?id=${inputId}`);
};

const createNewNewsFunc = (data) => {
  return axios.post("/api/create-new-news", data);
};

const deleteNewsFunc = (newsId) => {
  return axios.delete("/api/delete-news", {
    data: {
      id: newsId,
    },
  });
};

const editNewsFunc = (inputData) => {
  return axios.put("/api/edit-news", inputData);
};

const getAllDetailNews = () => {
  return axios.get("/api/get-all-detail-news");
};

const saveDetailNewsService = (data) => {
  return axios.post("/api/save-info-News", data);
};

const getDetailInforNewsById = (inputId) => {
  return axios.get(`/api/get-detail-news-by-id?id=${inputId}`);
};

export {
  getAllNews,
  createNewNewsFunc,
  deleteNewsFunc,
  editNewsFunc,
  getDetailInforNewsById,
  saveDetailNewsService,
  getAllDetailNews,
};

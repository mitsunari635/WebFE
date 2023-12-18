import axios from "../axios";

// const handleLoginApi = (email, password) => {
//     return axios.post('/api/login', { email, password });
// }

const getAllPolicy = (inputId) => {
  // template string
  return axios.get(`/api/get-all-policy?id=${inputId}`);
};

const createNewPolicyFunc = (data) => {
  return axios.post("/api/create-new-policy", data);
};

const deletePolicyFunc = (policyId) => {
  return axios.delete("/api/delete-policy", {
    data: {
      id: policyId,
    },
  });
};

const editPolicyFunc = (inputData) => {
  return axios.put("/api/edit-policy", inputData);
};

const getAllPolicyPageService = (limit) => {
  return axios.get(`/api/get-all-policy-page?limit=${limit}`);
};

const saveDetailPolicyService = (data) => {
  return axios.post("/api/save-info-policy", data);
};

const getAllDetailPolicy = () => {
  return axios.get("/api/get-all-detail-policy");
};

const getDetailInforPolicy = (inputId) => {
  return axios.get(`/api/get-detail-policy-by-id?id=${inputId}`);
};

export {
  getAllPolicy,
  createNewPolicyFunc,
  deletePolicyFunc,
  editPolicyFunc,
  getDetailInforPolicy,
  saveDetailPolicyService,
  getAllDetailPolicy,
  getAllPolicyPageService,
};

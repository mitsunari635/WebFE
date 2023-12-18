import axios from "../axios";

// const handleLoginApi = (email, password) => {
//     return axios.post('/api/login', { email, password });
// }

const getAllProducts = (inputId) => {
  // template string
  return axios.get(`/api/get-all-products?id=${inputId}`);
};

const createNewProductFunc = (data) => {
  return axios.post("/api/create-new-product", data);
};

const deleteProductFunc = (productId) => {
  return axios.delete("/api/delete-product", {
    data: {
      id: productId,
    },
  });
};

const editProductFunc = (inputData) => {
  return axios.put("/api/edit-product", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getRollPaperService = (limit) => {
  return axios.get(`/api/roll-paper-home?limit=${limit}`);
};

const getPhotoPaperService = (limit) => {
  return axios.get(`/api/photo-paper-home?limit=${limit}`);
};

const getPerforatedPaperService = (limit) => {
  return axios.get(`/api/perforated-paper-home?limit=${limit}`);
};

const getPrintedPaperService = (limit) => {
  return axios.get(`/api/printed-paper-home?limit=${limit}`);
};

const getPrintedFormService = (limit) => {
  return axios.get(`/api/printed-form-home?limit=${limit}`);
};

const getPrintedRollService = (limit) => {
  return axios.get(`/api/printed-roll-home?limit=${limit}`);
};

const getPackageService = (limit) => {
  return axios.get(`/api/package-home?limit=${limit}`);
};

const getEnvelopeService = (limit) => {
  return axios.get(`/api/envelope-home?limit=${limit}`);
};

const getLabelStampService = (limit) => {
  return axios.get(`/api/label-stamp-home?limit=${limit}`);
};

const getDocumentService = (limit) => {
  return axios.get(`/api/document-home?limit=${limit}`);
};

const getImportExportService = (limit) => {
  return axios.get(`/api/import-export-home?limit=${limit}`);
};

const getExpressService = (limit) => {
  return axios.get(`/api/express-home?limit=${limit}`);
};

const getSeaAirBillService = (limit) => {
  return axios.get(`/api/sea-air-bill-home?limit=${limit}`);
};

const getPaycheckService = (limit) => {
  return axios.get(`/api/paycheck-home?limit=${limit}`);
};

const getAtmBillService = (limit) => {
  return axios.get(`/api/atm-bill-home?limit=${limit}`);
};

const getEdcBillService = (limit) => {
  return axios.get(`/api/edc-bill-home?limit=${limit}`);
};

const getOtherPrintService = (limit) => {
  return axios.get(`/api/other-print-home?limit=${limit}`);
};

const getStampService = (limit) => {
  return axios.get(`/api/stamp-home?limit=${limit}`);
};

const getAllProductPageService = (limit) => {
  return axios.get(`/api/get-all-product-page?limit=${limit}`);
};

const saveDetailProductService = (data) => {
  return axios.post("/api/save-info-product", data);
};

const getAllDetailProduct = () => {
  return axios.get("/api/get-all-detail-product");
};

const getDetailInforProduct = (inputId, inputName) => {
  let url = `/api/get-detail-product-by-id`;
  let params = {};

  if (inputId) {
    params.id = inputId;
  }

  if (inputName) {
    params.name = inputName;
  }

  return axios.get(url, { params });
};

export {
  getAllProducts,
  createNewProductFunc,
  deleteProductFunc,
  editProductFunc,
  getAllCodeService,
  getRollPaperService,
  getPhotoPaperService,
  getPerforatedPaperService,
  getPrintedPaperService,
  getDetailInforProduct,
  saveDetailProductService,
  getAllDetailProduct,
  getAllProductPageService,
  getPrintedFormService,
  getPrintedRollService,
  getPackageService,
  getEnvelopeService,
  getDocumentService,
  getImportExportService,
  getExpressService,
  getSeaAirBillService,
  getPaycheckService,
  getAtmBillService,
  getEdcBillService,
  getOtherPrintService,
  getStampService,
  getLabelStampService,
};

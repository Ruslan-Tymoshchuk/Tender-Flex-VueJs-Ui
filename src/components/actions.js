import { reactive } from 'vue'
import { restApiEndpoints } from "@/rest.api.endpoints"
import { exceptionAlert } from "@/components/alerts"
import router from "@/router/index";
import axios from 'axios';

export const getOriginalFileName = (uniqueFileName) => {
  return uniqueFileName.substring(37);
}

export const totalStore = reactive({
  tenders: 0,
  offers: 0,

  async refreshTotalCounts() {
    const [tendersCount, offersCount] = await Promise.all([
      fetchFromEndpoint(restApiEndpoints.tendersCount),
      fetchFromEndpoint(restApiEndpoints.offersCount),
    ]);
    this.tenders = tendersCount.data.bidCount;
    this.offers = offersCount.data.bidCount;
  }
});

export const fetchFromEndpoint = async (endpointKey) => {
  return await axios.get(`${restApiEndpoints.host}${endpointKey}`, {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
    }
  });
}

export const confirmRedirect = (email, password) => {
  authenticate({ email, password })
    .then(user => {
      if (user.role === "CONTRACTOR") {
        router.push({ name: "contractor-module", params: { userId: user.userId, role: "contractor" } });
      } else if (user.role === "BIDDER") {
        router.push({ name: "bidder-module", params: { userId: user.userId, role: "bidder" } });
      } else if (user.role === "ADMIN") {
        router.push({ name: "admin-module", params: { userId: user.userId, role: "admin" } });
      }
    })
    .catch((error) => exceptionAlert.activateAlert(error.response.data.message))
}

const authenticate = async (authenticationRequest) => {
  const response = await axios.post(`${restApiEndpoints.host}${restApiEndpoints.logIn}`, authenticationRequest, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${restApiEndpoints.host}${restApiEndpoints.files}`, formData, {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const createDocumentRecord = (document, endpointKey) => {
  return axios.post(`${restApiEndpoints.host}${endpointKey}`, document, {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

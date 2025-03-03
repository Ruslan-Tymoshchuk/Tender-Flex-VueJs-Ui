import { reactive } from 'vue'
import { REST_URL_APIS } from "@/rest.api.endpoints"
import { exceptionAlert } from "@/components/alerts"
import { USER_ROLE } from "@/components/constants"
import router from "@/router/index";
import axios from 'axios';

export const totalStore = reactive({
  tenders: 0,
  offers: 0,

  async refreshTotalCounts() {
    const [tenderCountResponse, offerCountResponse] = await Promise.all([
      fetchFromEndpoint(`${REST_URL_APIS.HOST}/${REST_URL_APIS.TENDERS_COUNT}`),
      fetchFromEndpoint(`${REST_URL_APIS.HOST}/${REST_URL_APIS.OFFERS_COUNT}`),
    ]);
    this.tenders = tenderCountResponse.data.count;
    this.offers = offerCountResponse.data.count;
  }
});

export const fetchFromEndpoint = async (endpointKey) => {
  return await axios.get(endpointKey, {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
    }
  });
}

export const confirmRedirect = async (email, password) => {

    const userAuthenticationResponse = await authenticate({ email, password });
    router.push({
      name: "user-module",
      params: {
        userId: userAuthenticationResponse.data.userId,
        role: USER_ROLE[userAuthenticationResponse.data.role]
      }
    });

}

const authenticate = (authenticationRequest) => {
  try {
  return axios.post(`${REST_URL_APIS.HOST}/${REST_URL_APIS.LOGIN}`, authenticationRequest, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
} catch (error) {
  exceptionAlert.activateAlert(error.response.data.message)
}
}

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${REST_URL_APIS.HOST}/${REST_URL_APIS.FILES}`, formData, {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const downloadFile = (fileKey) => {
  try {
    return axios.get(`${REST_URL_APIS.HOST}/${REST_URL_APIS.FILES}/${fileKey}`, {
      withCredentials: true,
      responseType: 'blob',
    });
  } catch (error) {
    exceptionAlert.activateAlert(error.response.data.message);
  }
}

export const createDocumentRecord = (document, endpointKey) => {
  return axios.post(`${REST_URL_APIS.HOST}/${endpointKey}`, document, {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

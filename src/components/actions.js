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

  getTotalByModule(role) {
    fetch(`${restApiEndpoints.host}${restApiEndpoints.total}/${role}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(response => response.json())
      .then(response => {
        this.tenders = response.tenders;
        this.offers = response.offers;
      })
      .catch(error => console.log('There was an error', error));
  }
})

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
};

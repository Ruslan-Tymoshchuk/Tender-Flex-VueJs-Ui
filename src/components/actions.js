import { reactive } from 'vue'
import { restApiConfig } from "@/rest.api.config"
import router from "@/router/index";

export const getOriginalFileName = (uniqueFileName) => {
  return uniqueFileName.substring(37);
}

export const totalStore = reactive({
  tenders: 0,
  offers: 0,

  getTotalByModule(role) {
    fetch(`${restApiConfig.host}${restApiConfig.total}/${role}`, {
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

export const successAlert = reactive({
  isActivated: false,
  message: '',

  activateAlert(message) {
    this.message = message
    this.isActivated = true;
    setTimeout(() => {
      this.isActivated = false;
    }, 7000);
  }
})

export const confirmRedirect = (email, password) => {
  authenticate(email, password)
    .then(user => {
      if (user.role === "CONTRACTOR") {
        router.push({ name: "contractor-module", params: { role: "contractor" } });
      } else if (user.role === "BIDDER") {
        router.push({ name: "bidder-module", params: { role: "bidder" } });
      } else if (user.role === "ADMIN") {
        router.push({ name: "admin-module", params: { role: "admin" } });
      }
    })
    .catch(() => "There was an error")
}

const authenticate = (email, password) =>
  new Promise((resolve, reject) =>
    fetch(`${restApiConfig.host}${restApiConfig.logIn}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
  )

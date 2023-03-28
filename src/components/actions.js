import { reactive } from 'vue'
import { restApiConfig } from "@/rest.api.config"

export const getOriginalFileName = (uniqueFileName) => {
  return uniqueFileName.substring(37);
}

export const totalStore = reactive ({
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

export const successAlert = reactive ({
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

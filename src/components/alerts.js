import { reactive } from 'vue'

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

export const exceptionAlert = reactive({
  isActivated: false,
  message: '',

  activateAlert(message) {
    this.message = message
    this.isActivated = true;
    setTimeout(() => {
      this.isActivated = false;
    }, 5000);
  }
})

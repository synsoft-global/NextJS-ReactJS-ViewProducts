export const showToast = (snackbar: any, message: string, key: string, variant: string, closeSnackbar: any) => {
    snackbar(message, { variant: variant, persist: true, preventDuplicate: true, key:key});
    setTimeout(() => {closeSnackbar(key)}, 4000);
  }

export const SUCCESS_LOGIN_MESSAGE = 'Successfully logged in.';
export const submitLoginForm = (nickname) => {
  return { type: 'LOGIN_FORM_ON_SUBMIT', nickname: nickname };
}

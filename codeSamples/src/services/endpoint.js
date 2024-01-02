export const baseUrl_Staging = ''; // testing server
// export const baseUrl_Production = '/api/'; // production server

export const baseUrl = baseUrl_Staging;
const URL = {
  SIGN_UP: baseUrl + 'sign-up',
  SIGN_IN_MANUALLY: baseUrl + 'sign-in-manually',
  SIGN_IN_ANONYMOUSLY: baseUrl + 'sign-in-anonymously',
  FORGOT_PASSWORD: baseUrl + 'forgot-password',
  VERIFY_OTP: baseUrl + 'verify-reset-password-otp',
  RESET_PASSWORD: baseUrl + 'reset-password',
};
export default URL;

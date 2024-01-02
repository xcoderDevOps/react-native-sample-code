import {configureStore} from '@reduxjs/toolkit';
import forgotPasswordSliceReducer from './commonSlices/forgotPassword.slice';
import signUpSliceReducer from './commonSlices/signUpSlice';
import signInSliceReducer from './commonSlices/signInSlice';
import mapReducer from './commonSlices/mapViewSlice';
import videoPlayerSliceReducer from './commonSlices/videoPlayerSlice';
import datePickerReducer from './commonSlices/datePickerSlice';
import severityLevelSliceReducer from './commonSlices/severityLevelSlice';
import mediaSliceReducer from './commonSlices/mediaSlice';
import signInAnnonSliceReducer from './commonSlices/signinAnonymouslySlice';
import resetPasswordSliceReducer from './commonSlices/resetPasswordSlice';

export const store = configureStore({
  reducer: {
    forgotPasswordSliceReducer,
    signUpSliceReducer,
    signInSliceReducer,
    map: mapReducer,
    videoPlayerSliceReducer,
    datePickerReducer,
    severityLevelSliceReducer,
    mediaSliceReducer,
    signInAnnonSliceReducer,
    resetPasswordSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
    }),
});

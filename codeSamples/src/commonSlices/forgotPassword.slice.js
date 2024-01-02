import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../services/endpoint';
import {client} from '../services/client';
const initialState = {
  otp: '',
  email: '',
  emailError: false,
  forgotPasswordResponse: {},
  loading: false,
  verifyOtp_response: {},
};
export const forgotPassword = createAsyncThunk(
  'forgotPasswordSlice/forgotPassword',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.FORGOT_PASSWORD, params);

      return response.data;
    } catch (error) {
      // console.log('error-- ', error);
      return error.data;
    }
  },
);

export const verifyOtp = createAsyncThunk(
  'forgotPasswordSlice/verifyOtp',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.VERIFY_OTP, params);

      return response.data;
    } catch (error) {
      // console.log('error-- ', error);
      return error.data;
    }
  },
);

export const forgotPasswordSlice = createSlice({
  name: 'forgotPasswordSlice',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.otp = '';
      state.email = '';
      state.forgotPasswordResponse = {};
      state.loading = false;
      state.verifyOtp_response = {};
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    updateOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(forgotPassword.pending, state => {
      state.loading = true;
      state.forgotPasswordResponse = {};
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.forgotPasswordResponse = action.payload;
      }
    });
    builder.addCase(forgotPassword.rejected, state => {
      state.loading = false;
      state.forgotPasswordResponse = {};
    });

    builder.addCase(verifyOtp.pending, state => {
      state.loading = true;
      state.verifyOtp_response = {};
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.verifyOtp_response = action.payload;
      }
    });
    builder.addCase(verifyOtp.rejected, state => {
      state.loading = false;
      state.verifyOtp_response = {};
    });
  },
});

export const {clearState, updateEmail, updateOtp} = forgotPasswordSlice.actions;

const forgotPasswordSliceReducer = forgotPasswordSlice.reducer;

export default forgotPasswordSliceReducer;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../services/endpoint';
import {client} from '../services/client';
const initialState = {
  emailUsers: '',
  resetPasswordRespons: {},
  loading: false,
  newPassword: '',
  confirmPassword: '',
};
export const resetPassword = createAsyncThunk(
  'resetPasswordSlice/resetPassword',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.RESET_PASSWORD, params);

      return response.data;
    } catch (error) {
      // console.log('error-- ', error);
      return error.data;
    }
  },
);

export const resetPasswordSlice = createSlice({
  name: 'resetPasswordSlice',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.otp = '';
      state.emailUsers = '';
      state.resetPasswordRespons = {};
      state.loading = false;
      state.confirmPassword = '';
      state.newPassword = '';
    },
    updateEmailReset: (state, action) => {
      state.emailUsers = action.payload;
    },
    updateNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
    updateConfirmPass: (state, action) => {
      state.confirmPassword = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(resetPassword.pending, state => {
      state.loading = true;
      state.resetPasswordRespons = {};
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.resetPasswordRespons = action.payload;
      }
    });
    builder.addCase(resetPassword.rejected, state => {
      state.loading = false;
      state.resetPasswordRespons = {};
    });
  },
});

export const {
  clearState,
  updateEmailReset,
  updateConfirmPass,
  updateNewPassword,
} = resetPasswordSlice.actions;

const resetPasswordSliceReducer = resetPasswordSlice.reducer;

export default resetPasswordSliceReducer;

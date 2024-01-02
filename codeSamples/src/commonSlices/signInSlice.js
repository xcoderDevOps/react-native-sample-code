import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../services/endpoint';
import {client} from '../services/client';
const initialState = {
  userEmail: '',
  emailError: '',
  userPassword: '',
  passwordError: '',
  error: '',
  loading: false,
  sininResponse: {},
};
export const signInAction = createAsyncThunk(
  'signIpSlice/signInAction',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.SIGN_IN_MANUALLY, params);
      return response.data;
    } catch (error) {
      return error.data;
      // return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signInSlice = createSlice({
  name: 'signInSlice',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.userEmail = '';
      state.userPassword = '';
      state.emailError = '';
      state.passwordError = '';
      state.sininResponse = {};
    },
    signInUpdateEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    signInUpdatePassword: (state, action) => {
      state.userPassword = action.payload;
    },
    signInUpdateEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    signInUpdatePasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signInAction.pending, state => {
      state.loading = true;
      state.sininResponse = {};
    });
    builder.addCase(signInAction.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.sininResponse = action.payload;
      }
    });
    builder.addCase(signInAction.rejected, state => {
      state.loading = false;
      state.sininResponse = {};
    });
  },
});

export const {
  clearState,
  signInUpdateEmail,
  signInUpdateEmailError,
  signInUpdatePassword,
  signInUpdatePasswordError,
} = signInSlice.actions;

const signInSliceReducer = signInSlice.reducer;

export default signInSliceReducer;

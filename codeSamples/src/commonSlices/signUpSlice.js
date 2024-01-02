import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../services/endpoint';
import {client} from '../services/client';
const initialState = {
  fullName: '',
  userEmail: '',
  emailError: '',
  userPassword: '',
  passwordError: '',
  error: '',
  loading: false,
  signupResponse: {},
};
export const signUpAction = createAsyncThunk(
  'signUpSlice/signUpAction',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.SIGN_UP, params);

      return response.data;
    } catch (error) {
      // console.log('error-- ', error);
      return error.data;
    }
  },
);

export const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.fullName = '';
      state.userEmail = '';
      state.userPassword = '';
      state.emailError = '';
      state.passwordError = '';
      state.signupResponse = '';
    },
    updateFullName: (state, action) => {
      state.fullName = action.payload;
    },
    updateEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    updateEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    updatePassword: (state, action) => {
      state.userPassword = action.payload;
    },
    updatePasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signUpAction.pending, state => {
      state.loading = true;
      state.signupResponse = {};
    });
    builder.addCase(signUpAction.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.signupResponse = action.payload;
      }
    });
    builder.addCase(signUpAction.rejected, state => {
      state.loading = false;
      state.signupResponse = {};
    });
  },
});

export const {
  clearState,
  updateFullName,
  updateEmail,
  updateEmailError,
  updatePassword,
  updatePasswordError,
} = signUpSlice.actions;

const signUpSliceReducer = signUpSlice.reducer;

export default signUpSliceReducer;

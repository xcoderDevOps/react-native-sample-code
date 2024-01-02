import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../services/endpoint';
import {client} from '../services/client';
const initialState = {
  userName: '',
  userNameError: '',
  userPassword: '',
  passwordError: false,
  error: '',
  loading: false,
  sininAnonResponse: {},
  randomUsernamedata: {},
};
export const signIn_AnonAction = createAsyncThunk(
  'signIpSlice/signIn_AnonAction',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.SIGN_IN_ANONYMOUSLY, params);
      return response.data;
    } catch (error) {
      return error.data;
    }
  },
);

export const getrandomUserName = createAsyncThunk(
  'signIpSlice/getrandomUserName',
  async (params, thunkAPI) => {
    try {
      const response = await client.get(URL.SIGN_IN_ANONYMOUSLY);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signInAnonSlice = createSlice({
  name: 'signInAnonSlice',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.userName = '';
      state.userPassword = '';
      state.userNameError = '';
      state.passwordError = false;
      state.sininAnonResponse = {};
      state.randomUsernamedata = {};
    },
    signIn_Anon_UpdateUserName: (state, action) => {
      state.userName = action.payload;
    },
    signIn_Anon_UpdatePassword: (state, action) => {
      state.userPassword = action.payload;
    },
    signIn_Anon_UpdateUsernameError: (state, action) => {
      state.userNameError = action.payload;
    },
    signIn_Anon_UpdatePasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
  },
  extraReducers: builder => {
    // post anonymous user data
    builder.addCase(signIn_AnonAction.pending, state => {
      state.loading = true;
      state.sininAnonResponse = {};
    });
    builder.addCase(signIn_AnonAction.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.sininAnonResponse = action.payload;
      }
    });
    builder.addCase(signIn_AnonAction.rejected, state => {
      state.loading = false;
      state.sininAnonResponse = {};
    });

    // get rondom username
    builder.addCase(getrandomUserName.pending, state => {
      state.loading = true;
      state.randomUsernamedata = {};
    });
    builder.addCase(getrandomUserName.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.randomUsernamedata = action.payload;
      }
    });
    builder.addCase(getrandomUserName.rejected, state => {
      state.loading = false;
      state.randomUsernamedata = {};
    });
  },
});

export const {
  clearState,
  signIn_Anon_UpdateUserName,
  signIn_Anon_UpdateUsernameError,
  signIn_Anon_UpdatePassword,
  signIn_Anon_UpdatePasswordError,
} = signInAnonSlice.actions;

const signInAnnonSliceReducer = signInAnonSlice.reducer;

export default signInAnnonSliceReducer;

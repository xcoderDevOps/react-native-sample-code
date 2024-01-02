import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../services/endpoint';
const initialState = {
  selectSeverityLevel: '',
  error: '',
  loading: false,
};
export const severityLevelAction = createAsyncThunk(
  'severityLevelSlice/severityLevelAction',
  async (params, thunkAPI) => {},
);

export const severityLevelSlice = createSlice({
  name: 'severityLevelSlice',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.selectSeverityLevel = '';
    },
    setSeverityLevel: (state, action) => {
      state.selectSeverityLevel = action.payload;
    },
  },
  //   extraReducers: {},
});

export const {clearState, setSeverityLevel} = severityLevelSlice.actions;

const severityLevelSliceReducer = severityLevelSlice.reducer;

export default severityLevelSliceReducer;

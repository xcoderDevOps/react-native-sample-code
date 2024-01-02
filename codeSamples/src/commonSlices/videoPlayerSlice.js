import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../services/endpoint';
const initialState = {
  source: '',
  mediaType: '',
  loading: false,
};
export const videoPlayer = createAsyncThunk(
  'videoPlayerSlice/videoUrl',
  async (params, thunkAPI) => {},
);

export const videoPlayerSlice = createSlice({
  name: 'videoPlayerSlice',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.source = '';
    },
    getVideoUrl: (state, action) => {
      state.source = action.payload;
    },
    getMediaType: (state, action) => {
      state.mediaType = action.payload;
    },
  },
  //   extraReducers: {},
});

export const {clearState, getVideoUrl, getMediaType} = videoPlayerSlice.actions;

const videoPlayerSliceReducer = videoPlayerSlice.reducer;

export default videoPlayerSliceReducer;

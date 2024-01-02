import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import moment from 'moment';

const currentTime = moment();
const formattedTime = currentTime.format('HH:mm:ss');

const currentDate = moment();
// Format the current date as a string (optional)
const formattedDate = currentDate.format('YYYY-MM-DD');

const initialState = {
  selectDate: currentDate.toString(),
  selectTime: formattedTime.toString(),
};
export const datePickerAction = createAsyncThunk(
  'datePicker/datePickerAction',
  async (params, thunkAPI) => {},
);

export const datePickerSlice = createSlice({
  name: 'datePickerSlice',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.selectDate = new Date();
      state.selectTime = formattedTime;
    },
    getDate: (state, action) => {
      state.selectDate = action.payload;
    },
    getTime: (state, action) => {
      state.selectTime = action.payload;
    },
  },
  //   extraReducers: {},
});

export const {clearState, getDate, getTime} = datePickerSlice.actions;

const datePickerReducer = datePickerSlice.reducer;

export default datePickerReducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rooms: [],
  filters: [],
  isLoading: false,
  error: null,
};
const options = {
  method: 'GET',
  url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list',
  params: {
    offset: '0',
    arrival_date: '2023-06-14',
    departure_date: '2023-06-20',
    guest_qty: '1',
    dest_ids: '-3712125',
    room_qty: '1',
    search_type: 'city',
    children_qty: '2',
    children_age: '5,7',
    search_id: 'none',
    price_filter_currencycode: 'USD',
    order_by: 'popularity',
    languagecode: 'en-us',
    travel_purpose: 'leisure',
  },
  headers: {
    'X-RapidAPI-Key': '1d6b47aad1msh144232c7a8b749ep105b6djsn8235e2e89315',
    'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
  },
};

export const getRooms = createAsyncThunk('rooms/get', async () => {
  const response = await axios.request(options);
  console.log(response.data);
  return response.data;
});

const roomSlice = createSlice({
  name: 'room',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRooms.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getRooms.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.rooms = payload.result;
      state.filters = payload.recommended_filters;
    });
    builder.addCase(getRooms.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export default roomSlice.reducer;

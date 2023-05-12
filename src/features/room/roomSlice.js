import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rooms: JSON.parse(localStorage.getItem('rooms'))
    ? JSON.parse(localStorage.getItem('rooms'))
    : [],
  filters: [],
  isLoading: false,
  error: undefined,
  searchId: '',
  roomDetails: [],
  // roomDetails: JSON.parse(localStorage.getItem('roomDetails'))
  //   ? JSON.parse(localStorage.getItem('roomDetails'))
  //   : [],
};
const options = {
  method: 'GET',
  url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list',
  params: {
    offset: '0',
    arrival_date: '2023-06-14',
    departure_date: '2023-06-20',
    guest_qty: '1',
    dest_ids: '-2601889',
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
  return response.data;
});

export const getDetails = createAsyncThunk('room/detail', async (payload) => {
  const response = await axios.request({
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/detail',
    params: {
      hotel_id: payload.hotel_id,
      search_id: payload.searchId,
      departure_date: '2023-09-18',
      arrival_date: '2023-09-15',
      rec_guest_qty: '2',
      rec_room_qty: '1',
      dest_ids: '-3727579',
      recommend_for: '3',
      languagecode: 'en-us',
      currency_code: 'USD',
      units: 'imperial',
    },
    headers: {
      'X-RapidAPI-Key': '1d6b47aad1msh144232c7a8b749ep105b6djsn8235e2e89315',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
    },
  });
  return response.data;
});

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchId = '';
      state.roomDetails = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRooms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRooms.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.rooms = payload.result;
      state.filters = payload.recommended_filters;
      state.searchId = payload.searchId;
      localStorage.setItem('rooms', JSON.stringify(payload.result));
    });
    builder.addCase(getRooms.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    // Room Details

    builder.addCase(getDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.roomDetails = payload;
      localStorage.setItem('roomDetails', JSON.stringify(payload));
    });
    builder.addCase(getDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { clearSearch } = roomSlice.actions;

export default roomSlice.reducer;

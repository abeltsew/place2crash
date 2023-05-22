import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  rooms: JSON.parse(localStorage.getItem('rooms'))
    ? JSON.parse(localStorage.getItem('rooms'))
    : [],
  filters: [],
  isLoading: false,
  error: undefined,
  searchId: '',
  roomDetails: [],
  detailLoading: true,
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
  return response.data[0];
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
      const filteredRooms = [];
      payload.result.map((info) => filteredRooms.push({
        hotel_id: info.hotel_id,
        hotel_name: info.hotel_name,
        main_photo_url: info.main_photo_url,
        accommodation_type_name: info.accommodation_type_name,
        hotel_facilities: info.hotel_facilities,
      }));
      state.rooms = filteredRooms;
      state.filters = payload.recommended_filters;
      state.searchId = payload.searchId;
      localStorage.setItem('rooms', JSON.stringify(payload.result));
    });
    builder.addCase(getRooms.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    // Room Details

    builder.addCase(getDetails.pending, (state) => {
      state.detailLoading = true;
    });

    builder.addCase(getDetails.fulfilled, (state, { payload }) => {
      state.detailLoading = false;
      const filteredDetail = {};

      filteredDetail.hotel_name = payload.hotel_name;
      filteredDetail.distance_to_cc = payload.distance_to_cc;
      filteredDetail.composite_price_breakdown = payload.composite_price_breakdown;
      filteredDetail.rooms = payload.rooms?.[`${Object.keys(payload.rooms)}`];
      filteredDetail.country_trans = payload.country_trans;
      filteredDetail.average_room_size_for_ufi_m2 = payload.average_room_size_for_ufi_m2;
      filteredDetail.breakfast_review_score = payload.breakfast_review_score;

      state.roomDetails = filteredDetail;
      localStorage.setItem('roomDetails', JSON.stringify(filteredDetail));
    });
    builder.addCase(getDetails.rejected, (state, { payload }) => {
      state.detailLoading = false;
      state.error = payload;
    });
  },
});

export const { clearSearch } = roomSlice.actions;

export default roomSlice.reducer;

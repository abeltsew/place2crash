import roomReducer, { initialState } from '../features/room/roomSlice';

it('should return the correct state', () => {
  expect(initialState).toEqual({
    rooms: [],
    filters: [],
    isLoading: false,
    error: undefined,
    searchId: '',
    roomDetails: [],
  });
});

console.log(JSON.stringify(roomReducer));

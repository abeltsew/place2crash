import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import Room from '../components/Room';
import { initialState } from '../features/room/roomSlice';

it('should return the correct inital state', () => {
  expect(initialState).toEqual({
    rooms: [],
    filters: [],
    isLoading: false,
    error: undefined,
    searchId: '',
    roomDetails: [],
  });
});

describe('render', () => {
  const mockStore = configureStore();

  const newState = {
    rooms: [{ hotel_name: 'Hilton', hotel_id: '123' }],
    filters: [],
    isLoading: false,
    error: undefined,
    searchId: '',
    roomDetails: [],
  };

  it('should store the correct state in the store', () => {
    const roomStore = mockStore(newState);

    roomStore.dispatch({ type: 'get/rooms', payload: { result: newState } });

    expect(roomStore.getState()).toEqual(newState);
  });

  it('should render the home page with the correct data', () => {
    const roomStore = mockStore(newState);

    roomStore.dispatch({ type: 'get/rooms', payload: { result: newState } });

    render(
      <Provider store={roomStore}>
        <Room room={roomStore.getState().rooms[0]} />
      </Provider>,
      { wrapper: BrowserRouter },
    );

    const room1 = screen.getByText(/Hilton/i);

    expect(room1).toBeInTheDocument();
  });
});

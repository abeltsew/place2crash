import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRooms } from './features/room/roomSlice';
import Room from './components/Room';

function App() {
  const { rooms, isLoading, error } = useSelector((store) => store.room);
  const dispach = useDispatch();

  useEffect(() => {
    if (rooms.length === 0) {
      dispach(getRooms());
    }
  }, []);

  if (isLoading) return <div>Loading ...</div>;

  if (error) {
    return (
      <div>
        Error Loading
        {JSON.stringify(error, null, 2)}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center p-2 bg-red-400">
        <select>
          <option>Hotel</option>
          <option>Apartment</option>
          <option>Motel</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center items-center w-screen">
        {rooms.map((room) => (
          <div key={room.hotel_id} className="w-1/2 md:w-1/4">
            <Room room={room} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

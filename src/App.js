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
      {rooms.map((room) => (
        <Room key={room.hotel_id} room={room} />
      ))}
    </div>
  );
}

export default App;

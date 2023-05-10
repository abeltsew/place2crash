import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from './features/room/roomSlice';
import { useEffect } from 'react';
import Room from './components/Room';

function App() {
  const { rooms, isLoading, error } = useSelector((store) => store.room);
  const dispach = useDispatch();

  useEffect(() => {
    dispach(getRooms());
  }, []);

  if (isLoading) return <div>Loading ...</div>;

  if (error) return <div>Error Loading</div>;

  return (
    <div>
      {rooms.map((room) => {
        return <Room key={room.hotel_id} room={room} />;
      })}
    </div>
  );
}

export default App;

import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from './features/room/roomSlice';
import { useEffect } from 'react';

function App() {
  const { rooms, isLoading, error } = useSelector((store) => store.room);
  const dispach = useDispatch();

  useEffect(() => {
    dispach(getRooms());
  }, []);

  if (isLoading) return <div>Loading ...</div>;

  if (error) return <div>Error Loading</div>;

  return <div>{JSON.stringify(rooms, null, 2)}</div>;
}

export default App;

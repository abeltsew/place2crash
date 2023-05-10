import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRooms } from './features/room/roomSlice';
import Room from './components/Room';

function App() {
  const [filter, setFilter] = useState('');
  const { rooms, isLoading, error } = useSelector((store) => store.room);
  const dispatch = useDispatch();
  const categories = [];

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(getRooms());
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

  const filteredRooms = filter !== ''
    ? rooms.filter((room) => room.accommodation_type_name === filter)
    : rooms;

  return (
    <div>
      <div className="flex justify-center items-center p-2 bg-red-400">
        {rooms.forEach((rm) => {
          if (!categories.includes(rm.accommodation_type_name)) {
            categories.push(rm.accommodation_type_name);
          }
        })}
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-center items-center w-screen">
        {filteredRooms.map((room) => (
          <div key={room.hotel_id} className="w-1/2 md:w-1/4">
            <Room room={room} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

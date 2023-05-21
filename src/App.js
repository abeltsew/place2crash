/* eslint-disable operator-linebreak */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRooms } from './features/room/roomSlice';
import Room from './components/Room';
import Loading from './components/Loading';

function App() {
  const [filter, setFilter] = useState('');
  const { rooms, isLoading, error } = useSelector((store) => store.room);
  const dispatch = useDispatch();
  const categories = [];

  useEffect(() => {
    if (rooms?.length === 0) {
      dispatch(getRooms());
    }
  }, [dispatch]);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div>
        Error Loading
        {JSON.stringify(error, null, 2)}
      </div>
    );
  }

  const filteredRooms =
    filter !== ''
      ? rooms.filter((room) => room.accommodation_type_name === filter)
      : rooms;

  return (
    <div>
      <ul className="flex justify-between p-2 bg-[#31528b] text-white">
        <li>Place2Crash</li>
        <li>hotels</li>
        <li className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </li>
      </ul>
      <div className="h-56 bg-[#5284DD] flex text-white items-center">
        <img
          className="w-1/2 h-full"
          src="/images/hotel.png"
          alt="inside room"
        />
        Hotels Near you
      </div>
      <div className="flex justify-start items-center p-2 bg-[#31528b] text-white">
        {rooms.forEach((rm) => {
          if (!categories.includes(rm.accommodation_type_name)) {
            categories.push(rm.accommodation_type_name);
          }
        })}
        <p className="pr-2">Hotels by Catagory</p>
        <select
          className="bg-transparent w-max border-white text-center border-[0.02rem] outline-none"
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

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Room = ({ room }) => (
  <Link to={`/room/${room.hotel_id}`}>
    <div className="relative flex w-full cursor-pointer">
      <img
        className="flex-1 w-full"
        src={room.main_photo_url}
        alt="Hotel view"
      />
      <div className="absolute bg-[#31528b] h-full w-full opacity-80" />
      <div className="absolute flex flex-col justify-between w-full h-full p-4 items-end text-white text-end">
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
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex flex-col items-end">
          <p className="w-3/4 text-lg font-bold overflow-hidden">
            {room.hotel_name.slice(0, 19)}
          </p>
          <p className="w-1/2 text-sm font">
            {room.hotel_facilities?.split(',').length}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

Room.propTypes = {
  room: PropTypes.shape({
    hotel_id: PropTypes.number,
    hotel_name: PropTypes.string,
    main_photo_url: PropTypes.string,
    accommodation_type_name: PropTypes.string,
    hotel_facilities: PropTypes.string,
  }).isRequired,
};

export default Room;

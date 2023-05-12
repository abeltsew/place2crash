import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Room = ({ room }) => (
  <Link to={`/room/${room.hotel_id}`}>
    <div className="relative flex w-full">
      <img
        className="flex-1 w-full"
        src={room.main_photo_url}
        alt="Hotel view"
      />
      <div className="absolute bg-[#31528b] h-full w-full opacity-80" />
      <div className="absolute flex flex-col justify-end items-end w-full h-full p-4  text-white text-end">
        <p className="w-3/4 text-lg font-bold overflow-hidden">
          {room.hotel_name}
        </p>
        <p className="w-1/2 text-sm font">
          {room.hotel_facilities?.split(',').length}
        </p>
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

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Room = ({ room }) => (
  <Link to={`/room/${room.hotel_id}`}>
    <div className="relative flex w-full">
      <p className="absolute">{room.hotel_name}</p>
      <img
        className="flex-1 w-full"
        src={room.main_photo_url}
        alt="Hotel view"
      />
    </div>
  </Link>
);

Room.propTypes = {
  room: PropTypes.shape({
    hotel_id: PropTypes.string,
    hotel_name: PropTypes.string,
    main_photo_url: PropTypes.string,
  }).isRequired,
};

export default Room;

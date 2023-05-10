import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Room = ({ room }) => (
  <Link to={`/room/${room.hotel_id}`}>
    {room.hotel_name}
    <img
      src={room.main_photo_url}
      alt="Picture of the Hotel"
      style={{ height: '15rem', width: '15rem' }}
    />
  </Link>
);

Room.propType = {
  room: PropTypes.object,
};

export default Room;

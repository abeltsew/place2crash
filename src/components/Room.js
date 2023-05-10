const Room = ({ room }) => {
  return (
    <div>
      {room.hotel_name}
      <img
        src={room.main_photo_url}
        alt="Hotel image"
        style={{ height: '15rem', width: '15rem' }}
      />
    </div>
  );
};

export default Room;

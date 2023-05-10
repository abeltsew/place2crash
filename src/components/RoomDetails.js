import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearSearch, getDetails } from '../features/room/roomSlice';

const RoomDetails = () => {
  const { searchId, roomDetails } = useSelector((store) => store.room);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (roomDetails.length === 0) {
      dispatch(getDetails({ hotel_id: params.id, searchId }));
    }

    return () => {
      if (process.env.NODE_ENV === 'production') {
        dispatch(clearSearch());
      }
    };
  }, []);

  const renderDetail = () => (
    <div>
      <p>{roomDetails[0].hotel_id}</p>
      <p>{roomDetails[0].hotel_name}</p>
      <img
        src={
          roomDetails[0].rooms?.[`${Object.keys(roomDetails[0].rooms)}`]
            .photos[0].url_original
        }
        alt="Hotem room"
      />
    </div>
  );

  return (
    <div>
      <Link to="/"> Back</Link>
      RoomDetails
      {roomDetails.length > 0 && renderDetail()}
    </div>
  );
};

export default RoomDetails;

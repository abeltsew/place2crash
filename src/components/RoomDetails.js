import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearSearch, getDetails } from '../features/room/roomSlice';
import Loading from './Loading';

const RoomDetails = () => {
  const { searchId, roomDetails } = useSelector((store) => store.room);
  const [room, setRoom] = useState(undefined);
  const [rooms, setRooms] = useState(undefined);

  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    // if (roomDetails.length === 0) {
    dispatch(getDetails({ hotel_id: params.id, searchId }));
    // }

    return () => {
      if (process.env.NODE_ENV === 'production') {
        dispatch(clearSearch());
      }
    };
  }, []);

  useEffect(() => {
    setRoom(roomDetails[0]);
    setRooms(room?.rooms?.[`${Object.keys(room.rooms)}`]);
  }, [roomDetails]);

  const renderDetail = () => (
    <ul className="flex flex-col bg-black">
      {rooms.photos.map((photo, i) => {
        if (i > 0) {
          return (
            <li className="flex p-2" key={photo?.url_original}>
              <img className="w-1/4" src={photo?.url_original} alt="room" />
              <div className="flex-1 p-2">
                <p>{rooms.facilities[i]?.name}</p>
                <p>{rooms.highlights[i]?.translated_name}</p>
                <div className="flex items-end gap-1">
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
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>
                  <p>{Number(Math.random() * (300 - 1) + 1).toFixed(0)}</p>
                </div>
              </div>
            </li>
          );
        }
        return <li key={photo?.url_original} className="hidden" />;
      })}
    </ul>
  );

  if (rooms) {
    return (
      <div className="text-white bg-black h-screen text-[0.7rem] ">
        <ul className="flex justify-between items-center bg-[#31528b] w-full p-2 text-white ">
          <li>
            <Link className="flex item-center" to="/">
              <p>
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
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </p>
              <p className="self-center">Home</p>
            </Link>
          </li>
          <li>{room.hotel_name.split(' ')[0]}</li>
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
        <div className="relative w-screen h-56">
          <div className="absolute bg-[#31528b] h-full w-full opacity-80" />
          <div className="absolute flex justify-between items-center h-full w-full p-2">
            <div className="flex flex-col whitespace-nowrap self-end">
              <p className="text-xl">
                {`${room.distance_to_cc.toFixed(2)} km`}
              </p>
              <p className="">Distance to city</p>
              <p className="text-xl">
                {`${room.composite_price_breakdown.net_amount.value.toFixed(
                  2,
                )} ${room.composite_price_breakdown.net_amount.currency}`}
              </p>
              <p className="">Price Per Night</p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-3xl pb-4">{room.country_trans}</p>
              <p className="text-xl">{`${room.average_room_size_for_ufi_m2}`}</p>
              <p>Square Meter</p>
            </div>
            <p className="whitespace-nowrap">{`Rating ${room.breakfast_review_score?.review_score} / 10`}</p>
          </div>
          <img
            className="h-56 w-full"
            src={rooms.photos[0]?.url_original}
            alt="Hotel room"
          />
        </div>

        <div className="flex justify-between items-center bg-[#31528b] p-2 text-sm">
          {room.hotel_name}
        </div>
        {roomDetails.length > 0 && renderDetail()}
      </div>
    );
  }
  return <Loading />;
};

export default RoomDetails;

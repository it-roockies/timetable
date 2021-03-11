import { useContext } from "react";
import { CacheContext } from "./DataProvider";

function Booking({ className, booking }) {
  const cache = useContext(CacheContext);

  if (!booking) {
    return <div className={className}></div>;
  }
  return (
    <div className={className}>
      <div>{cache.classrooms[booking.classroom].name}</div>
      <div>{cache.teachers[booking.teacher].short}</div>
      <div>{cache.subjects[booking.subject].name}</div>
    </div>
  );
}

export default Booking;

import "tachyons/css/tachyons.css";

import { useCallback, useEffect, useState } from "react";
import { getBookings, getGroups, getToken } from "./api";

const periods = [
  {
    name: 1,
    short: 1,
    period: 1,
    starttime: "9:00",
    endtime: "10:00",
  },
  {
    name: 2,
    short: 2,
    period: 2,
    starttime: "10:20",
    endtime: "11:20",
  },
  {
    name: 3,
    short: 3,
    period: 3,
    starttime: "12:00",
    endtime: "13:00",
  },
  {
    name: 4,
    short: 4,
    period: 4,
    starttime: "13:20",
    endtime: "14:20",
  },
  {
    name: 5,
    short: 5,
    period: 5,
    starttime: "14:40",
    endtime: "15:40",
  },
];

function App() {
  const [groups, setGroups] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = await getToken("admin", "admin");
      const res = await getBookings(token);
      setBookings(res);
      const res2 = await getGroups(token);
      setGroups(res2);
    }
    fetchData();
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    async function doIt() {
      const token = await getToken("admin", "admin");
      const response = await fetch("/api/timetable-data/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      console.log(result);
    }
    doIt();
  }, []);

  return (
    <>
      <div>
        <form name="upload" onSubmit={handleSubmit}>
          <input type="file" name="file" />
          <input type="submit" value="Upload" />
        </form>
      </div>
      <div className="pa3">
        <div className="flex ba">
          <div className="flex-none w-25 pv2 ph3">Group</div>
          {periods.map((period) => (
            <div key={period.name} className="flex-auto pv2 ph3 bl">
              {period.starttime} - {period.endtime}
            </div>
          ))}
        </div>
        {groups.map((group) => (
          <div key={group.id} className="flex bb bl br">
            <div className="flex-none w-25 pv2 ph3">{group.name}</div>
            {periods.map((period) => (
              <div className="flex-auto pv2 ph3 bl"></div>
            ))}
          </div>
        ))}
      </div>
      <div className="ma3">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex ba">
            <div className="flex-none br pv2 ph3">{booking.id}</div>
            <div className="flex-auto br pv2 ph3">{booking.starts_at}</div>
            <div className="flex-auto pv2 ph3">{booking.ends_at}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

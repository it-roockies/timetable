import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const BACKEND_URL = "";

async function getToken(username, password) {
  const response = await fetch(`${BACKEND_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJSON = await response.json();
  return responseJSON.token;
}

async function getBookings(token) {
  const response = await fetch(`${BACKEND_URL}/api/booking/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const responseJSON = await response.json();

  return responseJSON;
}

function App() {
  const [bookings, setBookings] = useState([]);

  useEffect(async () => {
    const token = await getToken("admin", "admin");
    const res = await getBookings(token);

    setBookings(res);
  }, []);

  return (
    <div className="App">
      {bookings.map((booking) => (
        <div key={booking.id}>{booking.starts_at}</div>
      ))}
    </div>
  );
}

export default App;

import { use, useEffect, useState } from "react";
import { getGuests, getGuest } from "./guests.js";

export default function App() {
  const [guestId, setGuestId] = useState(null);

  return (
    <>
      {!guestId ? (
        <GuestList setGuestId={setGuestId} />
      ) : (
        <GuestDetails guestId={guestId} setGuestId={setGuestId} />
      )}
    </>
  );
}

function GuestList({ setGuestId }) {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const syncGuests = async () => {
      const data = await getGuests();
      console.log(data);
      setGuests(data);
    };
    syncGuests();
  }, []);

  return (
    <>
      <h1>Guest List</h1>
      <p className="select">Select a guest to see more details.</p>
      <table className="guests">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr
              key={guest.id}
              onClick={() => setGuestId(guest.id)}
              className="guest-row"
            >
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>{guest.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function GuestDetails({ guestId, setGuestId }) {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const syncGuest = async () => {
      if (!guestId) return;
      const data = await getGuest(guestId);
      setGuest(data);
    };
    syncGuest();
  }, [guestId]);

  if (!guest) {
    return <p className="select">Select a guest to see more details.</p>;
  }

  return (
    <div className="guest-details">
      <h2>
        {guest.name} #{guest.id}
      </h2>
      <h3>{guest.job}</h3>
      <p>{guest.bio}</p>
      <p>Phone Number: {guest.phone}</p>
      <p>Email: {guest.email}</p>
      <button onClick={() => setGuestId(null)}>Back</button>
    </div>
  );
}

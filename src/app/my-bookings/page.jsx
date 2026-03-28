

import React from "react";
import MyAllBookings from "../components/tables/MyBookingsTable";
import { headers } from "next/headers";

const fetchBooking = async () => {
  const res = await fetch("http://localhost:3000/api/service", {
    headers: await headers(),
  });

  const d = await res.json();

  return d;
};

export default async function MyBookingPage() {
  const data = await fetchBooking();

  return (
    <div>
      <MyAllBookings data={data} />
    </div>
  );
}

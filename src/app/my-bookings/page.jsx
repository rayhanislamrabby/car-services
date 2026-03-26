import MyAllBookings from "../components/tables/MyBookingsTable";
import { headers } from "next/headers";

const fetchMyBookings = async () => {
  const res = await fetch("http://localhost:3000/api/service", {
    cache: "no-store",
  });

  const result = await res.json();

  console.log("API RESULT:", result); // 🔥 MUST ADD

  return result;
};
export default async function MyBookingsTable() {
  const data = await fetchMyBookings();
  return (
    <div>
      <MyAllBookings data={data} />
    </div>
  );
}

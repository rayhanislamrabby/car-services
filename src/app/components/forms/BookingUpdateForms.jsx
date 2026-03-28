"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingUpdateForms({ booking }) {
  const { data } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!booking) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    setLoading(true);

    const updatedBooking = {
      phone: form.phone.value,
      date: form.date.value,
      address: form.address.value,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/my-booking/${booking._id}`,
        {
          method: "PATCH", // 🔥 UPDATE
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedBooking),
        },
      );

      const result = await res.json();
      router.push("/my-bookings");
      if (result.modifiedCount > 0) {
        alert("Booking Updated ✅");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10">Update Booking</h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Image
              src={booking?.service_img}
              alt={booking?.service_name}
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />

            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">{booking?.service_name}</h2>

              <div className="flex justify-between pt-4 border-t">
                <span>Service Price</span>
                <span className="text-orange-500 font-bold">
                  ${booking?.service_price}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
          >
            <h2 className="text-2xl font-semibold">Booking Information</h2>

            <input
              type="text"
              defaultValue={data?.user?.name}
              readOnly
              className="w-full p-3 border rounded bg-gray-100"
            />

            <input
              type="email"
              defaultValue={data?.user?.email}
              readOnly
              className="w-full p-3 border rounded bg-gray-100"
            />

            <input
              type="text"
              name="phone"
              defaultValue={booking?.phone}
              className="w-full p-3 border rounded"
              required
            />

            <input
              type="date"
              name="date"
              defaultValue={booking?.date}
              className="w-full p-3 border rounded"
              required
            />

            <textarea
              name="address"
              defaultValue={booking?.address}
              className="w-full p-3 border rounded"
              required
            />

            <input
              type="text"
              value={`$${booking?.service_price}`}
              readOnly
              className="w-full p-3 border rounded bg-gray-100"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 text-white rounded-lg"
            >
              {loading ? "Updating..." : "Update Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

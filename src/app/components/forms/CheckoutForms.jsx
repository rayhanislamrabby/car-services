"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function CheckoutForm({ service }) {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    setLoading(true);

    const bookingPayload = {
      customerName: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      date: form.date.value,
      address: form.address.value,

      service_id: service._id,
      service_name: service.title,
      service_img: service.img,
      service_price: service.price,
    };

    try {
      const res = await fetch("http://localhost:3000/api/service", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      const result = await res.json();
      console.log(result);

      alert("Booking Confirmed ✅");
      form.reset();
    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT: Service Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Image
              src={service.img}
              alt={service.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />

            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">{service.title}</h2>

              <p className="text-gray-600 text-sm">{service.description}</p>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-gray-500">Service Price</span>
                <span className="text-xl font-bold text-orange-500">
                  ${service.price}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
          >
            <h2 className="text-2xl font-semibold">Booking Information</h2>

            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={data?.user?.name}
                readOnly
                className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={data?.user?.email}
                readOnly
                className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                className="w-full mt-1 p-3 border rounded-lg"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-sm text-gray-600">Booking Date</label>
              <input
                type="date"
                name="date"
                className="w-full mt-1 p-3 border rounded-lg"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-sm text-gray-600">Address</label>
              <textarea
                name="address"
                placeholder="Enter your address"
                className="w-full mt-1 p-3 border rounded-lg"
                rows="3"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm text-gray-600">Service Price</label>
              <input
                type="text"
                value={`$${service.price}`}
                readOnly
                className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

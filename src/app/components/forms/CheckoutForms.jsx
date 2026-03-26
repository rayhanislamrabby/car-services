"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function CheckoutForm({ service }) {
  const { data } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const date = form.date.value;
    const address = form.address.value;

    const bookingPayload = {
      // Session
      customerName: name,
      email,

      // User Inputs
      phone,
      date,
      address,

      // Extra Info
      service_id: service._id,
      service_name: service.title,
      service_img: service.img,
      service_price: service.price,
    };

    console.log("Booking:", bookingPayload);

    const res = await fetch("http://localhost:3000/api/service/", {
      method: "POST",
      body: JSON.stringify(bookingPayload),
    });

    const postResponce = await res.json();

    console.log("post Data ", postResponce);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left */}
        <div className="space-y-4">
          <Image
            src={service.img}
            alt={service.title}
            width={600}
            height={400}
            className="rounded-xl w-full object-cover"
          />

          <h2 className="text-2xl font-bold">{service.title}</h2>
          <p className="text-gray-600">{service.description}</p>

          <p className="text-xl font-semibold text-orange-500">
            Price: ${service.price}
          </p>
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-xl shadow space-y-4"
        >
          <h3 className="text-xl font-semibold">Book This Service</h3>

          {/* Name */}
          <input
            type="text"
            name="name"
            defaultValue={data?.user?.name}
            readOnly
            className="w-full p-3 border rounded"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            defaultValue={data?.user?.email}
            readOnly
            className="w-full p-3 border rounded"
          />

          {/* Price */}
          <input
            type="text"
            name="price"
            defaultValue={service?.price}
            readOnly
            className="w-full p-3 border rounded"
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="date"
            name="date"
            className="w-full p-3 border rounded"
            required
          />

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            className="w-full p-3 border rounded"
            rows="4"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

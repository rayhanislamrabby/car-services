"use client";

import DeleteBookingbutton from "@/app/my-bookings/components/DeleteBookingbutton";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";

const MyAllBookings = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center font-bold text-3xl mb-6">My All Bookings</h1>

      <div className="w-11/12 mx-auto overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Service</th>
              <th className="p-4">Date</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Edit</th>
              <th className="p-4 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    <Image
                      src={item.service_img}
                      alt={item.service_name}
                      width={60}
                      height={40}
                      className="rounded-md"
                    />
                  </td>

                  <td className="p-3 font-medium text-gray-800">
                    {item.service_name}
                  </td>

                  <td className="p-3 text-gray-600">{item.date}</td>

                  <td className="p-3 text-green-600 font-semibold">
                    ${item.service_price}
                  </td>

                  <td className="p-3 text-center">
                    <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-500 transition">
                      <FaRegEdit className="w-5 h-5" />
                    </button>
                  </td>

                  <td className="p-3 text-center">
                    <DeleteBookingbutton id={item._id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAllBookings;

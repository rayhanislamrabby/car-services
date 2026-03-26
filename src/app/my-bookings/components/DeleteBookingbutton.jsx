"use client";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";

export default function DeleteBookingbutton({ id }) {
  const router = useRouter();

  const handelDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/service/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    console.log(data);
    router.prefetch();
  };

  return (
    <div>
      <button className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition">
        <MdDelete onClick={() => handelDelete(id)} className="w-5 h-5" />
      </button>
    </div>
  );
}

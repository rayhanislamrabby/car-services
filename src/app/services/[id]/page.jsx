import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ServicesDetailsPage({ params }) {
  const resolvedParams = await params;
  const p = resolvedParams.id;

  const res = await fetch(`http://localhost:3000/api/service/${p}`);
  const data = await res.json();

  return (
    <div>
      <section className="flex justify-center items-center ">
        <figure className="relative  mx-auto">
          <Image
            src={"/assets/images/checkout/checkout.png"}
            width={1137}
            height={300}
            alt={"banner"}
          />
          <div className="transparent-layer overly-bg absolute w-full h-full border-2 border-red-500 top-0">
            <div className="w-full h-full flex items-center ">
              <div>
                <h1 className="text-white ">Services Details</h1>
              </div>
            </div>
          </div>
        </figure>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="w-full">
            <Image
              src={data.img}
              alt={data.title}
              width={600}
              height={400}
              className="w-full h-auto rounded-xl shadow-lg object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {data.title}
            </h2>

            <p className="text-gray-600 mb-4">{data.description}</p>

            <div className="flex gap-5">
              <div>
                <p className="text-lg font-semibold text-orange-500 mb-6">
                  Price: ${data.price}
                </p>
              </div>
              <div>
                <Link href={`/checkout/${data._id}`}>
                  <button className="btn bg-amber-600 text-white">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>

            {/* Facilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.facility?.map((item, index) => (
                <div
                  key={index}
                  className="border p-3 rounded-lg shadow-sm bg-gray-50"
                >
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

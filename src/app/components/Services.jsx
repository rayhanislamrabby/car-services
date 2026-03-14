import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";


export default async function ServicesSection() {
  const servicesCollection = await dbConnect(collectionNameObj.ServicesCollection);

  const data = await servicesCollection.find({}).toArray();

  return (
    <div className="grid grid-cols-12 container mx-auto gap-4  gap-y-8">
      {data.map((item) => {
        return (
          <div
            key={item._id}
            className="col-span-12 md:col-span-6 lg:col-span-4 w-full max-w-sm h-full shadow mx-auto"
          >
            <figure>
              <Image
                src={item.img}
                width={314}
                height={208}
                alt={item.title}
                className="w-full"
              />
            </figure>

            <div className="flex justify-between items-center mt-4">
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p className="font-bold text-xl text-orange-500 mt-3.5">
                  ${item.price}
                </p>
              </div>

              <div>
                <Link href={`/services/${item._id}`} className="text-xl text-orange-500 ">
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

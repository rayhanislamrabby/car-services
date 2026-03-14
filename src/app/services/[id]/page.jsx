import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import React from "react";

export default async function ServicesDetailsPage({ params }) {
  const p = await params;

  const servicesCollection = dbConnect(collectionNameObj.ServicesCollection);

  const data = await servicesCollection.findOne({ _id: new ObjectId(p.id) });

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



<section>

<Image src={data.img} alt={data.title} width={400} height={280}>



</Image>

</section>

    </div>
  );
}







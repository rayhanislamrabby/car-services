import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import React from "react";

export default async function ServicesDetailsPage({ params }) {
  const p = await params;


  const servicesCollection = dbConnect(collectionNameObj.ServicesCollection);

const data = await servicesCollection.findOne({_id: new ObjectId(p.id)})

  return (
    <div>
      <p>{JSON.stringify(p)}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

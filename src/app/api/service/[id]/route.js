import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
export const GET = async (req, { params }) => {
  const p = await params;

  const servicesCollection = dbConnect(collectionNameObj.ServicesCollection);

  const data = await servicesCollection.findOne({ _id: new ObjectId(p.id) });

  return NextResponse.json(data);
};

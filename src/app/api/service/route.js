import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();

  const bookingCollection = dbConnect(collectionNameObj.bookingCollection);

  const result = await bookingCollection.insertOne(body);

  return NextResponse.json(result);
};

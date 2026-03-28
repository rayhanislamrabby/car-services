import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const p = await params;

  const bookingCollection = dbConnect(collectionNameObj.bookingCollection);

  const query = { _id: new ObjectId(p.id) };

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const singleBooking = await bookingCollection.findOne(query);

  const isWonerOk = email === singleBooking?.email;

  if (isWonerOk) {
    return NextResponse.json(singleBooking);
  } else {
    return NextResponse.json(
      { message: "Forbidden update action " },
      {
        status: 403,
      },
    );
  }
};

export const PATCH = async (req, { params }) => {
  const p = await params;

  const bookingCollection = dbConnect(collectionNameObj.bookingCollection);

  const query = { _id: new ObjectId(p.id) };

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const singleBooking = await bookingCollection.findOne(query);

  const isWonerOk = email === singleBooking?.email;

  if (isWonerOk) {
    const body = await req.json();
    const filter = {
      $set: { ...body },
    };

    const options = {
      upsert: true,
    };

    const updateResponse = await bookingCollection.updateOne(
      query,
      filter,
      options,
    );

    return NextResponse.json(updateResponse);
  } else {
    return NextResponse.json(
      { message: "Forbidden update action " },
      {
        status: 403,
      },
    );
  }
};

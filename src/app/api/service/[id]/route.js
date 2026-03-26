import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const DELETE = async (req, { params }) => {
  const bookingCollection = dbConnect(collectionNameObj.bookingCollection);
 const { id } = await params;
const query = { _id: new ObjectId(id) };

  const session = await getServerSession(authOptions);
  const currentBooking = await bookingCollection.findOne(query);
  const isWonerOk = session?.user?.email == currentBooking.email;

  if (isWonerOk) {
    const deleteresponse = await bookingCollection.deleteOne(query);
revalidatePath("/my-bookings")
    return NextResponse.json(deleteresponse);
  } else {
    return NextResponse.json(
      { success: false, messge: "Forbidden Actioon " },
      { status: 401 },
    );
  }
};

export const GET = async (req, { params }) => {
  const p = await params;

  const servicesCollection = dbConnect(collectionNameObj.ServicesCollection);

  const data = await servicesCollection.findOne({ _id: new ObjectId(p.id) });

  return NextResponse.json(data);
};

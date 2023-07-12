import { NextResponse } from "next/server";

import prisma from "../../libs/prismdb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;
let locVal ="";
if(location){
    locVal=location.value;
}
//   Object.keys(body).forEach((value: any) => {
//     if (!body[value]) {
//       NextResponse.error();
//     }
//   });
  console.log(currentUser.id)
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: locVal,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}

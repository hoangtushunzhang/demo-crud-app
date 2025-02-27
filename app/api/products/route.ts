import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Tablet", price: 700 },
  ];

  return NextResponse.json(products);
}

import { NextResponse } from "next/server";
import { supabase } from "../../../supabase"; // Sesuaikan jumlah titik dengan lokasi file supabase.ts Anda

export async function GET() {
  // Melakukan query super ringan hanya untuk memberi "denyut nadi" ke database
  const { data, error } = await supabase
    .from("portfolio_comments")
    .select("id")
    .limit(1);

  if (error) {
    return NextResponse.json(
      { status: "Error", message: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    status: "Success",
    message: "Supabase is awake & healthy!",
  });
}

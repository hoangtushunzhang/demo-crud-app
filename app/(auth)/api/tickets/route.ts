import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const ticket = await request.json();
    console.log("🟢 Received Ticket Data:", ticket); // ✅ Kiểm tra dữ liệu frontend gửi lên

    const supabase = createRouteHandlerClient({ cookies });

    // 🔍 Lấy thông tin user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("❌ Session Error:", sessionError);
      return NextResponse.json({ error: "Session error" }, { status: 401 });
    }

    if (!session) {
      console.error("❌ No User Session Found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🟢 User Session:", session.user.email);

    // 📝 Chèn dữ liệu vào bảng "Tickets"
    const { data, error } = await supabase
      .from("Tickets")
      .insert({
        title: ticket.title,
        body: ticket.body,
        priority: ticket.priority,
        user_id: session.user.id, 
      })
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Data inserted successfully:", data);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

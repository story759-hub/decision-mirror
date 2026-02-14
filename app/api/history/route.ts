import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 환경 변수 설정
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : null;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fingerprint = searchParams.get('fp');

    if (!supabase) {
      throw new Error("데이터베이스 연결 실패");
    }

    if (!fingerprint) {
      return NextResponse.json({ error: "Fingerprint가 필요합니다." }, { status: 400 });
    }

    // 해당 유저의 기록만 최신순으로 20개 가져오기
    const { data, error } = await supabase
      .from('snaps')
      .select('*')
      .eq('user_fingerprint', fingerprint)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("🔥 History API Error:", error.message);
    return NextResponse.json([], { status: 500 });
  }
}
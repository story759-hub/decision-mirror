import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ 1. 이 API가 정적으로 캐싱되지 않도록 강제 설정
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
      return NextResponse.json({ error: "데이터베이스 연결 실패" }, { status: 500 });
    }

    if (!fingerprint) {
      return NextResponse.json({ error: "Fingerprint가 필요합니다." }, { status: 400 });
    }

    // 해당 유저의 기록만 최신순으로 가져오기
    const { data, error } = await supabase
      .from('snaps')
      .select('*')
      .eq('user_fingerprint', fingerprint)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    // ✅ 2. 응답 헤더에 캐시 제어 추가 (브라우저 및 Vercel Edge Cache 방지)
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error: any) {
    console.error("🔥 History API Error:", error.message);
    // 에러 발생 시 빈 배열을 반환하여 클라이언트 에러 방지
    return NextResponse.json([], { status: 500 });
  }
}
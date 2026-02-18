import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: "인증 헤더가 없습니다." }, { status: 401 });
    }

    // 환경 변수 확인 (서버 터미널 로그에 찍힙니다)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("❌ 환경변수 누락: NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY");
      return NextResponse.json({ error: "서버 환경 설정 오류" }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const token = authHeader.replace('Bearer ', '');
    
    // 1. 토큰으로 유저 정보 확인 (현재 로그인된 유저인지 확인)
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      console.error("❌ 유저 인증 실패:", authError?.message);
      return NextResponse.json({ error: "인증에 실패했습니다." }, { status: 401 });
    }

    console.log(`✅ 탈퇴 시도 유저 ID: ${user.id}`);

    // 2. DB 데이터 삭제 (emotions 테이블)
    const { error: dbError } = await supabaseAdmin
      .from('emotions')
      .delete()
      .eq('user_id', user.id);

    if (dbError) {
      console.error("❌ DB 데이터 삭제 에러:", dbError.message);
      // 데이터 삭제 실패해도 계정은 삭제할지 결정해야 함 (여기선 중단)
      return NextResponse.json({ error: "데이터 삭제 중 오류가 발생했습니다." }, { status: 500 });
    }

    // 3. Supabase Auth에서 유저 계정 완전히 삭제
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
    
    if (deleteError) {
      console.error("❌ 계정 삭제 에러(Admin API):", deleteError.message);
      return NextResponse.json({ error: `계정 삭제 실패: ${deleteError.message}` }, { status: 500 });
    }

    console.log(`✨ 유저 ${user.id} 탈퇴 성공`);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("🔥 탈퇴 API 치명적 에러:", error);
    return NextResponse.json({ error: "서버 내부 오류가 발생했습니다." }, { status: 500 });
  }
}
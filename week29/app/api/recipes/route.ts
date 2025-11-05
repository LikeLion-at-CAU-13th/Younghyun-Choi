import { NextResponse } from "next/server";

export async function GET() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { error: "Unsplash API 키가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  try {
    // Unsplash API에서 음식 이미지 검색
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=food&per_page=12&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unsplash API 호출 실패");
    }

    const data = await response.json();

    // 레시피 데이터 형식으로 변환
    // [성능 최적화] small 크기 이미지를 기본으로 사용하여 로딩 속도 개선
    const recipes = data.results.map((photo: any, index: number) => ({
      id: photo.id,
      title: getFoodName(index),
      description: getFoodDescription(index),
      // regular 대신 small 사용 (더 빠른 로딩)
      // URL에 직접 크기 파라미터를 추가하여 최적화
      imageUrl: photo.urls.small || photo.urls.regular,
      imageId: photo.id,
      blurDataUrl: photo.urls.thumb, // blur placeholder용 (매우 작은 이미지)
      width: photo.width,
      height: photo.height,
      photographer: photo.user.name,
    }));

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "레시피를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 샘플 레시피 이름
function getFoodName(index: number): string {
  const names = [
    "파스타 카르보나라",
    "스테이크",
    "피자 마르게리타",
    "초밥",
    "타코",
    "햄버거",
    "라면",
    "치킨",
    "샐러드",
    "디저트",
    "파스타",
    "리조또",
  ];
  return names[index % names.length];
}

// 샘플 레시피 설명
function getFoodDescription(index: number): string {
  const descriptions = [
    "크리미한 베이컨과 파스타의 완벽한 조합",
    "부드럽고 육즙이 풍부한 고기 요리",
    "신선한 모짜렐라와 바질의 클래식한 맛",
    "정성스럽게 준비한 신선한 회",
    "매콤한 멕시칸 스타일의 타코",
    "두툼한 패티와 신선한 채소",
    "진한 국물의 면 요리",
    "바삭하고 맛있는 치킨",
    "건강한 신선한 채소 샐러드",
    "달콤한 디저트",
    "이탈리아 전통 파스타",
    "부드러운 크림 리조또",
  ];
  return descriptions[index % descriptions.length];
}

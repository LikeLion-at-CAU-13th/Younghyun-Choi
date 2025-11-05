"use client";

import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageId: string;
  blurDataUrl: string;
  width: number;
  height: number;
  photographer: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("/api/recipes");
        if (!response.ok) {
          throw new Error("레시피를 불러오는데 실패했습니다.");
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-2xl">🍳</div>
          <p className="text-gray-600">레시피를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <p className="text-sm text-gray-500">
            .env 파일에 UNSPLASH_ACCESS_KEY를 설정했는지 확인하세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">인기 레시피</h2>
        <p className="text-gray-600">
          스크롤하면서 이미지 lazy loading을 확인해보세요
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.id} {...recipe} priority={index < 3} />
        ))}
      </div>
    </div>
  );
}

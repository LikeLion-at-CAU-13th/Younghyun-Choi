"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeftCircle } from "react-icons/fi";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="text-7xl font-extrabold">404</div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-3 text-gray-600">
          주소가 잘못되었거나 삭제된 페이지입니다.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gray-800 text-white hover:bg-black transition"
          >
            <FiArrowLeftCircle className="text-xl" />
            이전 페이지로
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
          >
            홈으로
          </Link>
        </div>
      </div>
    </main>
  );
}

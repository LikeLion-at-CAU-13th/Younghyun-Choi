"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeftCircle } from "react-icons/fi";

export default function BackButton({
  className = "inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors gap-x-2",
  label = "프로젝트 목록으로",
}: {
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={className}
      aria-label="이전 페이지로 이동"
    >
      <FiArrowLeftCircle />
      {label}
    </button>
  );
}

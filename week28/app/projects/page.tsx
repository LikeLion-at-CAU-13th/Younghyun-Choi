"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/constant/projects";

export default function ProjectPage() {
  const router = useRouter();

  const goToDetail = (slug: string) => {
    router.push(`/projects/${slug}`); // 상세 페이지 이동
  };

  return (
    <div className="min-h-screen pt-[12vh]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center">
          아기사자의 2025 프로젝트
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => goToDetail(project.slug)}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-white cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-3">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                자세히 보기 &gt;
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

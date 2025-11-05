import { projects } from "@/constant/projects";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton"; 

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen pt-[12vh]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 뒤로가기 버튼: router.back() */}
        <BackButton />

        {/* 프로젝트 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{project.description}</p>

          {/* 기술 스택 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* 링크 버튼 */}
          <div className="flex gap-4">
            {project.url && project.url !== "#" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                프로젝트 보기
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* 프로젝트 상세 내용 */}
        {project.content && (
          <div className="px-4 py-8  mx-auto ">
            {project.content.overview && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold">프로젝트 개요</h2>
                <p className="text-gray-700">{project.content.overview}</p>
              </section>
            )}

            {project.content.features &&
              project.content.features.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold">주요 기능</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {project.content.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </section>
              )}

            {project.content.techStack && (
              <section>
                <h2 className="text-xl font-semibold">기술 스택</h2>
                <p className="text-gray-700">{project.content.techStack}</p>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

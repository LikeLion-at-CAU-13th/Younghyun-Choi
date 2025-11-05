// 이미지를 위한 컴포넌트

import { image } from "framer-motion/client";
import Image from "next/image";

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageId: string;
  blurDataUrl: string;
  width: number;
  height: number;
  photographer: string;
  priority?: boolean;
}

export default function RecipeCard({
  title,
  description,
  imageUrl,
  blurDataUrl,
  photographer,
  priority = false,
}: RecipeCardProps) {
  const optimizedImageUrl = `${imageUrl}?w=600&q=75&auto=format`;
  const blurPlaceholder = blurDataUrl || `${imageUrl}?w=10&q=20`;

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={optimizedImageUrl}
          alt={title}
          priority={priority}
          width={800}
          height={600}
          placeholder="blur"
          blurDataURL={blurPlaceholder}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>
        <p className="mb-2 text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400">
          Photo by {photographer} on Unsplash
        </p>
      </div>
    </div>
  );
}

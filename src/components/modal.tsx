import { DogImage } from "@/types/api";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageSkeleton from "./image-skeleton";

export default function Modal({
  onActive,
  onCloseClick,
  images,
  imgIdx,
}: {
  onActive: boolean;
  onCloseClick: () => void;
  images: DogImage[];
  imgIdx: number;
}) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
  }, [onActive]);

  return (
    <div
      className={twMerge(
        "fixed inset-0 z-20 w-full h-full bg-black bg-opacity-50",
        onActive ? "flex flex-col justify-start items-center" : "hidden"
      )}
    >
      <div
        className="absolute top-4 right-9 text-4xl text-[#f1f1f1] font-bold transition duration-300 hover:text-[#bbb] cursor-pointer"
        onClick={onCloseClick}
      >
        &times;
      </div>

      {!onActive ? (
        <div className="h-screen flex flex-col items-center justify-center">
          <p className="text-3xl text-[#ffffff] font-bold">
            이미지를 불러오는 중입니다...
          </p>
        </div>
      ) : (
        <div className="w-full mt-[10vh] flex flex-col items-center justify-center">
          <h2 className="text-3xl text-[#ffffff] font-bold">
            {images[imgIdx]?.name || "기다려주세요!"}
          </h2>
          <figure className="relative w-full mt-4 max-w-xl aspect-video mx-auto p-4">
            {isLoading && <ImageSkeleton />}
            <Image
              src={images[imgIdx].url}
              alt="dog"
              fill
              className={twMerge(
                "object-cover rounded-lg shadow-lg",
                isLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setIsLoading(false)}
            />
          </figure>
        </div>
      )}
    </div>
  );
}

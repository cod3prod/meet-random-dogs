import { DogImage } from "@/types/api";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.png";

export default function Modal({
  onActive,
  onCloseClick,
  images,
  imgIdx,
}: {
  onActive: boolean;
  onCloseClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  images: DogImage[];
  imgIdx: number;
}) {

  return (
    <div
      className={twMerge(
        "fixed inset-0 z-20 w-full h-full bg-black bg-opacity-50",
        onActive ? "flex flex-col justify-start items-center" : "hidden"
      )}
      onClick={onCloseClick}
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
          <p className="text-3xl text-[#ffffff] font-bold">
            {images[imgIdx]?.name || "기다려주세요!"}
          </p>
          <div className="relative w-full mt-4 max-w-xl aspect-video">
            <Image
              src={images[imgIdx]?.url || Placeholder }
              alt="dog"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

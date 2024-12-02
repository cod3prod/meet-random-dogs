"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./modal";
import { DogAPIResponse, DogImage } from "@/types/api";
import Link from "next/link";

export default function Container() {
  const [dogImgs, setDogImgs] = useState<DogImage[]>([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [curImgIdx, setCurImgIdx] = useState<number | null>(null);

  async function getDogs(onFetch: Dispatch<SetStateAction<DogImage[]>>) {
    const fetchPromises: Promise<DogAPIResponse>[] = Array.from(
      { length: 32 },
      () => {
        return fetch("https://dog.ceo/api/breeds/image/random").then((res) =>
          res.json()
        );
      }
    );

    try {
      const results = await Promise.all(fetchPromises);
      console.log(results);
      const images = results.map((result) => ({
        url: result.message,
        name: result.message.split("/")[4],
      }));
      onFetch(images);
    } catch (error) {
      console.error("Fetch 에러 : ", error);
    }
  }

  useEffect(() => {
    getDogs(setDogImgs);
  }, []);

  function openModal(index: number) {
    setCurImgIdx(index);
    setIsModalActive(true);
  }

  function closeModal(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    setIsModalActive(false);
  }

  const doors = Array(32)
    .fill(null)
    .map((el, idx) => {
      return (
        <div
          key={idx}
          className="w-20 h-[84px] m-1 z-10 bg-[#555] border-[3px] hover:bg-[orange] border-[#fff] transform skew-x-[-14deg] hover:scale-125 overflow-hidden transition-transform duration-100 bg-transition duration-600 cursor-pointer"
        >
          <div
            onClick={() => {
              openModal(idx);
            }}
            style={{
              transform: "skewX(14deg) translateX(-10%)",
              backgroundImage: `url(/doors/img${idx + 1}.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-[125%] h-full"
          ></div>
        </div>
      );
    });

  return (
    <>
      <Modal
        onActive={isModalActive}
        onCloseClick={(e) => closeModal(e)}
        images={dogImgs}
        imgIdx={curImgIdx!}
      />
      <div className="container mx-auto">
        <h1 className="mt-10 mb-5 text-2xl font-bold text-[#333] text-center">
          Meet Random Dogs
        </h1>
        <div className="mx-auto my-0 px-5 flex flex-wrap justify-center max-w-xl">
          {doors}
        </div>
        <p className="my-5 text-center text-xl font-bold text-[#333] hover:text-red-400 hover:text-2xl animate-bounce transition duration-300">
          <Link href="https://github.com/cod3prod">Created by cod3prod</Link>
        </p>
      </div>
    </>
  );
}

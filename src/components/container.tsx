"use client";

import { useCallback, useMemo, useState } from "react";
import Modal from "./modal";
import { DogAPIResponse, DogImage } from "@/types/api";
import Door from "./door";
import useFetch from "@/hooks/use-fetch";
import Loader from "./loader";
import Error from "./error";

export default function Container() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [curImgIdx, setCurImgIdx] = useState<number | null>(null);

  const { isLoading, isError, data } = useFetch<DogAPIResponse>({
    url: "https://dog.ceo/api/breeds/image/random",
    fetchCount: 32,
  });

  const dogImgs: DogImage[] = useMemo(() => {
    return data.map((dog) => ({
      url: dog.message,
      name: dog.message.split("/")[4],
    }));
  }, [data]);

  const openModal = useCallback((index: number) => {
    setCurImgIdx(index);
    setIsModalActive(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalActive(false);
  }, []);

  const Doors = useMemo(() => {
    return Array(32)
      .fill(null)
      .map((el, idx) => <Door key={idx} index={idx} openModal={openModal} />);
  }, []);

  return (
    <>
      <Modal
        onActive={isModalActive}
        onCloseClick={closeModal}
        images={dogImgs}
        imgIdx={curImgIdx!}
      />
      <div className="container mx-auto">
        <div className="mx-auto my-0 px-5 flex flex-wrap justify-center max-w-xl">
          {Doors}
        </div>
      </div>
      {isLoading && <Loader />}
      {isError && <Error />}
    </>
  );
}

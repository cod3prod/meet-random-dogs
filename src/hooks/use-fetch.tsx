"use client";

import { useEffect, useState } from "react";

export default function useFetch<T>({
  url,
  fetchCount,
}: {
  url: string;
  fetchCount: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T[]>([]);

  async function fetchData() {
    setIsLoading(true);
    const fetchPromises: Promise<T>[] = Array.from(
      { length: fetchCount },
      () => {
        return fetch(url).then((res) => res.json());
      }
    );

    try {
      const results = await Promise.all(fetchPromises);
      setData(results);
    } catch (error) {
      console.error("fetch error: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, isError, data };
}

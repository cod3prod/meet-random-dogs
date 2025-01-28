# Meet Random Dogs

**dog.ceo API를 활용한 학습 목적 토이 프로젝트**

## 🎯 **Project Purpose**

**핵심 목표**

- **Custom Hook**: 커스텀 훅을 사용하여 API 호출 로직을 재사용 가능하게 모듈화하고, 코드의 가독성과 유지 보수성을 높입니다.
- **Memoization**: `useMemo`와 `useCallback`을 사용하여 불필요한 렌더링과 계산을 방지하고, 애플리케이션의 성능을 최적화합니다.
- **API 활용**: `dog.ceo` API를 활용하여 무작위 강아지 이미지를 불러오고, 이를 사용자에게 제공합니다.

## 🔨 **Tech Stack**

- **주요 기술**: Next.js 15
- **스타일링**: Tailwind CSS
- **API**: dog.ceo

## 📝 **Key Learnings**

### 1. Custom Hook

API 호출 로직을 커스텀 훅으로 분리하여 재사용성을 높였습니다. `useFetch` 훅은 URL과 호출 횟수를 인자로 받아 여러 번의 API 호출을 병렬로 처리하고, 로딩 상태와 에러 상태를 관리합니다.

```tsx
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
```

### 2. Memoization

useMemo와 useCallback을 사용하여 불필요한 렌더링과 계산을 방지했습니다. dogImgs는 API로부터 받은 데이터를 가공하여 메모이제이션하고, Doors는 컴포넌트 배열을 메모이제이션하여 성능을 최적화했습니다.

```tsx
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
    .map((_, idx) => <Door key={idx} index={idx} openModal={openModal} />);
}, []);
```

## ⚙️ **Setup**

```bash
# 설치
npm i

# 로컬 환경 실행
npm run dev
```

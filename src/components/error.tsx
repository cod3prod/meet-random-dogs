export default function Error() {
    return (
      <div className="fixed inset-0 z-20 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">오류 발생</h2>
          <p className="text-red-500">문제가 발생했습니다. 다시 시도해 주세요.</p>
        </div>
      </div>
    )
  }
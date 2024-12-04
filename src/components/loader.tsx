export default function Loader() {
  return (
    <div className="fixed inset-0 z-20 w-full h-full bg-black bg-opacity-50 flex flex-col gap-4 justify-center items-center">
      <p className="text-white text-3xl">잠시만 기다려주세요</p>
      <div className="w-20 h-20 border-8 border-t-sky-500 border-white rounded-full animate-spin"></div>
    </div>
  );
}

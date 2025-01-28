export default function Door({
  index,
  openModal,
}: {
  index: number;
  openModal: (idx: number) => void;
}) {
  return (
    <div
      key={index}
      className="w-20 h-[84px] m-1 z-10 bg-[#555] border-[3px] hover:bg-black border-[#fff] transform skew-x-[-14deg] hover:scale-125 overflow-hidden transition-transform duration-300 bg-transition cursor-pointer"
    >
      <div
        onClick={() => {
          openModal(index);
        }}
        style={{
          transform: "skewX(14deg) translateX(-10%)",
          backgroundImage: `url(/doors/img${index + 1}.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-[125%] h-full"
      ></div>
    </div>
  );
}

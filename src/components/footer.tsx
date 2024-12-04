import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <p className="my-5 text-center text-xl font-bold text-[#333] hover:text-red-400 hover:text-2xl animate-bounce transition duration-300">
        <Link href="https://github.com/cod3prod">Created by cod3prod</Link>
      </p>
    </footer>
  );
}

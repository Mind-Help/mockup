import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => (
  <header className="bg-brand-dark2 flex py-4 justify-around items-center">
    <Image width={50} height={50} src="/logo.svg" alt="our logo" />
    <nav>
      <ul className="flex gap-12">
        <Link href="/">
          <li className="cursor-pointer transition-all hover:underline hover:text-brand-light3">
            home
          </li>
        </Link>
        <Link href="/blog">
          <li className="cursor-pointer transition-all hover:underline hover:text-brand-light3">
            blog
          </li>
        </Link>
        <Link href="/newsletter">
          <li className="cursor-pointer transition-all hover:underline hover:text-brand-light3">
            newsletter
          </li>
        </Link>
      </ul>
    </nav>
  </header>
);

export default Header;

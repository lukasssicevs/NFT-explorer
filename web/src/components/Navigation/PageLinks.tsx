import Link from "next/link";

type PageLinksProps = {
  setShowMenu: (show: boolean) => void;
};

const PageLinks = ({ setShowMenu }: PageLinksProps) => {
  return (
    <div className="md:flex md:flex-row w-full">
      <Link
        href="/"
        className="flex gap-1 px-6 text-xl md:text-2xl text-gray-700 hover:text-pink-800 font-bold py-8 text-center"
        onClick={() => setShowMenu(false)}
      >
        <span className="w-full">Collections</span>
      </Link>
      <Link
        href="/clipboard"
        className="flex gap-1 px-6 text-xl md:text-2xl text-gray-700 hover:text-pink-800 font-bold py-8 text-center"
        onClick={() => setShowMenu(false)}
      >
        <span className="w-full">Clipboard</span>
      </Link>
    </div>
  );
};

export default PageLinks;

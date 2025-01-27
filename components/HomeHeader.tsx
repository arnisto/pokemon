import Link from "next/link";

const HomeHeader = () => {
  return (
    <div className="bg-[#ef5350] text-white flex justify-between py-5 px-10 w-full">
      <div>Pokedex</div>
      <div className="flex gap-5">
        <Link href="/">Home</Link>
        <Link href="/top-pokemon">Top Pokemon</Link>
        <Link href={"/v1"}>V1</Link>
        <Link href="/graph-ql">QraphQl V1beta</Link>
      </div>
    </div>
  );
};

export default HomeHeader;

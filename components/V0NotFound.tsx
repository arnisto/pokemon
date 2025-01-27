"use client";

import Link from "next/link";

const V0NotFound = () => {
  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center  bg-[#ef5350]">
      {/* Image Grid */}
      <div className="flex">
        {/* First Image */}
        <div className="relative  w-1/6 ">
          <Link href="/v1">
            <img
              src="/Path.png"
              alt="Not Found 1"
              className="object-cover rounded-lg"
            />
          </Link>
        </div>

        {/* Second img */}
        <div className="relative w-5/6 ">
          <img
            src="/img3.png"
            alt="Not Found 2"
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Third Image (Full Width) */}
      <div className="">
        <img src="/img2.png" alt="Not Found 3" className="" />
      </div>
    </div>
  );
};

export default V0NotFound;

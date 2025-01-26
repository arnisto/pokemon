"use client";
const V0NotFound = () => {
  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center  bg-[#ef5350]">
      {/* Image Grid */}
      <div className="flex">
        {/* First Image */}
        <div className="relative  w-1/6 ">
          <img
            src="/Path.png"
            alt="Not Found 1"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Second img */}
        <div className="relative w-5/6 ">
          <img
            src="/img3.png"
            alt="Not Found 2"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Third Image (Full Width) */}
      <div className="">
        <img src="/img2.png" alt="Not Found 3" fill className="" />
      </div>
    </div>
  );
};

export default V0NotFound;

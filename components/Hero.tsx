import type { NextPage } from "next";

const Hero: NextPage = () => {
  return (
    <div className="w-full flex flex-col items-center text-center text-[#F3F3F5]">

      {/* TITLE */}
      <h1 className="font-sans text-[48px] leading-[48px] tracking-[-1.2px] max-w-[900px]">
        Experience liftoff with next-generation text classification
      </h1>

      {/* SUBTEXT — lebih dekat */}
      <p className="mt-3 text-base text-[#A0A0A0] max-w-[600px] leading-[24px]">
        Upload your text file and classify it using advanced AI models
      </p>

    </div>
  );
};

export default Hero;

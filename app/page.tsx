import type { NextPage } from "next";
import Hero from "@/components/Hero";
import UploadBar from "@/components/UploadBar";
import Threads from "@/components/Threads";

const HomePage: NextPage = () => {
  return (
    <main className="relative min-h-screen flex flex-col items-center gap-16 pt-[320px] overflow-hidden bg-[#0B0B0F]">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={false}
        />
      </div>

      <div className="z-10 w-full max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-16">
        <Hero />
        <UploadBar />
      </div>
    </main>
  );
};

export default HomePage;

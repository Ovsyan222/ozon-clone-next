import { Header } from "@/components/layout/Header";
import { TopMenu } from "@/components/layout/TopMenu";
import { Slider } from "@/components/pages/home/slider/Slider";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Header/>
      <TopMenu/>
      <Image 
        src="/banner.png"
        alt="Banner"
        width={1407}
        height={94}
        className="mx-auto mt-6 mb-3"
      />
      <Slider/>
    </div>
  );
}

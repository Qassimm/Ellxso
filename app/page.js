import Categories from "@/components/Home/Categories";
import HeroSlider from "@/components/Home/HeroSlider";
import NewArrivals from "@/components/Home/NewArrivals";
import PromoBanner from "@/components/Home/PromoBanner";
import Reviews from "@/components/Home/Reviews";
import TopSellers from "@/components/Home/TopSellers";
import VideoShowCase from "@/components/Home/VideoShowCase";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <Categories />
      <TopSellers />
      <PromoBanner />
      <NewArrivals />
      <Reviews />
      <VideoShowCase />
    </main>
  );
}

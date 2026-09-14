import { HomeSections } from "@/components/paraluman-home/home-sections";
import { HomeMotionController } from "@/components/paraluman-home/home-motion-controller";
import { Hero } from "@/components/paraluman-home/hero";
import { SiteFooter } from "@/components/paraluman-home/site-footer";
import { SiteHeader } from "@/components/paraluman-home/site-header";

export default function Home() {
  return (
    <HomeMotionController>
      <div className="site-shell">
        <a className="skip-link" href="#main-content">Bỏ qua điều hướng</a>
        <SiteHeader />
        <main id="main-content">
          <Hero />
          <HomeSections />
        </main>
        <SiteFooter />
      </div>
    </HomeMotionController>
  );
}

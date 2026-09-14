import Banner from '@/components/layouts/public/banner/Banner';
import Category from '@/components/layouts/public/category/Category';
import FooterCTA from '@/components/layouts/public/Footer-CTA/FooterCTA';
import Products from '@/components/layouts/public/product/Products.';
import PromoBanner from '@/components/layouts/public/Promo-Banner/PromoBanner';
import TopDeal from '@/components/layouts/public/topdeal/TopDeal';

export default function Home() {
  return (
    <div className="container mx-auto  px-2">
      <Banner></Banner>
      <Category></Category>
      <TopDeal></TopDeal>
      <PromoBanner></PromoBanner>
      <Products></Products>
      <FooterCTA></FooterCTA>
    </div>
  );
}

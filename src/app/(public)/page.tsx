import Banner from '@/components/layouts/public/banner/Banner';
import Category from '@/components/layouts/public/category/Category';
import Products from '@/components/layouts/public/projucts/Products.';
import TopDeal from '@/components/layouts/public/topdeal/TopDeal';

export default function Home() {
  return (
    <div className="container mx-auto  px-2">
      <Banner></Banner>
      <Category></Category>
      <TopDeal></TopDeal>
      <Products></Products>
    </div>
  );
}

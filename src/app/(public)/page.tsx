import Banner from '@/components/layouts/public/banner/Banner';
import Category from '@/components/layouts/public/category/Category';

export default function Home() {
  return (
    <div className="container mx-auto  px-4">
      <Banner></Banner>
      <Category></Category>
    </div>
  );
}

import Footer from '@/components/layouts/public/footer/Footer';
import { PublicNavbar } from '@/components/layouts/public/navbar/PublicNavbar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar></PublicNavbar>
      <main className="flex-1">{children}</main>
      <Footer></Footer>
    </div>
  );
}

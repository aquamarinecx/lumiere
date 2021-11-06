import Header from '@components/layouts/Header';
import Footer from '@components/layouts/Footer';

export default function Layout({ children }) {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="container flex-1">{children}</div>
      <Footer />
    </main>
  );
}

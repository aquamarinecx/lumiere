import Header from '@components/layouts/Header';
import Footer from '@components/layouts/Footer';
import ProseContainer from '@components/ui/ProseContainer';

export default function BlogLayout({ children }) {
  return (
    <>
      <Header />
      <ProseContainer>
        <section className="flex flex-row-reverse">{children}</section>
      </ProseContainer>
      <Footer />
    </>
  );
}

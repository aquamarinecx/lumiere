import Head from 'next/head';
import { getMDXComponent } from 'mdx-bundler/client';
import Layout from '@components/layouts/Layout';
import { getAllSlugs } from '@lib/mdxBundler';
// error
export default function Blogs({ slugs }) {
  return (
    <>
      <Head>
        <title>Blog - Lumiere</title>
      </Head>

      <h1 className="text-gray-100 heading-primary">Lumiere Blogs</h1>
      {slugs.map((slug) => (
        <h1>{slug.replace(/\.mdx/, '')}</h1>
      ))}
    </>
  );
}

export const getStaticProps = async () => {
  const slugs = await getAllSlugs(['company', 'blog']);
  return {
    props: {
      slugs,
    },
  };
};

Blogs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

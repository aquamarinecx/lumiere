import Head from 'next/head';
import Layout from '@components/layouts/Layout';
import { getAllFilesFrontMatter } from '@lib/mdxBundler';
// error
export default function Blogs({ posts }) {
  return (
    <>
      <Head>
        <title>Blog - Lumiere</title>
      </Head>

      <h1 className="mb-2 text-gray-100 heading-primary">Lumiere Blogs</h1>
      <p className="mb-8 text-md">Catch up on the latest blog from Lumiere!</p>
      {posts.map((post) => (
        <div
          key={post}
          className="w-full px-4 py-8 border-t border-b border-gray-500"
        >
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="mb-8">Published {post.date}</p>
          <p className="mb-8 text-xl text-gray-300">{post.desc}</p>
          <p className="text-lg text-purple-400">Read more!</p>
        </div>
      ))}
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getAllFilesFrontMatter(['company', 'blog']);
  return {
    props: {
      posts,
    },
  };
};

Blogs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

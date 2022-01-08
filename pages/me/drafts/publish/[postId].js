import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@components/layouts/Layout';
import prisma from '@lib/prisma';

export default function Publish({ post }) {
  const router = useRouter();
  const tags = [];

  const publishPost = async (slug) => {
    try {
      const body = { slug };
      await fetch('/api/post/publish', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Publish - Lumiere</title>
      </Head>

      <button
        type="button"
        className="p-3.5 mb-4 text-3xl text-gray-200 duration-200 border border-gray-300 rounded-xl hover:text-green-600 hover:border-green-600"
        onClick={() => publishPost(post.slug)}
      >
        Publish
      </button>
      <h1 className="mb-4">{post.title}</h1>
      <input
        id="desc"
        className="w-full p-3 mb-3 text-gray-100 bg-gray-800 outline-none rounded-xl"
        placeholder="Enter a small caption/description"
      />
      <h1>{tags[0]}</h1>
      <button
        type="button"
        className="px-2.5 py-1 mb-4 text-gray-300 duration-200 border border-gray-400 rounded-xl hover:text-pink-600 hover:border-pink-600"
        onClick={() => tags.push('LMAOOO')}
      >
        Add tags
      </button>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { postId } = params;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  post.createdAt = String(post.createdAt);
  post.updatedAt = String(post.updatedAt);

  return {
    props: { post },
  };
};

Publish.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

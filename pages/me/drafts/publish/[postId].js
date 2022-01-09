import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Layout from '@components/layouts/Layout';
import prisma from '@lib/prisma';

export default function Publish({ post }) {
  const router = useRouter();
  const [tags, setTag] = useState([]);

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
      <h2 className="mb-4">{post.title}</h2>
      <input
        id="desc"
        className="w-full p-3 mb-3 text-gray-100 bg-gray-800 outline-none rounded-xl"
        placeholder="Enter a small caption/description"
      />
      <div className="flex flex-row w-full py-2 mb-4">
        {tags.map((tag) => (
          <p
            key={tag}
            className="inline px-2 py-1 mr-4 text-purple-400 border border-purple-400 rounded-xl"
          >
            {tag}
          </p>
        ))}
      </div>
      <button
        type="button"
        className="px-2.5 py-1 mb-4 text-gray-300 duration-200 border border-gray-400 rounded-xl hover:text-pink-600 hover:border-pink-600"
        onClick={() => setTag([...tags, 'AAAH'])}
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

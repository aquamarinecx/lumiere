import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Layout from '@components/layouts/Layout';
import prisma from '@lib/prisma';
import { BsTagsFill } from 'react-icons/bs';

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

  const addTag = async (event) => {
    event.preventDefault();
    if (event.target.tagInput.value !== '')
      setTag([...tags, event.target.tagInput.value]);
    event.target.tagInput.value = '';
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
      <div className="py-2 mb-4">
        {tags.map((tag) => (
          <div
            key={tag}
            className="inline w-full px-4 py-2 mr-4 text-purple-400 duration-200 border border-purple-400 hover:border-pink-600 rounded-xl hover:text-pink-600 hover:cursor-pointer"
          >
            <div className="inline-block my-3">
              <button
                onClick={() => {
                  setTag(tags.filter((tempTag) => tempTag !== tag));
                }}
                type="button"
                className="mr-4 text-red-700 duration-200 hover:text-red-400"
              >
                X
              </button>
              <p className="inline">{tag}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={addTag}>
        <input
          id="tagInput"
          className="p-3 mb-3 mr-2 text-gray-100 bg-gray-800 outline-none rounded-xl"
          placeholder="Enter a tag"
          autoComplete="off"
        />
        <button
          type="submit"
          className="px-2.5 py-1 mb-4 text-gray-300 duration-200 border border-gray-400 rounded-xl hover:text-pink-600 hover:border-pink-600"
        >
          Add tag
        </button>
      </form>
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

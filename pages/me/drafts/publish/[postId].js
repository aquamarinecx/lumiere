import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@components/layouts/Layout';
import prisma from '@lib/prisma';

export default function Publish({ post }) {
  return (
    <>
      <Head>
        <title>Publish - Lumiere</title>
      </Head>
      <h1>Preview</h1>
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

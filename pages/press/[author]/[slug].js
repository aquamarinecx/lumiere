import prisma from '@lib/prisma';
import Layout from '@components/layouts/Layout';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Publication({
  title,
  content,
  createdAt,
  updatedAt,
  author,
}) {
  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <>
      <Head>
        <title>{`${author.username} | ${title}`}</title>
      </Head>

      <article className="prose dark:prose-dark">
        <div className="container">Cool</div>
      </article>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const authorUsername = params.author;
  const { slug } = params;

  const post = await prisma.post.findUnique({
    where: {
      authorUsername_slug: { authorUsername, slug },
    },
    select: {
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          username: true,
          image: true,
        },
      },
    },
  });

  post.createdAt = String(post.createdAt);
  post.updatedAt = String(post.updatedAt);

  return {
    props: post,
  };
};

Publication.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

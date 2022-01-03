import Layout from '@components/layouts/Layout';
import Head from 'next/head';
import { getSession, useSession, signIn } from 'next-auth/react';
import prisma from '@lib/prisma';

export default function Statistics({ stats }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  if (status === 'loading') return null;

  return (
    <>
      <Head>
        <title>Statistics - Lumiere</title>
      </Head>
      <h1>Statistics</h1>
      <h1>{stats.username}</h1>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { data: [] } };
  }

  const userData = await prisma.user.findUnique({
    where: {
      username: session.user.username,
    },
    include: {
      posts: true,
    },
  });

  let publishedCount = 0;
  let draftCount = 0;

  userData.posts.forEach((post) => {
    if (post.published) publishedCount += 1;
    else draftCount += 1;
  });

  const stats = {
    name: userData.name,
    email: userData.email,
    username: userData.username,
    pfp: userData.image,
    published: publishedCount,
    drafts: draftCount,
  };

  return {
    props: { stats },
  };
};

Statistics.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

import Layout from '@components/layouts/Layout';
import Head from 'next/head';
import Image from 'next/dist/client/image';
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
      <h1 className="mb-8">Statistics</h1>
      <div className="flex flex-row items-start justify-center w-7/12 p-16 bg-gray-800 border border-gray-800 rounded-3xl">
        <div className="mr-auto">
          <Image
            src={stats.pfp}
            alt="user profile picture"
            width={200}
            height={200}
            className="inline rounded-full"
          />
          <h3 className="mt-6">{stats.username}</h3>
        </div>
        <div className="flex flex-col items-center justify-start text-center">
          <h3>{stats.name}</h3>
          <p className="mb-4 text-gray-300">{stats.email}</p>
          <div className="w-full h-full p-6 text-left bg-gray-600 border border-gray-600 rounded-3xl">
            <h4 className="text-gray-100">{stats.published} publication(s)</h4>
            <h4 className="text-gray-100">{stats.drafts} draft(s)</h4>
          </div>
        </div>
      </div>
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

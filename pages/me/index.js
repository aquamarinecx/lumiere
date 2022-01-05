import Layout from '@components/layouts/Layout';
import Head from 'next/head';
import Image from 'next/dist/client/image';
import { getSession, useSession, signIn } from 'next-auth/react';
import Publication from '@components/ui/Publication';
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
        <title>Profile - Lumiere</title>
      </Head>
      <div className="flex flex-row">
        <div className="flex flex-col justify-center">
          <Image
            src={stats.pfp}
            alt="user profile picture"
            width={275}
            height={275}
            className="inline rounded-full"
          />
          <h2 className="mt-5 text-3xl">{stats.username}</h2>
          <h3 className="text-2xl text-gray-400">{stats.name}</h3>
        </div>
        <div className="flex flex-row">
          {stats.publications.map((publication) => (
            <Publication
              key={publication.id}
              post={publication}
              visibility="public"
            />
          ))}
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
      posts: {
        where: { published: true },
        select: {
          id: true,
          title: true,
          slug: true,
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
      },
    },
  });

  userData.posts.forEach((publication) => {
    publication.createdAt = String(publication.createdAt);
    publication.updatedAt = String(publication.updatedAt);
  });

  console.log('-----');
  console.log(userData);

  const stats = {
    name: userData.name,
    email: userData.email,
    username: userData.username,
    pfp: userData.image,
    // published: publishedCount,
    // drafts: draftCount,
    publications: userData.posts,
  };

  return {
    props: { stats },
  };
};

Statistics.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

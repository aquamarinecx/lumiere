import prisma from '@lib/prisma';
import Head from 'next/head';
import { getSession, useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MDXEditor from '@components/editor/MDXEditor';
import Header from '@components/layouts/Header';
import { useXdm } from '@lib/xdm';

export default function EditPublication({
  title,
  slug,
  content,
  createdAt,
  updatedAt,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const [state, setConfig] = useXdm({
    value: content,
  });

  const savePublication = async () => {
    try {
      const body = { content: state.value, slug };
      await fetch('/api/post/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/publications');
    } catch (error) {
      console.error(error);
    }
  };

  if (status === 'loading') return null;

  return (
    <>
      <Head>
        <title>[Publication] — {title}</title>
      </Head>

      <Header
        pageType="editor"
        title={title}
        content={content}
        saveDraft={savePublication}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <MDXEditor state={state} setConfig={setConfig} collapsed={collapsed} />
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const authorUsername = session.user.username;
  const { slug } = params;

  const post = await prisma.post.findUnique({
    where: {
      authorUsername_slug: { authorUsername, slug },
    },
    select: {
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
    props: post,
  };
};

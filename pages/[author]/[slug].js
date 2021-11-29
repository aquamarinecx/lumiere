import prisma from '@lib/prisma';
import Layout from '@components/layouts/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getMDXComponent } from 'mdx-bundler/client';
import { getTimeAndDate } from '@lib/utilities/formatDate';
import { useMemo } from 'react';
import { compileMdx } from '@lib/mdxBundler';
import MDXComponents from '@components/editor/MDXComponents';

export default function Publication({
  title,
  code,
  frontmatter,
  createdAt,
  updatedAt,
  author,
}) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head>
        <title>{`${author.username} — ${title}`}</title>
      </Head>

      <article className="prose break-words bg-gray-100 dark:bg-gray-900 max-w-none dark:prose-dark">
        <div className="container">
          <div className="flex flex-col items-center justify-center p-8 mb-8 border-b-2 border-gray-500 md:p-4 md:text-left md:items-start">
            <Link href="/press" passHref>
              <p className="mt-0 text-purple-400 duration-200 hover:cursor-pointer hover:text-pink-600">
                ← Back to Publications
              </p>
            </Link>
            <h1 className="mb-2 ml-4 md:ml-0">{title}</h1>
            <p className="mt-0 mb-8">Published {createdAt}</p>
            <div className="flex flex-row items-center justify-center">
              <Image
                src={author.image}
                alt="author image"
                width={60}
                height={60}
                className="rounded-full"
              />
              <p className="ml-6">Written by {author.username}</p>
            </div>
          </div>
          <Component components={MDXComponents} />
        </div>
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

  post.createdAt = getTimeAndDate(post.createdAt);
  post.updatedAt = getTimeAndDate(post.updatedAt);

  const { code, frontmatter } = await compileMdx(post.content);

  post.code = code;
  post.frontmatter = frontmatter;

  return {
    props: post,
  };
};

Publication.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

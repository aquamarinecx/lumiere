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
  desc,
  tags,
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

      <div className="mb-12 md:mb-4">
        <div className="w-full text-center border-b border-gray-500 md:border-none">
          <h1 className="mb-2">{title}</h1>
          <p className="mb-8 text-xl text-gray-300">{desc}</p>
          <div className="flex flex-row items-center justify-center mb-8">
            <Image
              src={author.image}
              alt="author image"
              width={50}
              height={50}
              className="rounded-full"
            />
            <Link href={`/${author.username}`} passHref>
              <p className="ml-6">
                Written by{' '}
                <span className="underline duration-200 hover:text-pink-600 hover:cursor-pointer">
                  {author.username}
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>
      <article className="flex flex-row prose break-words bg-gray-100 dark:bg-gray-900 max-w-none dark:prose-dark md:flex-col md:text-center">
        <div className="flex flex-col w-1/3 pr-12 mr-30 md:pr-0">
          <div className="py-4">
            <h3 className="mt-0">Tags</h3>
            {tags.map((tag) => (
              <div
                key={tag}
                className="inline w-full px-2 py-1 mr-2 text-purple-400 duration-200 border border-purple-400 hover:border-pink-600 rounded-xl hover:text-pink-600 hover:cursor-pointer"
              >
                <div className="inline-block my-1">
                  <p className="inline">{tag}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t">
            <p className="mt-6 mb-2 md:my-4">Published {createdAt}</p>
          </div>
          <Link href="/press" passHref>
            <p className="mt-0 text-purple-400 duration-200 hover:cursor-pointer hover:text-pink-600">
              ← Back to Publications
            </p>
          </Link>
        </div>
        <div className="w-9/12 text-left md:w-full">
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
      desc: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          username: true,
          image: true,
        },
      },
      tags: true,
    },
  });

  post.createdAt = getTimeAndDate(post.createdAt);
  post.updatedAt = getTimeAndDate(post.updatedAt);

  const { code, frontmatter } = await compileMdx(post.content);

  post.code = code;
  post.frontmatter = frontmatter;

  console.log(post);

  return {
    props: post,
  };
};

Publication.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

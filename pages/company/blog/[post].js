import { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
<<<<<<< HEAD
=======
import Image from 'next/image';
>>>>>>> c2026aa50bb880249bdd9a70c7fa59f76a799264
import Layout from '@components/layouts/Layout';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllSlugs, getPostBySlug } from '@lib/mdxBundler';

export default function Post({ code, frontmatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
<<<<<<< HEAD
      <div className="mb-12">
        <div className="w-full text-center border-b border-gray-500">
          <p className="text-base text-gray-400">
            Published {frontmatter.date}
          </p>
          <h1 className="mb-4">{frontmatter.title}</h1>
        </div>
      </div>
      <article className="container prose break-words bg-gray-100 dark:bg-gray-900 max-w-none dark:prose-dark">
        <Component />
      </article>
      <Link href="/company/blog" passHref>
        <p className="inline-block mt-8 text-purple-400 hover:cursor-pointer">
          ← Back to Blog page
        </p>
      </Link>
=======
      <div className="mb-12 md:mb-4">
        <div className="w-full text-center border-b border-gray-500 md:border-none">
          <h1 className="mb-4">{frontmatter.title}</h1>
        </div>
      </div>
      <article className="flex flex-row prose break-words bg-gray-100 dark:bg-gray-900 max-w-none dark:prose-dark md:flex-col md:text-center">
        <div className="flex flex-col pr-12 mr-30 md:pr-0">
          <div className="border-b md:flex-row md:flex md:items-center md:justify-center md:border-none">
            <Image
              src={`/images/team/${frontmatter.pfp}`}
              width={60}
              height={60}
              alt="img"
              className="rounded-full"
            />
            <div className="md:ml-4">
              <p className="mt-2 mb-0">{frontmatter.author}</p>
              <Link href={frontmatter.social_link} passHref>
                <p className="mt-0 text-purple-400 duration-200 hover:text-pink-600 hover:cursor-pointer">
                  @{frontmatter.social}
                </p>
              </Link>
            </div>
          </div>
          <div className="border-b">
            <p className="my-8 md:my-4">Published {frontmatter.date}</p>
          </div>
          <Link href="/company/blog" passHref>
            <p className="inline mt-8 text-purple-400 duration-200 hover:cursor-pointer hover:text-pink-600">
              ← Back to Blog page
            </p>
          </Link>
        </div>
        <div className="w-8/12 text-left md:w-full">
          <Component />
        </div>
      </article>
>>>>>>> c2026aa50bb880249bdd9a70c7fa59f76a799264
    </>
  );
}

export const getStaticPaths = async () => {
  const slugs = await getAllSlugs(['company', 'blog']);

  return {
    paths: slugs.map((slug) => ({
      params: {
        post: slug.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { code, frontmatter } = await getPostBySlug(
    ['company', 'blog'],
    params.post
  );

  return {
    props: {
      code,
      frontmatter,
    },
  };
};

Post.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

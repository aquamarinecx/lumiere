import { useMemo } from 'react';
import Head from 'next/head';
import { getMDXComponent } from 'mdx-bundler/client';
import { getPostBySlug } from '@lib/mdxBundler';

export default function Terms({ code, frontmatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <Component />
    </>
  );
}

export const getStaticProps = async () => {
  const { code, frontmatter } = await getPostBySlug(
    ['company', 'legal'],
    'terms'
  );

  return {
    props: {
      code,
      frontmatter,
    },
  };
};

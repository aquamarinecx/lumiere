import { useMemo } from 'react';
import Head from 'next/head';
import { getMDXComponent } from 'mdx-bundler/client';
import { getPostBySlug } from '@lib/mdxBundler';

export default function CLA({ code, frontmatter }) {
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
    'cla'
  );

  return {
    props: {
      code,
      frontmatter,
    },
  };
};

import { useEffect, useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllSlugs, getPostBySlug } from '@lib/xdm';

export default function Post({ code, frontmatter }) {
  useEffect(() => console.log(frontmatter), [frontmatter]);

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <Component />;
}

export const getStaticPaths = async () => {
  const slugs = await getAllSlugs('blog');
  console.log(slugs);

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
  const { code, frontmatter } = await getPostBySlug('blog', params.post);

  return {
    props: {
      code,
      frontmatter,
    },
  };
};

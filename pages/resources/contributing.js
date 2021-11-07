import { useMemo, useEffect } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getPostBySlug } from '@lib/mdx-bundler';

export default function Contributing({ code, frontmatter }) {
  useEffect(() => console.log(frontmatter), [frontmatter]);

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <Component />;
}

export const getStaticProps = async () => {
  const { code, frontmatter } = await getPostBySlug('contributing', 'index');

  return {
    props: {
      code,
      frontmatter,
    },
  };
};

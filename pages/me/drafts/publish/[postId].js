import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@components/layouts/Layout';

export default function Publish({ post }) {
  return (
    <>
      <h1>hello</h1>
    </>
  );
}

Publish.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

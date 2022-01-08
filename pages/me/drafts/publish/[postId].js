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

export const getServerSideProps = async ({ params }) => {
  const id = params.postId;
};

Publish.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

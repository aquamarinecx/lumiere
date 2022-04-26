import Head from 'next/head';
import Layout from '@components/layouts/Layout';

export default function Query({ posts }) {
  return (
    <>
      <Head>
        <title>Tags — Lumiere</title>
      </Head>

      <>

      </>

    </>
  );
}



Query.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
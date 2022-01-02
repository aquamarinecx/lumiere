import Layout from '@components/layouts/Layout';
import Head from 'next/head';

export default function Statistics() {
  return (
    <>
      <Head>
        <title>Statistics - Lumiere</title>
      </Head>
      <h1>Statistics</h1>
    </>
  );
}

Statistics.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

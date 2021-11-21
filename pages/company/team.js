import Head from 'next/head';
import Link from 'next/link';
import Layout from '@components/layouts/Layout';

export default function Team() {
  return (
    <div>
      <h1>Team</h1>
    </div>
  );
}

Team.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

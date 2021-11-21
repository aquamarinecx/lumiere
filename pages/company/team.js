import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@components/layouts/Layout';

const members = [{}];

export default function Team() {
  return (
    <>
      <Head>
        <title>Team - Lumiere</title>
      </Head>

      <h1 className="mb-2 text-gray-100 heading-primary">Team</h1>
      <p className="mb-12 text-gray-300 text-md">
        Thanks to all our amazing team members for making Lumiere possible!
      </p>
      <section className="grid grid-cols-3">
        <div>
          <Image
            src="/images/team/warren.png"
            alt="warren"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
      </section>
    </>
  );
}

Team.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

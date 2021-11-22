import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@components/layouts/Layout';

const members = [
  {
    name: 'Warren',
    pfp: 'warren.png',
    desc: "Hey! I'm a 15 year old developer from New York! I'm heavily interested in web development and neuroscience!",
  },
  {
    name: 'Warren',
    pfp: 'warren.png',
    desc: '15 y/o from new york!! currently suffering from school D: massive code nerd, also very interested in neuroscience joined hack club in june second most inconsistent sleep schedule known to mankind',
  },
];

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
      <section className="grid grid-cols-2 gap-40">
        {members.map((mem, i) => (
          <div
            className="p-12 bg-gray-800 border border-gray-800 rounded-lg"
            key={i}
          >
            <Image
              src={`/images/team/${mem.pfp}`}
              alt="warren"
              width={200}
              height={200}
              className="inline rounded-full"
            />
            <div className="mt-8">
              <h2 className="inline">{mem.name}</h2>
              <p className="">{mem.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

Team.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

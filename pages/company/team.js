import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@components/layouts/Layout';
import { BsGithub } from 'react-icons/bs';

const members = [
  {
    name: 'Warren',
    pfp: 'warren.png',
    desc: "Hey! I'm a 15 year old developer from New York! I'm heavily interested in web development and neuroscience!",
    github: 'https://github.com/NebuDev14',
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
            className="p-12 duration-200 bg-gray-800 border border-gray-800 rounded-3xl hover:border-pink-500"
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
              <p className="mt-8 text-gray-400">{mem.desc}</p>
            </div>
            <div className="mt-6">
              <Link href={mem.github} passHref>
                <BsGithub
                  size={35}
                  className="duration-200 hover:cursor-pointer hover:text-pink-600"
                />
              </Link>
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

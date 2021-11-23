import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@components/layouts/Layout';
import { BsGithub } from 'react-icons/bs';

const members = [
  {
    name: 'Anthony',
    pfp: 'anthony.jpg',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad miniLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini',
    github: 'https://github.com/AnthonyKuang',
    pos: 'CEO',
  },
  {
    name: 'Arash',
    pfp: 'arash.jpg',
    desc: 'Arash is a student developer from Singapore passionate about delivering simple, efficient, and easy-to-use creations of technology. He contributes from time to time, and is particularly interested in the open-source scene.',
    github: 'https://github.com/arashnrim',
    pos: 'Open Source Lead',
  },
  {
    name: 'Arav',
    pfp: 'arav.jpg',
    desc: 'Arav is 14 years old; He is the founder of Creator notes, where he hosts boostrappers, founders & creators. Arav loves Growth, and joined Lumiere to get a chance to learn by experimenting.',
    github: 'https://twiter.com/heyarav',
    pos: 'Growth',
  },
  {
    name: 'Warren',
    pfp: 'warren.png',
    desc: "Hey! I'm a 15 year old developer from New York! I'm heavily interested in web development and neuroscience!",
    github: 'https://github.com/NebuDev14',
    pos: 'Developer',
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
      <section className="grid grid-cols-2 gap-8 md:grid-cols-1">
        {members.map((mem, i) => (
          <div
            className="p-12 duration-200 bg-gray-800 border border-gray-800 rounded-3xl hover:border-pink-500 md:p-8"
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
              <h3 className="mt-2 text-lg text-gray-400">{mem.pos}</h3>
              <div className="mt-4">
                <Link href={mem.github} passHref>
                  <BsGithub
                    size={35}
                    className="duration-200 hover:cursor-pointer hover:text-pink-600"
                  />
                </Link>
              </div>
              <p className="mt-8 text-gray-400">{mem.desc}</p>
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

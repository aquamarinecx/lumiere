import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@components/layouts/Layout';
import { BsGithub } from 'react-icons/bs';

const members = [
  {
    name: 'Anthony',
    pfp: 'anthony.jpg',
    desc: "Anthony is a 17 year old developer from California. He's passionate about SaaS tooling, startups, and the latest full-stack developments! He's currently interning at Instatus, and leading the Lumiere team.",
    github: 'https://github.com/AnthonyKuang',
    pos: 'Director, Dev Lead',
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
    github: 'https://twitter.com/heyarav',
    pos: 'Head of Growth',
  },
  {
    name: 'Warren',
    pfp: 'warren.png',
    desc: "Warren is a 15 year old developer residing in New York. He loves all things web development, and has a great interest in learning things related to technology and science. Currently, he's learning data analysis, web development technologies, neuroscience, and more!",
    github: 'https://github.com/NebuDev14',
    pos: 'Product Manager',
  },
  {
    name: 'Luck',
    pfp: 'luck.jpg',
    desc: 'Luck is a 17 year old from California. He is passionate about developing performant applications, skilled in creating, and experimenting with self-improvement.',
    github: '',
    pos: 'Cofounder, Head of DevRel',
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

import { getProviders, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import { useRouter } from 'next/router';

export default function Authenticate({ providers }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    if (session.user.username) {
      router.push(router.query.callbackUrl);
    } else {
      router.push({
        pathname: '/me/settings/username',
        query: { callbackUrl: router.query.callbackUrl },
      });
    }

    return null;
  }

  if (status === 'loading') {
    return null;
  }

  return (
    <>
      <Head>
        <title>Authenticate</title>
      </Head>

      <div className="grid h-screen place-items-center">
        <div className="absolute top-5 left-6">
          <Link href="/">
            <a>
              <figure className="relative w-14 h-14">
                <Image
                  src={projectLumiere}
                  alt="Project Lumiere logo"
                  layout="fill"
                  objectFit="contain"
                />
              </figure>
            </a>
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75" />
          <section className="relative max-w-3xl py-4 bg-gray-900 rounded-lg px-7">
            {Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="block"
              >
                <p>Sign in with {provider.name}</p>
              </button>
            ))}
          </section>
        </div>
        {router.query.error && (
          <div>
            That email is already taken. Did you sign up with the other social
            provider?
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

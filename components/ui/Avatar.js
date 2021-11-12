import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Avatar({ renderPosition, pageType }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Menu as="div" className={pageType !== 'editor' && 'md:hidden'}>
      <Menu.Button className="flex cursor-pointer">
        <div className="p-0.5 bg-gradient-to-tr from-amber-500 to-fuchsia-700 rounded-full hover:opacity-80 transition-opacity duration-200">
          <div className="p-0.5 bg-gray-900 rounded-full">
            <figure className="relative w-10 h-10 lg:w-9 lg:h-9">
              <Image
                src={session.user.image}
                alt={`Picture of ${session.user.name}`}
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
            </figure>
          </div>
        </div>
      </Menu.Button>

      <Menu.Items
        as="div"
        className={`${
          renderPosition === 'container' ? 'left-4' : '-left-2'
        } absolute w-full bottom-0 z-10`}
      >
        <div
          className={`${
            renderPosition === 'container' && 'container'
          } relative`}
        >
          <Menu.Item
            as="div"
            className={`absolute ${
              renderPosition === 'container'
                ? 'right-12 bg-opacity-100 dark:bg-opacity-95 xl:right-8'
                : 'right-4'
            } top-0.25 rounded-b-lg bg-gray-800 border-b border-l border-r border-gray-700`}
          >
            <div className="flex items-center justify-between py-5 border-b border-gray-700 px-7">
              <div className="p-0.5 bg-gradient-to-tr from-amber-500 to-fuchsia-700 rounded-full">
                <div className="p-0.5 bg-gray-900 rounded-full">
                  <figure className="relative w-8 h-8">
                    <Image
                      src={session.user.image}
                      alt={`Picture of ${session.user.name}`}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </figure>
                </div>
              </div>
              <div className="ml-4">
                <p className="inline-block font-medium text-gray-300 cursor-default">
                  {session.user.username}
                </p>
                <p className="block text-sm cursor-default">
                  {session.user.email}
                </p>
              </div>
            </div>
            <div className="my-4">
              <Link href="/editor">
                <a className="block py-2 font-normal text-gray-400 transition-colors duration-200 px-7 hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70">
                  New Publication
                </a>
              </Link>
              <Link href="/me/drafts">
                <a className="block py-2 font-normal text-gray-400 transition-colors duration-200 px-7 hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70">
                  Drafts
                </a>
              </Link>
              <Link href="/me/publications">
                <a className="block py-2 font-normal text-gray-400 transition-colors duration-200 px-7 hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70">
                  Publications
                </a>
              </Link>
            </div>
            <div className="pt-4 mb-4 border-t border-gray-700">
              <Link href="/me/statistics">
                <a className="block py-2 font-normal text-gray-400 transition-colors duration-200 px-7 hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70 beta">
                  Statistics
                </a>
              </Link>
              <Link href="/me/settings">
                <a className="block py-2 font-normal text-gray-400 transition-colors duration-200 px-7 hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70">
                  Settings
                </a>
              </Link>
            </div>
            {mounted && (
              <div className="pt-4 mb-4 border-t border-gray-700">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-2 font-normal text-gray-400 transition-colors duration-200 px-7 hover:text-gray-300 hover:bg-gray-700 hover:bg-opacity-70"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  <p>Theme</p>
                  {theme === 'light' ? <FiSun /> : <FiMoon />}
                </button>
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="button"
                className="block w-full py-4 text-sm text-gray-200 transition-colors duration-200 bg-gray-700 hover:bg-gray-600 rounded-b-md"
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
              >
                Sign out
              </button>
            </div>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}

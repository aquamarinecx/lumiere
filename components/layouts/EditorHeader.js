import Avatar from '@components/ui/Avatar';
import projectLumiere from '@public/images/logos/ProjectLumiere.svg';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FiChevronUp } from 'react-icons/fi';

const EditorHeader = ({ collapsed, setCollapsed, state }) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const router = useRouter();
  const titleInput = useRef(null);

  const saveDraft = async () => {
    const content = state.value;
    try {
      const body = { title, content, slug };
      await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  const showUntitledError = () => {
    titleInput.current.focus();
    toast.error('You must set a title to your publication before saving.');
  };

  return (
    <>
      <header
        className={`relative h-18 lg:h-16 transition-transform origin-top ${
          collapsed ? 'scale-y-0' : 'scale-y-1'
        } flex items-center border-b border-gray-700 bg-gray-900 px-6`}
      >
        <div className="flex items-center">
          <Link href="/">
            <a>
              <figure className="relative w-10 h-10 mb-1 lg:w-9 lg:h-9">
                <Image
                  src={projectLumiere}
                  alt="Project Lumiere logo"
                  layout="fill"
                  objectFit="contain"
                />
              </figure>
            </a>
          </Link>
          {setTitle ? (
            <input
              type="text"
              placeholder="Untitled"
              value={title}
              ref={titleInput}
              className={`rounded-lg bg-transparent text-xl lg:text-lg ml-3 py-2 lg:py-1.5 px-4 w-96 md:w-72 sm:w-48 border-none hover:bg-gray-800 transition-colors text-gray-300 focus:outline-none focus:ring-2 ${
                title ? 'focus:ring-blue-600' : 'focus:ring-red-600'
              } placeholder-gray-500`}
              onClick={(e) => e.target.select()}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(
                  e.target.value
                    .replaceAll(/[`~!@#$%^&*()_+={}|[;:'"<>,./?]/g, '')
                    .replaceAll(' ', '-')
                    .toLowerCase()
                );
              }}
            />
          ) : (
            <input
              type="text"
              value={title}
              className="px-4 py-2 ml-3 text-xl text-gray-300 transition-colors bg-transparent rounded-lg cursor-not-allowed w-96 hover:bg-gray-800"
              disabled
            />
          )}
        </div>
        <div className="flex ml-auto">
          {session && (
            <button
              type="button"
              className="px-4 py-3 mr-5 text-xs button-tertiary lg:text-2xs"
              onClick={title ? saveDraft : showUntitledError}
            >
              Save draft
            </button>
          )}
          {session ? (
            <Avatar
              profileImageSrc={session.user.image}
              profileName={session.user.name}
              renderPosition="fullscreen"
              pageType="editor"
            />
          ) : (
            <button
              type="button"
              className="px-5 py-3 text-sm lg:text-xs button-primary lg:px-4 lg:py-2.5"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </header>
      <button
        type="button"
        className="absolute top-0 z-50 grid w-8 h-6 transition-all -translate-x-1/2 -translate-y-4 bg-gray-500 left-1/2 place-items-center rounded-b-md hover:rounded-b-full hover:translate-y-0"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FiChevronUp
          className={`w-5 h-5 text-gray-100 -mt-0.5 transition-transform ${
            collapsed && 'rotate-180'
          }`}
        />
      </button>
    </>
  );
};

export default EditorHeader;

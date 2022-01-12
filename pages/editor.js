import MDXEditor from '@components/editor/MDXEditor';
import EditorHeader from '@components/layouts/EditorHeader';
import { useXdm } from '@lib/xdm';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import toast, { Toaster } from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';

export default function Editor() {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();
  const isMobile = useMediaQuery({ maxWidth: 889 });

  const [state, setConfig] = useXdm({
    value: '',
  });

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  let previousIsMobile = usePrevious(isMobile);
  if (previousIsMobile === undefined) {
    previousIsMobile = isMobile;
  }

  useEffect(() => {
    if (isMobile !== previousIsMobile) {
      toast(
        () => (
          <span>
            It appears that your device width has changed. If the Editor appears
            to be broken, click{' '}
            <button
              type="button"
              className="underline"
              onClick={() => window.location.reload()}
            >
              here
            </button>{' '}
            to reload.{' '}
            <b>
              Be sure to {session ? 'save' : 'copy'} your draft to prevent
              anything from being lost.
            </b>
          </span>
        ),
        {
          duration: 10000,
        }
      );
    }
  }, [isMobile, previousIsMobile]);

  // NOTE: Remove when autosave is implemented
  useBeforeunload((event) => {
    if (session && state.value !== '') {
      event.preventDefault();
    }
  });

  return (
    <>
      <Head>
        <title>Editor — Lumiere</title>
      </Head>
      <EditorHeader
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        state={state}
      />
      <MDXEditor state={state} setConfig={setConfig} collapsed={collapsed} />
      <Toaster position="bottom-left" />
    </>
  );
}

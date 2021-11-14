import MDXEditor from '@components/editor/MDXEditor';
import EditorHeader from '@components/layouts/EditorHeader';
import { useXdm } from '@lib/xdm';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { Toaster } from 'react-hot-toast';

export default function Editor() {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();

  const [state, setConfig] = useXdm({
    value: '',
  });

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

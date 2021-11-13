import { memo, useCallback, useState, useRef, useEffect } from 'react';
import { VFileMessage } from 'vfile-message';
import CodeMirror from 'rodemirror';
import { basicSetup } from '@codemirror/basic-setup';
import { markdown as langMarkdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { ErrorBoundary } from 'react-error-boundary';
import Split from 'react-split';
import MDXComponents from '@components/editor/MDXComponents';
import { statistics } from 'vfile-statistics';
import { useMediaQuery } from 'react-responsive';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button type="button" onClick={resetErrorBoundary}>
      Try again
    </button>
  </div>
);

// eslint-disable-next-line react/display-name
const MemoizedCodeMirror = memo((props) => {
  const codeMirrorRef = useRef(null);

  useEffect(() => {
    codeMirrorRef.current.style.height = '100%';
    codeMirrorRef.current.children[0].style.height = '100%';
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CodeMirror {...props} ref={codeMirrorRef} />
    </ErrorBoundary>
  );
});

const FallbackComponent = ({ error }) => {
  const message = new VFileMessage(error);
  message.fatal = true;
  return (
    <pre>
      <code>{String(message)}</code>
    </pre>
  );
};

export default function Editor({ state, setConfig, collapsed }) {
  const [extensions, setExtensions] = useState([
    basicSetup,
    oneDark,
    keymap.of([indentWithTab]),
    langMarkdown(),
  ]);
  const [editorView, setEditorView] = useState(null);
  const onUpdate = useCallback(
    (v) => {
      if (v.docChanged) {
        setConfig({ ...state, value: String(v.state.doc) });
      }
    },
    [state, setConfig]
  );
  const stats = state.file ? statistics(state.file) : {};
  const isMobile = useMediaQuery({ maxWidth: 889 });

  return (
    <Split
      sizes={[50, 50]}
      minSize={0}
      gutterSize={10}
      dragInterval={1}
      snapOffset={30}
      direction={isMobile ? 'vertical' : 'horizontal'}
      className={`flex ${isMobile ? 'flex-col' : 'flex-row'} ${
        collapsed ? 'h-screen -mt-18 lg:-mt-16' : 'h-editor-lg lg:h-editor-sm'
      } overflow-y-hidden`}
    >
      <MemoizedCodeMirror
        value={state.value}
        extensions={extensions}
        onUpdate={onUpdate}
        onEditorViewChange={(view) => setEditorView(view)}
      />
      {/* <section>
         TODO: Restore tabs functionality
         <Tabs className="h-full">
          <TabPanel className="h-full">
            <MemoizedCodeMirror
              value={state.value}
              extensions={extensions}
              onUpdate={onUpdate}
              onEditorViewChange={(view) => setEditorView(view)}
            />
          </TabPanel>
          <TabPanel>
            <h1>These are the settings!</h1>
          </TabPanel>
          <TabList className="flex">
            <Tab>Editor</Tab>
            <Tab>Settings</Tab>
          </TabList>
        </Tabs>
      </section> */}

      <section className="flex-1 overflow-y-auto">
        {state.file && state.file.result ? (
          <article className="prose break-words bg-gray-100 dark:bg-gray-900 max-w-none dark:prose-dark">
            <div className="container py-12">
              <ErrorBoundary FallbackComponent={FallbackComponent}>
                {state.file.result({ components: MDXComponents })}
              </ErrorBoundary>
            </div>
          </article>
        ) : (
          stats.fatal && <div>{state.file.messages[0].message}</div>
        )}
      </section>
    </Split>
  );
}

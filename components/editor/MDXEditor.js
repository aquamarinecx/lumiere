import { memo, useCallback, useState, useRef, useEffect } from 'react';
import { VFileMessage } from 'vfile-message';
import CodeMirror from 'rodemirror';
import { basicSetup } from '@codemirror/basic-setup';
import { markdown as langMarkdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { tags, HighlightStyle } from '@codemirror/highlight';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { ErrorBoundary } from 'react-error-boundary';
import Split from 'react-split';
import MDXComponents from '@components/editor/MDXComponents';
import { statistics } from 'vfile-statistics';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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

// const baseTheme = EditorView.baseTheme({
//   '&light .cm-mySelector': { background: 'ghostwhite' },
// });
// const myTheme = EditorView.theme(
//   {
//     '&': {
//       color: 'white',
//       backgroundColor: '#034',
//     },
//     '.cm-content': {
//       caretColor: '#0e9',
//     },
//     '&.cm-focused .cm-cursor': {
//       borderLeftColor: '#0e9',
//     },
//     '&.cm-focused .cm-selectionBackground, ::selection': {
//       backgroundColor: '#074',
//     },
//     '.cm-gutters': {
//       backgroundColor: '#045',
//       color: '#ddd',
//       border: 'none',
//     },
//   },
//   { dark: true }
// );

// const myHighlightStyle = HighlightStyle.define([
//   { tag: tags.keyword, color: '#fff' },
//   { tag: tags.comment, color: '#fff', fontStyle: 'italic' },
// ]);

export default function Editor({ state, setConfig, collapsed }) {
  const [extensions, setExtensions] = useState([
    basicSetup,
    oneDark,
    keymap.of([indentWithTab]),
    langMarkdown(),
  ]);
  const [tab, setTab] = useState('editor');
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

  return (
    <Split
      sizes={[50, 50]}
      minSize={0}
      gutterSize={10}
      dragInterval={1}
      snapOffset={30}
      className={`flex ${
        collapsed ? 'h-screen -mt-18 lg:-mt-16' : 'h-editor-lg lg:h-editor-sm'
      } overflow-y-hidden`}
      gutter={(_, direction) => {
        const gutter = document.createElement('div');
        gutter.className = `gutter gutter-${direction}`;
        return gutter;
      }}
    >
      <section>
        <Tabs className="flex flex-col justify-between h-full">
          <div className="relative h-full">
            <TabPanel
              className={`absolute top-0 w-full h-full ${
                tab === 'editor' ? 'z-10' : 'z-0'
              }`}
            >
              <MemoizedCodeMirror
                value={state.value}
                extensions={extensions}
                onUpdate={onUpdate}
                onEditorViewChange={(view) => setEditorView(view)}
              />
            </TabPanel>
            <TabPanel
              className={`absolute container top-0 h-full break-words ${
                tab === 'settings' ? 'z-10' : 'z-0'
              }`}
            >
              <h2 className="mt-16">These are the settings!</h2>
              <button
                type="button"
                className="px-3 py-2 button-tertiary"
                onClick={() =>
                  setExtensions([...extensions, EditorView.lineWrapping])
                }
              >
                Turn line wrapping on
              </button>
              <button
                type="button"
                className="px-3 py-2 button-tertiary"
                onClick={() =>
                  setExtensions(
                    extensions.filter(
                      (extension) => extension !== EditorView.lineWrapping
                    )
                  )
                }
              >
                Turn line wrapping off
              </button>
            </TabPanel>
          </div>
          <TabList className="flex border-t border-gray-700">
            <Tab
              className="flex-1 text-center cursor-pointer hover:bg-gray-800"
              onClick={() => setTab('editor')}
            >
              Editor
            </Tab>
            <Tab
              className="flex-1 text-center cursor-pointer hover:bg-gray-800"
              onClick={() => setTab('settings')}
            >
              Settings
            </Tab>
          </TabList>
        </Tabs>
      </section>

      <section className="overflow-y-auto">
        {state.file && state.file.result ? (
          <article className="prose break-words bg-gray-100 dark:bg-gray-900 max-w-none dark:prose-dark">
            <div className="container py-12">
              <ErrorBoundary FallbackComponent={FallbackComponent}>
                {state.file.result({ components: MDXComponents })}
              </ErrorBoundary>
            </div>

            {/* See https://codemirror.net/6/examples/change/ for more about handling CodeMirror dispatches */}
            <button
              type="button"
              onClick={() => {
                if (!editorView) return;

                const { doc } = editorView.state;

                if (doc.length === 0) return;

                // remove last character
                editorView.dispatch({
                  changes: {
                    from: doc.length - 1,
                    to: doc.length,
                  },
                });
              }}
            >
              Click me to remove a character
            </button>
            <button
              type="button"
              className="block"
              onClick={() => {
                if (!editorView) return;

                const { doc } = editorView.state;

                if (doc.length === 0) return;

                // remove last character
                editorView.dispatch({
                  changes: {
                    from: doc.length,
                    insert: "\n\n<CodeSandbox id='wizardly-shockley-igxxg' />",
                  },
                });
              }}
            >
              Click me to add a CodeSandbox
            </button>
          </article>
        ) : (
          stats.fatal && <div>{state.file.messages[0].message}</div>
        )}
      </section>
    </Split>
  );
}

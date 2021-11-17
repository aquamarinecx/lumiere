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

const baseTheme = EditorView.baseTheme({
  '&light .cm-mySelector': { background: 'ghostwhite' },
});
const myTheme = EditorView.theme(
  {
    '&': {
      color: 'white',
      backgroundColor: '#034',
    },
    '.cm-content': {
      caretColor: '#0e9',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0e9',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#074',
    },
    '.cm-gutters': {
      backgroundColor: '#045',
      color: '#ddd',
      border: 'none',
    },
  },
  { dark: true }
);

const myHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: '#fff' },
  { tag: tags.comment, color: '#fff', fontStyle: 'italic' },
]);

// ALRIGHT so Editor component here => includes both the input and output

// So now as props, we have state: the outputted JSX from the MDX input on the left side, also setConfig from useXdm

export default function Editor({ state, setConfig, collapsed }) {
  const [extensions, setExtensions] = useState([
    // important
    basicSetup,
    keymap.of([indentWithTab]),
    langMarkdown(),
    // *the fun part is reading the codemirror documentation and seeing how tf to include an extension => i had no idea how to implement line wrapping until i looked into the typescript types
  ]);
  const [editorView, setEditorView] = useState(null); // Let's say we add a button that inserts a <CodeMirror /> component into the codemirror input => this is how we add code => dispatches https://codemirror.net/6/examples/change/

  // we will have a ui that users can click to find the react component they want. when they find the CODESANDBOX button they can press it and then it will insert code to the left side => \n(newline)<CodeSandbox />

  // editorView.dispatch is the method that allows us to do this

  // I'll add an example tomorrow morning for a dispatch method and turning on/off linewrapping codemirror extension!
  // :eyes:

  // omg thank u - with more people understanding it this implementation can be improved greatly! (altho already we are better than 99% of competitors :') let make that 150% better HAHAHA)
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
      {/* input
          alr so input first

          Okay, that's just the input section => this input is stored 
          no prob
          Tabs do not work atm => I want a separate tab for a settings portion where u can customize extensions
      */}
      <section>
        <Tabs className="h-full">
          <TabPanel className="h-full">
            <MemoizedCodeMirror
              value={state.value}
              extensions={extensions} // codemirror => codemirror extensions are things that determine how the editor looks, so i.e. line wrapping, theme, etc. // wait, so in the issue about the editor you made on github, to fix that we would have to tinker with the extensions then, right? Correct we would be using extensions and setExtensions
              onUpdate={onUpdate}
              onEditorViewChange={(view) => setEditorView(view)} // you can dispatch transactions (i.e. add a new line of content by pressing a button that calls a function)
            />
            {/* don't be scared by "memo" it basically means a component that renders less to gain performance optimization
              so CodeMirror component here => it uses a React wrapper called rodemirror https://github.com/sachinraja/rodemirror => codemirror 6 is really really new
            */}
          </TabPanel>
          <TabPanel>
            <h1>These are the settings!</h1>
          </TabPanel>
          <TabList className="flex">
            <Tab>Editor</Tab>
            <Tab>Settings</Tab>
          </TabList>
        </Tabs>
      </section>

      {/* output */}
      <section className="overflow-y-auto">
        {state.file && state.file.result ? (
          <article className="prose break-words bg-gray-100 dark:bg-gray-900 max-w-none dark:prose-dark">
            <div className="container py-12">
              <ErrorBoundary FallbackComponent={FallbackComponent}>
                {/* Calling this as a function rather than a Component is really important: the react diffing algorithm reloads a component everytime state changes, but it doesn't hard reload a function call - therefore things like iframes don't reload when it's called as a function - advanced but good to know! */}
                {state.file.result({ components: MDXComponents })}
                {/* The outputted JSX after compilation we call it as a function here but we can also do this: state.file.result is a react component */}
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

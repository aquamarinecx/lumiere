import { useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { VFile } from 'vfile';
import { VFileMessage } from 'vfile-message';
import { evaluate } from 'xdm';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkEmoji from 'remark-emoji';
import remarkHint from 'remark-hint';
import remarkMath from 'remark-math';
import rehypeWrap from 'rehype-wrap';
import rehypeTOC from '@jsdevtools/rehype-toc';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypePrismPlus from 'rehype-prism-plus';

export const useXdm = (defaults) => {
  // but basically it's storing the mdx input from before into the state
  const [state, setState] = useState({ ...defaults, file: null });

  // debouncing input to 0.5 seconds before compiling - if you notice, if you type in the editor, it takes 0.5 seconds for the output to generate & if you type a large section out, the compiling happens on your last keystroke => this results in performance gains because there's no need to compile a million times
  const { run: setConfig } = useDebounceFn(
    async (config) => {
      // uhhh vfile is a fancy way to store the mdx input state => virtual file format
      const file = new VFile(config.value);

      // evaluate is the actual function that compiles mdx input into JSX
      try {
        file.result = (
          await evaluate(file, {
            ...runtime,
            useDynamicImport: true,
            remarkPlugins: [
              remarkGfm,
              remarkUnwrapImages,
              remarkEmoji,
              remarkHint,
              remarkMath,
            ],
            rehypePlugins: [
              [rehypeWrap, { wrapper: 'main' }],
              rehypeSlug,
              [rehypeTOC, { position: 'afterend' }],
              rehypeKatex,
              rehypePrismPlus,
            ], // plugins that support syntax highlighting, table of contents, latex, a whole lot of other things :D
          })
        ).default;
      } catch (error) {
        const message =
          error instanceof VFileMessage ? error : new VFileMessage(error);

        if (!file.messages.includes(message)) {
          file.messages.push(message);
        }

        message.fatal = true; // if error, vfile then contains a fatal = true
      }

      setState({ ...config, file });
    },
    { leading: false, trailing: true, wait: 500 }
  );

  return [state, setConfig];

  // MOST IMPORTANT: useXdm returns the outputted JSX after compilation, setConfig function for turning on/off remark/rehype plugins
  // me too, but this explanation is really boring sorry :( :)
};

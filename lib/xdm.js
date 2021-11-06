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
import { remarkMdxCodeMeta } from 'remark-mdx-code-meta';
import rehypeWrap from 'rehype-wrap';
import rehypeTOC from '@jsdevtools/rehype-toc';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypePrism from '@mapbox/rehype-prism';

import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { bundleMDX } from 'mdx-bundler';

export const useXdm = (defaults) => {
  const [state, setState] = useState({ ...defaults, file: null });
  const { run: setConfig } = useDebounceFn(
    async (config) => {
      const file = new VFile(config.value);

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
              remarkMdxCodeMeta,
            ],
            rehypePlugins: [
              [rehypeWrap, { wrapper: 'main' }],
              rehypeSlug,
              [rehypeTOC, { position: 'afterend' }],
              rehypeKatex,
              rehypePrism,
            ],
          })
        ).default;
      } catch (error) {
        const message =
          error instanceof VFileMessage ? error : new VFileMessage(error);

        if (!file.messages.includes(message)) {
          file.messages.push(message);
        }

        message.fatal = true;
      }

      setState({ ...config, file });
    },
    { leading: false, trailing: true, wait: 500 }
  );

  return [state, setConfig];
};

export const getAllSlugs = async (directory) => {
  const postsPath = join(process.cwd(), 'posts', directory);
  const fileNames = readdirSync(postsPath);

  return fileNames;
};

export const getPostBySlug = async (directory, slug) => {
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    );
  }

  const mdxSource = readFileSync(
    join(process.cwd(), 'posts', directory, `${slug}.mdx`),
    'utf-8'
  ).trim();

  const { code, frontmatter } = await bundleMDX(mdxSource);

  return {
    code,
    frontmatter,
  };
};

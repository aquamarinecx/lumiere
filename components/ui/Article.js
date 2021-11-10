const Article = ({ children, placeholder, href, title }) => (
  <a href={href} title={title}>
    <article
      className={`flex flex-col w-full h-full ${
        placeholder ? 'items-center justify-center' : ''
      } p-5 border border-tertiary rounded-xl`}
    >
      {children}
    </article>
  </a>
);

export default Article;

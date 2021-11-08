export default function Figma({ title, height = 450, url }) {
  return (
    <iframe
      title={`figma-${title}`}
      height={height}
      style={{
        width: '100%',
      }}
      scrolling="no"
      src={url}
      frameBorder="no"
      allowFullScreen
    />
  );
}

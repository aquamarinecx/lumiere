import Layout from '@components/layouts/Layout';

export default function Blogs() {
  return (
    <div className="">
      <h1 className="text-gray-100 heading-primary">Lumiere Blogs</h1>
    </div>
  );
}

Blogs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

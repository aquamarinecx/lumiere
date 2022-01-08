import { useRouter } from 'next/router';
import { getTimeAndDate } from '@lib/utilities/formatDate';
import Link from 'next/link';
import { FaPen, FaClock } from 'react-icons/fa';
import Article from '@components/ui/Article';

export default function Post({ post }) {
  const router = useRouter();

  const publishPost = async (slug) => {
    try {
      const body = { slug };
      await fetch('/api/post/publish', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (slug) => {
    try {
      const body = { slug };
      await fetch('/api/post/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/me/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  const addTag = async (slug) => {
    console.log("tag! you're it lmao loser");
  };

  return (
    <article>
      <Link href={`/me/drafts/${post.slug}`} passHref>
        <Article title={`Edit ${post.title}`}>
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <span className="text-base text-gray-500">
            <p className="flex items-center">
              <FaPen className="inline mr-2" />
              Created on {getTimeAndDate(post.createdAt)}
            </p>
            <p className="flex items-center">
              <FaClock className="inline mr-2" />
              Updated on {getTimeAndDate(post.updatedAt)}
            </p>
          </span>
        </Article>
      </Link>
      <div className="flex mt-2 space-x-2">
        <button
          type="button"
          className="p-2.5 button-tertiary"
          onClick={() => router.push(`/me/drafts/publish/${post.id}`)}
        >
          Publish
        </button>
        <button
          type="button"
          className="p-2.5 button-danger"
          onClick={() => deletePost(post.slug)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

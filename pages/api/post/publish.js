import { getSession } from 'next-auth/react';
import prisma from '@lib/prisma';

export default async function handle(req, res) {
  const session = await getSession({ req });
  const { slug, newTitle, description, tagList } = req.body;
  console.log(newTitle);
  const authorUsername = session.user.username;
  const result = await prisma.post.update({
    where: {
      authorUsername_slug: { authorUsername, slug },
    },
    data: {
      published: true,
      title: newTitle,
      desc: description,
      tags: tagList,
    },
  });
  res.json(result);
}

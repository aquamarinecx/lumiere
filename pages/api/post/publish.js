import { getSession } from 'next-auth/react';
import prisma from '@lib/prisma';

export default async function handle(req, res) {
  const session = await getSession({ req });
  const { slug, title, desc, tags } = req.body;
  console.log(title);
  const authorUsername = session.user.username;
  const result = await prisma.post.update({
    where: {
      authorUsername_slug: { authorUsername, slug },
    },
    data: {
      published: true,
      title,
      desc,
      tags,
    },
  });
  res.json(result);
}

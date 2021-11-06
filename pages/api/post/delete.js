import { getSession } from 'next-auth/react';
import prisma from '@lib/prisma';

export default async function handle(req, res) {
  const session = await getSession({ req });
  const { slug } = req.body;
  const authorUsername = session.user.username;

  const result = await prisma.post.delete({
    where: {
      authorUsername_slug: { authorUsername, slug },
    },
  });
  res.json(result);
}

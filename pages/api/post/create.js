import { getSession } from 'next-auth/react';
import prisma from '@lib/prisma';

export default async function handle(req, res) {
  const { title, content, slug } = req.body;
  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title,
      content,
      slug,
      author: { connect: { username: session.user.username } },
    },
  });
  res.json(result);
}

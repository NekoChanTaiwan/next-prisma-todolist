import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, description } = req.body

  try {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session?.user.id) throw new Error('User not found')

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: session.user.id,
      },
    })

    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({ error })
  }
}

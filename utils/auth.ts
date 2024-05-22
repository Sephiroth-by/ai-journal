import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'

export const getUserFromClerkID = async (select = { id: true }) => {
  const clerkUser = await currentUser()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: clerkUser!.id,
    },
    select,
  })

  return user
}

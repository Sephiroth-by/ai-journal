import React from 'react'
import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const clerkUser = await currentUser()
  const match = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser?.id,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: clerkUser!.id,
        email: clerkUser!.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/journal')
}

const Page = async () => {
  await createNewUser()
  return <div>... loading</div>
}

export default Page

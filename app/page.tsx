import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
  const user = await currentUser()
  let href = user ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Journal AI</h1>
        <p className="text-2xl text-white/60 mb-4">Track your mood with AI</p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

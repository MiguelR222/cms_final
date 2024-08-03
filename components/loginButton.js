import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <section className="bg-gray-50 min-h-screen">
          <nav className="flex justify-end items-center p-6 bg-white shadow-md">
            <div className="mr-4">
              <p className="font-bold text-blue-600">{session.user.name}</p>
              <p className="text-sm text-blue-400">{session.user.email}</p>
            </div>
            <button
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-400 focus:outline-none focus:ring active:bg-blue-400 transition transform hover:scale-105 hover:rotate-3"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </nav>
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-3xl font-extrabold sm:text-5xl text-blue-600">
              DesignHub CMS
                <strong className="font-extrabold text-blue-400 sm:block">
                  {" "}
                  Your Hub for Stunning Websites.{" "}
                </strong>
              </h1>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/template"
                  className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-400 focus:outline-none focus:ring active:bg-blue-400 sm:w-auto transition transform hover:scale-110"
                >
                  Template
                </Link>
                <Link
                  href="/dashboard"
                  className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-400 focus:outline-none focus:ring active:bg-blue-400 sm:w-auto transition transform hover:scale-110"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
  return (
    <>
      <section className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-blue-600">
            DesignHub CMS
              <strong className="font-extrabold text-blue-400 sm:block">
                {" "}
                Your Hub for Stunning Websites.{" "}
              </strong>
            </h1>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-400 focus:outline-none focus:ring active:bg-blue-400 sm:w-auto transition transform hover:scale-105 hover:rotate-3"
                onClick={() => signIn()}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
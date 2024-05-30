import { Link } from "react-router-dom"

// import { heroVieo} from "../../public/images/homeVidoe.mp4"
export function Hero() {
  return (
    <section className="w-full my-12 pt-12 md:pt-24 lg:pt-32">
      <div className="container space-y-10 xl:space-y-16  ">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Unlock the Power of the Web
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover a platform that empowers you to build, deploy, and scale exceptional web
                experiences with ease.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to="/"
              >
                Get Started
              </Link>
            </div>
          </div>

          <video
            id="backVideo"
            className="videoTag mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            autoPlay
            loop
            muted
            width={750}
            height={750}
          >
            <source src="../../public/images/mavic-3-pro.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}

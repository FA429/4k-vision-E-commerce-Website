// import { heroVieo} from "../../public/images/homeVidoe.mp4"
export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3x3 font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white mt-50">
                Capture Stunning Aerial Shots and Share Them With The World
              </h1>
            
            </div>
          </div>
          <div className="mx-auto w-full max-w-[500px] md:max-w-[600px]">
            <video
              className="absolute inset-0 z-[-1] h-3/4 w-full object-cover"
              style={{
                aspectRatio: "920/500",
                objectFit: "cover"
              }}
              width={920}
              src="../../public/images/homeVidoe.mp4"
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </div>
    </section>
  )
}

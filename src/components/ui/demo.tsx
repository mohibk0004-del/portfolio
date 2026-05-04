import { BlurFade } from "@/components/ui/blur-fade"
import { MatrixText } from "@/components/ui/matrix-text"
import { Waves } from "@/components/ui/wave-background"

export function BlurFadeTextDemo() {
  return (
    <section id="header">
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          Hello World 👋
        </h2>
      </BlurFade>
      <BlurFade delay={0.25 * 2} inView>
        <span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none">
          Nice to meet you
        </span>
      </BlurFade>
    </section>
  )
}

export function DemoMatrixText() {
  return (
    <MatrixText
      text="Kokonut UI"
      initialDelay={200}
      letterAnimationDuration={500}
      letterInterval={100}
    />
  )
}

export function WavesDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black">
      <div className="w-full flex flex-col items-center">
        <div className="w-full h-[1px] bg-white/80"></div>
        <div className="w-full aspect-video relative">
          <Waves className="h-full w-full" />
        </div>
        <div className="w-full h-[1px] bg-white/80"></div>
      </div>
    </div>
  )
}

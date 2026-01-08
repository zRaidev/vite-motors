import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const heroIntro = (canvasRef, containerRef, images) => {
  const canvas = canvasRef.current
  const context = canvas.getContext('2d')
  const frameContext = { frame: 0 }
  const totalFrames = images.length

  const renderFrame = (index) => {
    const img = images[Math.floor(index)]
    if (img && img.complete) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
  }

  gsap.to(frameContext, {
    frame: totalFrames - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      pinSpacing: false
    },
    onUpdate: () => {
      renderFrame(frameContext.frame)
    }
  })
}

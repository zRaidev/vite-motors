import { useRef, useEffect, useState } from 'react'
import { heroIntro } from '@/animations/hero'

// Importar todos los frames
const getFramePaths = () => {
  const frames = []
  for (let i = 1; i <= 121; i++) {
    const frameNumber = i.toString().padStart(4, '0')
    const ext = [1, 2, 3, 6, 12, 14, 15, 16, 17, 28, 29].includes(i) ? 'webp' : 'png'
    frames.push(new URL(`../assets/hero/frame_${frameNumber}.${ext}`, import.meta.url).href)
  }
  return frames
}

function Hero () {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const imagesRef = useRef([])

  useEffect(() => {
    const framePaths = getFramePaths()
    let loadedCount = 0

    // Precargar todas las imágenes
    const images = framePaths.map((path, index) => {
      const img = new Image()
      img.src = path
      img.onload = () => {
        loadedCount++
        if (loadedCount === framePaths.length) {
          setImagesLoaded(true)
        }
      }
      return img
    })

    imagesRef.current = images
  }, [])

  useEffect(() => {
    if (imagesLoaded && canvasRef.current && containerRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      // Configurar el tamaño del canvas
      const setCanvasSize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      setCanvasSize()
      window.addEventListener('resize', setCanvasSize)

      // Dibujar el primer frame
      if (imagesRef.current[0]) {
        context.drawImage(imagesRef.current[0], 0, 0, canvas.width, canvas.height)
      }

      // Iniciar animación
      heroIntro(canvasRef, containerRef, imagesRef.current)

      return () => window.removeEventListener('resize', setCanvasSize)
    }
  }, [imagesLoaded])

  return (
    <section ref={containerRef} className='hero h-screen relative overflow-hidden'>
      <canvas
        ref={canvasRef}
        className='w-full h-full object-cover'
      />
    </section>
  )
}

export default Hero

import { useGSAP as gsapHook } from '@gsap/react'

export const useGsap = (animationCallback, deps = [], scopeRef = null) => {
  gsapHook(
    () => {
      animationCallback()
    },
    { dependencies: deps, scope: scopeRef }
  )
}

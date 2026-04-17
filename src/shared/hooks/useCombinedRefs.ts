import type { MutableRefObject, Ref, RefCallback } from 'react'

const useCombinedRefs = <T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> => {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(node)
      } else {
        ;(ref as MutableRefObject<T | null>).current = node
      }
    })
  }
}

export default useCombinedRefs

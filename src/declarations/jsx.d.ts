import { HTMLAttributes } from 'vue'

global {
  declare namespace JSX {
    interface IntrinsicElements {
      [element: string]: any
    }
  }
}

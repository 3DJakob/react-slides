import React, { ReactNode } from 'react'
declare type CSSProperties = React.CSSProperties

declare interface SlideProps {
  /**
   * The content of the slide.
   */
  children?: ReactNode

  /**
   * Override styling of the slide.
  */
  style?: CSSProperties
}

declare const Slide: React.FC<SlideProps>
export default Slide

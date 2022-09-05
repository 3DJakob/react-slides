import React from 'react'
import Resizer from './Resizer'

export interface PresentationTheme {
  backgroundColor?: string
  textColor?: string
}

export interface PresentationProps {
  children: React.ReactNode
  style?: React.CSSProperties
  theme?: PresentationTheme
}

const Presentation: React.FC<PresentationProps> = ({ children, style, theme }) => {
  const sliderRef = React.createRef<HTMLDivElement>()
  const [dimesions, setDimensions] = React.useState({ width: 0, height: 0 })
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const numberOfSlides = React.Children.count(children)

  const currentSlideRef = React.useRef(currentSlide)

  const updateCurrentSlide = (data: number): void => {
    currentSlideRef.current = data
    setCurrentSlide(data)
  }

  React.useEffect(() => {
    const incrementSlide = (): void => {
      if (currentSlideRef.current < numberOfSlides - 1) {
        updateCurrentSlide(currentSlideRef.current + 1)
      }
    }

    const decrementSlide = (): void => {
      if (currentSlideRef.current > 0) {
        updateCurrentSlide(currentSlideRef.current - 1)
      }
    }

    const handleArrow = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowRight') {
        incrementSlide()
      }
      if (e.key === 'ArrowLeft') {
        decrementSlide()
      }
    }
    window.addEventListener('keydown', handleArrow)
    window.addEventListener('mouseClick', incrementSlide)

    return (): void => {
      window.removeEventListener('keydown', handleArrow)
      window.removeEventListener('mouseClick', incrementSlide)
    }
  }, [numberOfSlides])

  const SlideStyle: React.CSSProperties = {
    backgroundColor: theme?.backgroundColor,
    color: theme?.textColor,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const Slides = React.Children.map(children, (child) => <div style={{ ...dimesions, ...SlideStyle }}>{child}</div>)

  return (
    <Resizer onLayout={setDimensions} style={{ ...style, overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: numberOfSlides * dimesions.width,
          transition: '200ms transform',
          transform: `translateX(-${currentSlide * dimesions.width}px)`
        }} ref={sliderRef}
      >
        {Slides}
      </div>
    </Resizer>
  )
}

export default Presentation

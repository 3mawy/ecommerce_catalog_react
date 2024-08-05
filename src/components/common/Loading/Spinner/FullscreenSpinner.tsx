import cx from 'classnames'
import { CSSProperties } from 'react'

import { BaseSpinner, Props as BaseSpinnerProps } from './BaseSpinner'

export interface Props extends BaseSpinnerProps {
  styles?: CSSProperties
  className?: string
  zIndex?: number
}

export function FullscreenSpinner({
  zIndex,
  className,
  styles,
  ...props
}: Props) {
  return (
    <div
      style={{ zIndex, ...styles }}
      className={cx(
        'fixed w-screen h-screen overflow-hidden top-0 left-0 right-0 bottom-0',
        className,
      )}
    >
      <BaseSpinner {...props} />
    </div>
  )
}

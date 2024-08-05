import cx from 'classnames'

const sizesMain = {
  xsmall: 'w-6 h-6',
  small: 'w-12 h-12',
  default: 'w-16 h-16',
  large: 'w-20 h-20',
}

const sizesSub = {
  xsmall: 'w-5 h-5',
  small: 'w-11 h-11',
  default: 'w-14 h-14',
  large: 'w-16 h-16',
}
const sizeBorder = {
  xsmall: 'border-4',
  small: 'border-[0.375rem]',
  default: 'border-8',
  large: 'border-8',
}
export interface Props {
  classColor?: string
  className?: string
  size?: 'xsmall' | 'small' | 'default' | 'large'
  fullscreen?: boolean
}

export function BaseSpinner({
  className,
  size = 'default',
  classColor = '',
}: Props) {
  return (
    <div
      className={cx(
        'w-full h-full flex justify-center items-center',
        className,
      )}
    >
      <div className={cx('spinner', sizesMain[size])}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            className={cx(
              'border-transparent border-t-primary-900 rounded-full absolute block',
              classColor !== '' && classColor,
              sizesSub[size],
              sizeBorder[size],
            )}
            key={idx}
          ></div>
        ))}
      </div>
    </div>
  )
}

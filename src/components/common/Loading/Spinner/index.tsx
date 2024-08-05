import { FC } from 'react'

import * as Base from './BaseSpinner'
import * as Fullscreen from './FullscreenSpinner'

type Props = FC<Base.Props> & { Fullscreen: FC<Fullscreen.Props> }

const Spinner: Props = props => <Base.BaseSpinner {...props} />
Spinner.Fullscreen = Fullscreen.FullscreenSpinner

export { Spinner }

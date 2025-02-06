import React from 'react'

const IconNames = {
  logo: React.lazy(() => import('./assets/logo.svg?react')),
  checked: React.lazy(() => import('./assets/checked.svg?react')),
  unchecked: React.lazy(() => import('./assets/unchecked.svg?react')),
} as const

export type IconTypes = keyof typeof IconNames

interface Props extends React.SVGAttributes<SVGElement> {
  name: IconTypes
}

export function Icon(props: Props) {
  const { name, ...otherProps } = props

  const IconComponent = React.useMemo(
    () => IconNames[name] as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    [name],
  )

  if (!IconComponent) {
    return null
  }

  return (
    <React.Suspense fallback={null}>
      <IconComponent role="img" {...otherProps} />
    </React.Suspense>
  )
}

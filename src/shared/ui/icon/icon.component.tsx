import React from 'react'

const IconTypes = {
  unistory: React.lazy(() => import('./assets/unistory.svg?react')),
} as const

export type TIconTypes = keyof typeof IconTypes

export type IIconProps = React.SVGAttributes<SVGElement> & {
  name: TIconTypes
}

export function Icon(props: IIconProps) {
  const { name, ...otherProps } = props

  const IconComponent = React.useMemo(
    () => IconTypes[name] as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
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

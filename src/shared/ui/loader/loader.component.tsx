import clsx from 'clsx'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function Loader(props: Props) {
  const { className, ...otherProps } = props

  return (
    <svg
      className={clsx('animate-spin', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        d="M12 4.75V1.5"
        stroke="#4C60E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22.5V19.25"
        stroke="#4C60E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <path
        d="M19.25 12H22.5"
        stroke="#4C60E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
      <path
        d="M1.5 12H4.75"
        stroke="#4C60E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <path
        d="M17.1925 6.80761L19.4853 4.51482"
        stroke="#4C60E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.2"
      />
      <path
        d="M4.51471 19.4854L6.8075 17.1926"
        stroke="#4C60E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <path
        d="M17.1925 17.1926L19.4853 19.4854"
        stroke="#4C60E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      <path
        d="M4.51471 4.51482L6.8075 6.80761"
        stroke="#4C60E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  )
}

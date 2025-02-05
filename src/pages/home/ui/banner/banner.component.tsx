import clsx from 'clsx'

interface Props extends React.ComponentPropsWithoutRef<'section'> {}

export function Banner(props: Props) {
  const { className, ...otherProps } = props

  return (
    <section
      className={clsx(
        'relative flex h-56 flex-col justify-center overflow-hidden rounded-3xl bg-ui px-6 py-4',
        className,
      )}
      {...otherProps}
    >
      <h2 className="text-3xl font-bold">Best tool to your discord channel</h2>
      <p className="mt-4 max-w-[32.125rem] text-xl leading-loose">
        A platform for setting up a community manager for Discord, automating moderation,
        engagement, and member support.
      </p>
      <img
        src="/assets/banner.webp"
        srcSet="/assets/banner.webp 1x, /assets/banner@2x.webp 2x"
        alt="Banner"
        className="pointer-events-none absolute right-0 top-0 h-full"
      />
    </section>
  )
}

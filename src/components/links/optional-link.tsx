import Link from 'next/link'

export const OptionalLink = ({
  href,
  children,
  passhref,
}: {
  href?: string
  children: JSX.Element
  passhref?: boolean
}) => {
  if (href)
    return (
      <Link href={href} passHref={passhref}>
        {children}
      </Link>
    )
  return <div>{children}</div>
}
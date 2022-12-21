import Link from 'next/link'

export const OptionalLinkWrapper = ({
  href,
  children,
  passHref,
}: {
  href?: string
  children: JSX.Element
  passHref?: boolean
}) => {
  if (href)
    return (
      <Link href={href} passHref={passHref}>
        {children}
      </Link>
    )
  return <div>{children}</div>
}

import Link from 'next/link'

export const OptionalLinkWrapper = ({
  href,
  children,
}: {
  href?: string
  children: JSX.Element
}) => {
  if (href) return <Link href={href}>{children}</Link>
  return <div>{children}</div>
}

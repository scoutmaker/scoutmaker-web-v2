import { NextRouter } from 'next/router'

export function generateBreadcrumbs(router: NextRouter) {
  const asPathWithoutQuery = router.asPath.split('?')[0]

  const asPathNestedRoutes = asPathWithoutQuery
    .split('/')
    .filter(item => item.length !== 0)

  const crumblist = asPathNestedRoutes.map((path, idx) => {
    const href = `/${asPathNestedRoutes.slice(0, idx + 1).join('/')}`

    let title = path
    if (href.includes('/reports/') || href.includes('/notes/')) {
      if (title.includes('-')) title = title.slice(title.indexOf('-') + 1)
    }

    return { href, title }
  })

  return [{ href: '/dashboard', title: 'dashboard' }, ...crumblist]
}

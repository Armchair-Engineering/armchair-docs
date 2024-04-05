import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { navigation } from '@/lib/navigation'
import { Fragment } from 'react'

function NavigationLink({ link, onLinkClick, active, dot, target}) {
  return (
    <Link
      href={link.href}
      onClick={onLinkClick}
      target={target}
      className={clsx(
        'block w-full pl-3.5',
        active
          ? 'font-semibold text-sky-500'
          : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300',
        dot
          ? 'before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full'
          : '',
        active && dot ? 'before:bg-sky-500' : '',
      )}
    >
      {link.title}
    </Link>
  )
}

export function Navigation({ className, onLinkClick }) {
  let pathname = usePathname()

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {navigation.map((section) => (
          <li key={section.title}>
            <h2 className="font-display font-medium text-slate-900 dark:text-white">
              {section.title}
            </h2>
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
            >
              {section.links.map((link) => (
                <Fragment key={link.href}>
                  <li className="relative">
                    <NavigationLink
                      link={link}
                      onLinkClick={onLinkClick}
                      active={link.href === pathname}
                      dot={true}
                      target={link.target}
                    />
                  </li>
                  {link.links && link.links.length && pathname.startsWith(link.href) && (
                    <ul
                      role="list"
                      className="ml-4 mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
                    >
                      {link.links &&
                        link.links.map((sub) => (
                          <li key={sub.href}>
                            <NavigationLink
                              link={sub}
                              onLinkClick={onLinkClick}
                              active={sub.href === pathname}
                              dot={false}
                            />

                            {sub.links && sub.links.length && pathname.startsWith(sub.href) && (
                              <ul
                                role="list"
                                className="ml-4 mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
                              >
                                {sub.links &&
                                  sub.links.map((sub2) => (
                                    <li key={sub2.href}>
                                      <NavigationLink
                                        link={sub2}
                                        onLinkClick={onLinkClick}
                                        active={sub2.href === pathname}
                                        dot={false}
                                      />
                                    </li>
                                  ))}
                              </ul>
                            )}
                          </li>
                        ))}
                    </ul>
                  )}
                </Fragment>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

import { useGetSSOAuthProfile } from '@jenesei-software/jenesei-id-web-api'
import { useRemovePreviewLoader } from '@jenesei-software/jenesei-ui-react/area-preview'
import { ProviderApp } from '@jenesei-software/jenesei-ui-react/context-app'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useMemo } from 'react'

import { ProviderLanguage } from '@local/contexts/context-language'
import { useEnvironment } from '@local/hooks/use-environment'

export function LayoutRoot() {
  useRemovePreviewLoader()

  const { title, description, mode } = useEnvironment()

  const { isLoading } = useGetSSOAuthProfile({ retry: false })

  const visible = useMemo(() => !!isLoading, [isLoading])
  // const matchRoute = useMatchRoute()

  // const isMatchPrivate = !!matchRoute({ to: '/pr', fuzzy: true })
  // const isMatchPublic = !!matchRoute({ to: '/pu', fuzzy: true })

  // useEffect(() => {
  //   console.log('isMatchPrivate', isMatchPrivate)
  // }, [isMatchPrivate])
  // useEffect(() => {
  //   console.log('isMatchPublic', isMatchPublic)
  // }, [isMatchPublic])

  return (
    <>
      <ProviderLanguage>
        <ProviderApp
          defaultPreview={{ visible: visible }}
          defaultTitle={title}
          defaultBgColor="whiteStandard"
          defaultStatusBarColor="whiteStandard"
          defaultDescription={description}
          isScrollOutlet={true}
        >
          <Outlet />
        </ProviderApp>
      </ProviderLanguage>
      {(mode === 'dev' || mode == 'test') && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </>
  )
}

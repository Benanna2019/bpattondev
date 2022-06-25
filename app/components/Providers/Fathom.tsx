// import * as Fathom from 'fathom-client'
// //@ts-ignore
// import NProgress from 'nprogress'
// import { useTransition } from '@remix-run/react'
// import { useEffect } from 'react'

// const FATHOM_SITE_ID = process.env.NEXT_PUBLIC_FATHOM_SITE_ID ? process.env.NEXT_PUBLIC_FATHOM_SITE_ID : ''

// export function FathomProvider() {
//   const transition = useTransition()
//   useEffect(() => {
//     Fathom.load(FATHOM_SITE_ID, {
//       includedDomains: ['brianlovin.com'],
//       excludedDomains: ['vercel.app,localhost'],
//       url: process.env.NEXT_PUBLIC_FATHOM_CUSTOM_URL,
//       spa: 'auto',
//     })

//     function onRouteChangeComplete() {
//       Fathom.trackPageview()
//     }

//     if (transition.state === 'submitting') {
//       onRouteChangeComplete
//     }

//     return () => {
//       router.events.off('routeChangeComplete', onRouteChangeComplete)
//     }
//   }, [])

//   return null
// }

export default {};

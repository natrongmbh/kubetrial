import '../styles/globals.css'
import '../styles/fonts.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { UserContextProvider } from '../contexts/userContext'
import { ClusterInfoContextProvider } from '../contexts/clusterInfoContext'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UserContextProvider>
      <ClusterInfoContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClusterInfoContextProvider>
    </UserContextProvider>
  )
}

export default MyApp

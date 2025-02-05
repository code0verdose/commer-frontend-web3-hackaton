import { Layout } from '@widgets/layout'
import { Banner } from './ui'

export function HomePage() {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>
        <Banner className="mt-8" />
        <h1>Hello world</h1>
      </Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

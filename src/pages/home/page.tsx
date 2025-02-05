import { Layout } from '@widgets/layout'
import { Banner, BotsSection } from './ui'

export function HomePage() {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>
        <Banner className="mt-8" />
        <BotsSection className="mt-12" />
      </Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

import { SharedUi } from '@shared'
import { Layout } from '@widgets/layout'

export function HomePage() {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>
        <h1>Home page</h1>
        <SharedUi.Button className="border px-4 py-2">Test button</SharedUi.Button>
      </Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

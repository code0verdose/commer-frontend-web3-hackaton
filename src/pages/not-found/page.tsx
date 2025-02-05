import { SharedUi } from '@shared/index'
import { Layout } from '@widgets/layout'

export function NotFoundPage() {
  return (
    <Layout>
      <Layout.Main>
        <section className="flex h-dvh flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold">404 Page not found</h1>
            <p className="text-sm text-gray-500">
              The page you are looking for does not exist.
            </p>
            <SharedUi.Button
              className="w-fit rounded-xl border border-brand bg-[#1d1d1d] px-4 py-2 transition-colors hover:bg-brand/20 active:bg-brand"
              to="/"
            >
              Go back to home
            </SharedUi.Button>
          </div>
        </section>
      </Layout.Main>
    </Layout>
  )
}

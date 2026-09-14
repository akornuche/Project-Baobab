import dynamicImport from 'next/dynamic';

export const dynamic = 'force-dynamic';

const PageClient = dynamicImport(() => import('./page-client'), { ssr: true });

export default function Page({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  return <PageClient searchParams={searchParams} />;
}

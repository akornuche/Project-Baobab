import dynamic from 'next/dynamic';

export const dynamic = 'force-dynamic';

const AdminGuidesClient = dynamic(() => import('./page-client'), { ssr: true });

export default function AdminGuidesPage() {
  return <AdminGuidesClient />;
}

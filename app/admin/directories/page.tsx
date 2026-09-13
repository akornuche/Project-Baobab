import dynamic from 'next/dynamic';

export const dynamic = 'force-dynamic';

const AdminDirectoriesClient = dynamic(() => import('./page-client'), { ssr: true });

export default function AdminDirectoriesPage() {
  return <AdminDirectoriesClient />;
}

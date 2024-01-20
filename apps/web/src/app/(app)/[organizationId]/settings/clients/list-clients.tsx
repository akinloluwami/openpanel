'use client';

import { StickyBelowHeader } from '@/app/(app)/layout-sticky-below-header';
import { columns } from '@/components/clients/table';
import { ContentHeader } from '@/components/Content';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { pushModal } from '@/modals';
import type { getClientsByOrganizationId } from '@/server/services/clients.service';
import { KeySquareIcon, PlusIcon } from 'lucide-react';
import { useParams } from 'next/navigation';

interface ListClientsProps {
  clients: Awaited<ReturnType<typeof getClientsByOrganizationId>>;
}
export default function ListClients({ clients }: ListClientsProps) {
  const organizationId = useParams().organizationId as string;

  return (
    <>
      <StickyBelowHeader>
        <div className="p-4 flex items-center justify-between">
          <div />
          <Button
            icon={PlusIcon}
            onClick={() => pushModal('AddClient', { organizationId })}
          >
            <span className="max-sm:hidden">Create client</span>
            <span className="sm:hidden">Client</span>
          </Button>
        </div>
      </StickyBelowHeader>
      <div className="p-4">
        <DataTable data={clients} columns={columns} />
      </div>
    </>
  );
}

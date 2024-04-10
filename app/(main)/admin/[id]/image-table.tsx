'use client';

import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { columns } from './columns';
import { Image } from '@/lib/schema';
import { UploadButton } from './upload-button';
import Debug from '@/components/debug';

type Props = {
  albumId: number;
  data: Image[];
};
export function ImageTable({ albumId, data }: Props) {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <div className='flex items-center justify-between gap-4 py-4'>
        <Input
          type='search'
          placeholder='Sök'
          value={filter ?? ''}
          onChange={(event) => setFilter(event.target.value)}
          className='max-w-sm'
        ></Input>
        <UploadButton variant='outline' size='sm' albumId={albumId}>
          Ladda upp bilder
        </UploadButton>
      </div>
      <DataTable
        filter={filter}
        onFilterChange={setFilter}
        columns={columns}
        data={data}
        sortBy='taken_at'
        sortDesc={true}
      ></DataTable>
    </div>
  );
}

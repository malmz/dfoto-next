'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Album } from '@/lib/data/albums';
import { Column, ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  ArrowUpDown,
  Check,
  Link as LinkIcon,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

const cb = createColumnHelper<Album>();

function SortButton<TData, TValue>({
  column,
  children,
}: {
  column: Column<TData, TValue>;
  children: React.ReactNode;
}) {
  return (
    <Button
      className='-ml-4'
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
    >
      {children} <ArrowUpDown className='ml-2 h-4 w-4'></ArrowUpDown>
    </Button>
  );
}

function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Öppna meny</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem>
          <Check className='mr-2 h-4 w-4'></Check>
          <span>Publicera</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LinkIcon className='mr-2 h-4 w-4'></LinkIcon>
          <span>Kopiera länk</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='text-destructive'>
          <Trash2 className='mr-2 h-4 w-4'></Trash2>
          <span>Ta bort</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns = [
  cb.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      ></Checkbox>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  cb.accessor('name', {
    header: 'Namn',
    cell: (info) => (
      <Link
        className='font-medium underline underline-offset-4'
        href={`/admin/${info.row.original._id}`}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  cb.accessor('description', {
    header: 'Beskrivning',
  }),
  cb.accessor('published', {
    header: ({ column }) => <SortButton column={column}>Status</SortButton>,
    cell: (info) => (info.getValue() ? 'Published' : 'Draft'),
  }),
  cb.accessor('shootDate', {
    header: 'Skapad',
    cell: (info) => (
      <span className='text-nowrap'>
        {format(info.getValue(), 'yyyy-MM-dd')}
      </span>
    ),
  }),
  cb.display({
    id: 'actions',
    cell: (info) => <RowActions></RowActions>,
    enableSorting: false,
    enableHiding: false,
  }),

  /* cb.accessor(
    (row) =>
      row.serviceSubType ? `${row.type}-${row.serviceSubType}` : `${row.type}`,
    {
      id: 'type',
      header: ({ column }) => <SortButton column={column}>Type</SortButton>,
      cell: (info) => <JobTypeIcon type={info.getValue()}></JobTypeIcon>,
      maxSize: 48,
    },
  ),
  cb.accessor('name', {
    header: ({ column }) => <SortButton column={column}>Name</SortButton>,
  }),
  cb.accessor('column1', { header: 'Debug' }),
  cb.accessor('lastStart', {
    header: ({ column }) => <SortButton column={column}>Last Start</SortButton>,
    cell: (info) =>
      info.getValue()
        ? formatDistance(new Date(info.getValue()), new Date())
        : '',
  }),
  cb.accessor('column4', { header: 'Gateway' }), */
] satisfies ColumnDef<Album, any>[];

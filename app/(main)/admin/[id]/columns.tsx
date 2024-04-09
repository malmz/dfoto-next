'use client';

import { SortButton } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
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
import { Album, Image } from '@/lib/schema';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Check, Link as LinkIcon, MoreHorizontal, Trash2 } from 'lucide-react';
import Link from 'next/link';

type ItemType = Image;
const cb = createColumnHelper<ItemType>();

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
  cb.accessor('id', {
    header: 'Id',
    cell: (info) => (
      <Link className='font-medium underline underline-offset-4' href={''}>
        {info.getValue()}
      </Link>
    ),
  }),
  cb.display({
    id: 'actions',
    cell: (info) => <RowActions></RowActions>,
    enableSorting: false,
    enableHiding: false,
  }),
] satisfies ColumnDef<ItemType, any>[];

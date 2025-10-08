'use client'

import { ColumnDef } from '@tanstack/react-table'

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const data: Payment[] = [
  {
    id: 'cdbyu493',
    amount: 300,
    status: 'success',
    email: 'trololo@example.com',
  },
  {
    id: 'a1b2c3d4',
    amount: 120,
    status: 'processing',
    email: 'alice@example.com',
  },
  {
    id: 'z9y8x7w6',
    amount: 45,
    status: 'pending',
    email: 'bob@example.com',
  },
]

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: (info) => `$${info.getValue<number>()}`,
  },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'email', header: 'Email' },
]

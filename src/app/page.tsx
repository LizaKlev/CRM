import { DataTable } from '../lib/components/payments/data-table'
import { columns, Payment } from '@/lib/components/payments/columns'
// import { Payment } from '@/lib/components/sampleData'

import paymentsData from '@/lib/components/payments/payments.json'

export default async function DemoPage() {
  const data = paymentsData as Payment[]

  return (
    <div className='container flex flex-col mx-auto py-10 '>
      <DataTable columns={columns} data={data} />
    </div>
  )
}



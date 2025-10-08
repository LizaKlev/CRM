import { DataTable } from '../lib/components/payments/data-table'
import { columns, Payment } from '@/lib/components/payments/columns'
// import { Payment } from '@/lib/components/sampleData'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: 'cdbyu493',
      amount: 300,
      status: 'success',
      email: 'trololo.com',
    },
    {
      id: 'kjhgfr56',
      amount: 900,
      status: 'success',
      email: 'tro.com',
    },
    {
      id: 'fr567u',
      amount: 590,
      status: 'success',
      email: 'tlo.com',
    },
    {
      id: ',639dbf',
      amount: 400,
      status: 'success',
      email: 'olo.com',
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className='container flex flex-col mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

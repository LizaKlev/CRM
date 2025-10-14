// import { Donut } from 'lucide-react'
import { ChartBarInteractive } from '@/lib/components/ui/ChartBarInteractive'
import { Donut } from '@/lib/components/ui/Donut'
import { ChartLine } from '@/lib/components/ui/ChartLine'
import Selectors from '@/lib/components/ui/Selectors'
import { TableDemo } from '@/lib/components/Table'
import { IncomeSampleData } from '@/lib/components/sampleData'
import MapComponent from '@/lib/components/map/mapComponent'
import { Tabs, TabsList, TabsTrigger } from '@/lib/components/ui/Tabs'

const totalConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-total)' },
}
const greenConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-green)' },
}
const redConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-red)' },
}

export default function Home() {
  return (
    <div className='flex flex-col m-8 p-4 gap-[18px] rounded-xl'>
      <Selectors />

      <div className='flex bg-card md:flex-row flex-col border justify-between border-border p-5 rounded-xl'>
        <div className='md:w-1/2'>
          <Donut />
        </div>
        <div className='md:w-1/2'>
          <TableDemo data={IncomeSampleData} />
        </div>
      </div>

      <div className='flex flex-col gap-[18px] w-full sm:flex-row'>
        <div className='flex-1 sm:w-1/3'>
          <ChartBarInteractive />
        </div>
        <div className='flex-[2] sm:w-2'>
          <ChartLine
            config={totalConfig}
            title='Earnings'
            textColor='#1ac097'
            value='$4500'
          />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-[18px] w-full '>
        <div className='flex-1/3'>
          <ChartLine
            config={greenConfig}
            title='Fastest growing product'
            textColor='#1ac097'
            value='Online course platform'
            change='+$1500'
          />
        </div>
        <div className='flex-1/3'>
          <ChartLine
            config={redConfig}
            title='Fastest falling product'
            textColor='#f6465d'
            value='Digital illustration pack'
            change='-$500'
          />
        </div>
        <div className='flex-1/3 h-full'>
          <MapComponent />
        </div>
      </div>
    </div>
  )
}

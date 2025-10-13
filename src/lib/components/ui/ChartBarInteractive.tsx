'use client'

// import { TrendingUp } from 'lucide-react'
import { Bar, BarChart } from 'recharts'

import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from '@/lib/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/lib/components/ui/chart'

export const description = 'A bar chart'

const chartData = [
  { product: 'January', desktop: 2500, fill: 'var(--chart-1)' },
  { product: 'February', desktop: 800, fill: 'var(--chart-5)' },
  { product: 'March', desktop: 600, fill: 'var(--chart-5)' },
  { product: 'April', desktop: 300, fill: 'var(--chart-5)' },
  { product: 'May', desktop: 200, fill: 'var(--chart-5)' },
  { product: 'June', desktop: 100, fill: 'var(--chart-5)' },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function ChartBarInteractive() {
  return (
    <Card className='h-full justify-between'>
      <CardContent className='flex flex-row justify-between gap-4 p-0 h-full sm:flex-col lg:flex-row'>
        <div className='flex flex-col lg:w-1/2 h-full justify-between'>
          <div className='flex flex-col gap-0'>
            <p className='text-xs text-foreground'>Best performers</p>
            <p className='font-bold text-[16px] text-foreground'>Figma</p>
          </div>

          <div className='flex flex-col gap-0'>
            <p className='text-2xl font-bold text-foreground'>$2,500</p>
            <div className='flex flex-row'>
              <p className='text-chart-green font-bold text-xs'>+$500</p>
              <p className='text-chart-green text-xs'>(20%)</p>
            </div>
            <p className='text-[10px] text-muted-foreground'>
              VS previous month
            </p>
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className='lg:w-1/2 flex items-end'
          // style={{ height: 196 }}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            height={196}
            style={{ width: '100%' }}
            barCategoryGap={14} // spacing between bars
            barGap={14} // gap between bars
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey='desktop'
              fill='var(--chart-1)'
              radius={8}
              barSize={8} // set bar width to 8px
              className=''
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  CardTitle,
} from '../ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

const defaultData = [
  { month: 'January', desktop: 186, October: 80 },
  { month: 'February', desktop: 305, October: 200 },
  { month: 'March', desktop: 237, October: 120 },
  { month: 'April', desktop: 73, October: 190 },
  { month: 'May', desktop: 209, October: 130 },
  { month: 'June', desktop: 214, October: 140 },
]

type ChartLineProps = {
  config: ChartConfig
  data?: typeof defaultData
  title?: string
  description?: string
}

export function ChartLine({
  config,
  data = defaultData,
  title = 'Line Chart',
  value = '',
  textColor = 'black',
  change = '+$1500', // Add a prop for the change value
}: ChartLineProps & { value?: string; textColor?: string; change?: string }) {
  return (
    <Card className='h-full flex justify-between'>
      <div className='flex flex-col'>
        <CardTitle className='text-xs text-foreground'>{title}</CardTitle>
        <div className='flex flex-col'>
          <p className='font-bold'>{value}</p>
          <div className='flex flex-row text-xs'>
            <p className='font-bold' style={{ color: textColor }}>
              {change}
            </p>
            <p style={{ color: textColor }}>(20%)</p>
          </div>
        </div>
      </div>
      {/* <CardDescription>{description}</CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={config}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: 2, right: 2 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey='October'
              type='monotone'
              stroke='var(--accent)'
              strokeWidth={1.5}
              dot={false}
              strokeOpacity={10}
            />
            {Object.entries(config).map(([key, { color }]) => (
              <Line
                key={key}
                dataKey={key}
                type='monotone'
                stroke={color}
                strokeWidth={1.5}
                dot={false}
                strokeOpacity={100}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

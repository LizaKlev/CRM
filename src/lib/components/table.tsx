'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/lib/components/ui/table'
import { IncomeData } from '@/lib/components/sampleData'
import { Tabs, TabsList, TabsTrigger } from './ui/Tabs'
import { useState } from 'react'

// ShowShare will have to be in the parent component's state, as it will manage
// the visual of both the table demo and the donut chart and show the
// data differently based on that state

// export function TableDemo({ data, showShare }: { data: IncomeData[], showShare: boolean }) {
export function TableDemo({ data }: { data: IncomeData[] }) {
  // Add a state for switching to shares & active
  const [{ active, showShare }, setState] = useState<{
    active: boolean
    showShare: boolean
  }>({
    active: true,
    showShare: false,
  })

  const filterData = () =>
    data.filter((d) => {
      return active ? d.isActive : true
    })

  const toggleShare = () => {
    setState((prev) => ({ ...prev, showShare: !prev.showShare }))
  }

  const toggleActive = () => {
    setState((prev) => ({ ...prev, active: !prev.active }))
  }

  const filteredData = filterData()

  return (
    <div className='flex flex-col'>
      <Tabs defaultValue='Show share' className='w-full'>
        <TabsList className='w-full h-8'>
          <TabsTrigger onClick={toggleShare} value='Show share'>
            {showShare ? 'Share' : 'Income'}
          </TabsTrigger>
          <TabsTrigger onClick={toggleShare} value='Show price'>
            {showShare ? 'Income' : 'Share'}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div
        className={`flex items-center space-x-2 mt-4 mb-1 ml-2 cursor-pointer select-none`}
        onClick={toggleActive}
        role='button'
        tabIndex={0}
        aria-pressed={active}
        style={{ opacity: active ? 1 : 0.5 }}
      >
        <span
          className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-colors ${
            active ? 'border-primary bg-accent' : 'border-muted bg-muted'
          }`}
        >
          {active && <span className='w-2 h-2 bg-chart-5 rounded-full ' />}
        </span>
        <span
          className={`text-xs text-card-foreground ${
            active ? '' : 'text-muted-foreground'
          }`}
        >
          Show active
        </span>
      </div>

      <Table>
        <TableBody>
          {filteredData.map((d) => (
            <TableRow key={d.name}>
              <TableCell>
                <div
                  className={`w-3 h-3 rounded-4xl ${
                    !active && !d.isActive ? 'bg-border' : 'bg-primary'
                  }`}
                />
              </TableCell>
              <TableCell>
                <div className='flex flex-col'>
                  <p className=' font-bold text-[16px]'>
                    {showShare ? `${d.share}%` : `$${d.price}`}
                  </p>
                  <p className='text-muted-foreground text-xs'>{d.name}</p>
                </div>
              </TableCell>
              <TableCell>
                <p className='text-muted-foreground text-[16px]'>
                  {showShare ? `$${d.price}` : `${d.share}%`}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

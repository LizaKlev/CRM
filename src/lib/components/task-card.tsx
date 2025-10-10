import React from 'react'
import Chip from './ui/chip'
import { Progress } from '@/lib/components/ui/progress'

type TitleProps = {
  title: string
  description: string
  progress: number
  children?: React.ReactNode
}

const TaskCard: React.FC<TitleProps> = (props) => {
  // const TaskCard = () => {
  return (
    <div className='flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <Chip>Design</Chip>
      <p>{props.title}</p>
      <p>{props.description}</p>
      <div className='flex flex-row justify-between'>
        <p>Progress</p>
        <p>{props.progress}</p>
      </div>
      <Progress value={33} />
    </div>
  )
}

export default TaskCard

import React from 'react'
import Chip from './ui/chip'
import { Progress } from '@/lib/components/ui/progress'
import { Calendar1Icon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/lib/components/ui/avatar'

type TitleProps = {
  title: string
  description: string
  progress: number
  date?: string
  children?: React.ReactNode
}

const TaskCard: React.FC<TitleProps> = (props) => {
  // const TaskCard = () => {
  return (
    <div className='flex w-full min-w-12 max-w-2xs flex-col p-4 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <Chip>Design</Chip>
      <p>{props.title}</p>
      <p>{props.description}</p>
      <div className='flex flex-row justify-between'>
        <p>Progress</p>
        <p>{props.progress}</p>
      </div>
      <Progress value={33} />
      <div className='flex flex-row items-center gap-2 text-sm mt-2'>
        <Calendar1Icon className='text-gray-400 w-4' />
        <p>{props.date}</p>
      </div>
      <div className='flex flex-row mt-4 gap-x-1.5'>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Chip>High</Chip>
      </div>
    </div>
  )
}

export default TaskCard

import React from 'react'
import Chip from './ui/chip'

const TaskCard = () => {
  return (
    <div className='flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <Chip>Design</Chip>
    </div>
  )
}

export default TaskCard

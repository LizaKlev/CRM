import React from 'react'

type ChipProps = {
  children: React.ReactNode
}

const Chip: React.FC<ChipProps> = (props) => {
  return (
    <div className='flex items-center px-3 py-1 rounded-sm bg-yellow-100 text-yellow-700 text-[10px] w-fit font-medium'>
      <p>{props.children}</p>
    </div>
  )
}

export default Chip

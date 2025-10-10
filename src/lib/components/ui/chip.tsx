import React from 'react'

type ChipProps = {
  children: React.ReactNode
}

const Chip: React.FC<ChipProps> = (props) => {
  return (
    <div>
      <p>{props.children}</p>
    </div>
  )
}

export default Chip

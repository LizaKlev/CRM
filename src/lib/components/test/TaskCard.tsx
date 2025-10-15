import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Clock, User, GripVertical } from 'lucide-react'
import { useDrag } from 'react-dnd'

interface TaskCardProps {
  id: string
  title: string
  client: string
  priority: 'High' | 'Medium' | 'Low'
  dueDate: string
  assignee: string
  onClick: () => void
}

export function TaskCard({
  id,
  title,
  client,
  priority,
  dueDate,
  assignee,
  onClick,
}: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const priorityColors = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Low: 'bg-green-100 text-green-800 border-green-200',
  }

  return (
    <div ref={drag} className={isDragging ? 'opacity-50' : ''}>
      <Card
        className='p-4 cursor-pointer hover:shadow-md transition-shadow bg-white border border-gray-200'
        onClick={onClick}
      >
        <div className='space-y-3'>
          <div className='flex items-start justify-between gap-2'>
            <div className='flex items-start gap-2 flex-1'>
              <GripVertical className='w-4 h-4 text-gray-400 mt-1 cursor-grab' />
              <h3 className='flex-1'>{title}</h3>
            </div>
            <Badge className={`${priorityColors[priority]} border`}>
              {priority}
            </Badge>
          </div>

          <div className='space-y-2 text-gray-600'>
            <div className='flex items-center gap-2'>
              <User className='w-4 h-4' />
              <span className='text-sm'>{client}</span>
            </div>

            <div className='flex items-center gap-2'>
              <Clock className='w-4 h-4' />
              <span className='text-sm'>{dueDate}</span>
            </div>
          </div>

          <div className='pt-2 border-t border-gray-100'>
            <p className='text-sm text-gray-500'>Assigned to: {assignee}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

import TaskCard from '@/lib/components/task-card'
import React from 'react'
import { EllipsisVertical } from 'lucide-react'
import { Button } from '@/lib/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/lib/components/ui/dropdown-menu'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card'

const analytics = () => {
  return (
    <div className='w-full'>
      <div className='flex w-full flex-row justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold mb-4'>Tasks</h1>

        <DropdownMenu>
          <div className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md p-1.5 px-2.5'>
            <DropdownMenuTrigger>Add New Task</DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex flex-row gap-3'>
        <div className='w-full'>
          <div className='flex border-b-2 pb-2 border-amber-300 w-full flex-row justify-between items-center'>
            <p>Not Started</p>
            <EllipsisVertical className=' rounded-sm hover:border-2' />
          </div>
          <div className='container w-full flex flex-col gap-3 py-10'>
            <TaskCard
              title='Task 1'
              description='Description for Task 1'
              progress={45}
              date='12.11.2024'
            />

            <TaskCard
              title='Task 2'
              description='Description for Task 2'
              progress={30}
              date='12.11.2024'
            />
            {/* <Button
              onClick={() => {
                // You can set a state here to show the TaskCard pop-over/modal
                // Example: setShowTaskCardPopover(true)
              }}
            >
              Add new task
            </Button> */}
          </div>
        </div>
        <div className='w-full'>
          <div className='flex border-b-2 pb-2 border-amber-300 w-full flex-row justify-between items-center'>
            <p>Not Started</p>
            <EllipsisVertical className=' rounded-sm hover:border-2' />
          </div>
          <div className='container w-full gap-3 flex flex-col py-10'>
            <TaskCard
              title='Task 7'
              description='Description for Task 7'
              progress={70}
              date='12.11.2024'
            />
          </div>
        </div>
        <div className='w-full'>
          <div className='flex pb-2 border-b-2 border-amber-300 flex-row justify-between items-center'>
            <p>Not Started</p>
            <EllipsisVertical className=' rounded-sm hover:border-2' />
          </div>
          <div className='container gap-3 flex flex-col py-10'>
            <TaskCard
              title='Task 7'
              description='Description for Task 7'
              progress={70}
              date='12.11.2024'
            />
            <TaskCard
              title='Task 8'
              description='Description for Task 8'
              progress={90}
              date='12.11.2024'
            />
            <TaskCard
              title='Task 9'
              description='Description for Task 9'
              progress={50}
              date='12.11.2024'
            />
          </div>
        </div>
        <div className='w-full'>
          <div className='flex pb-2 border-b-2 border-amber-300 flex-row justify-between items-center'>
            <p>Not Started</p>
            <EllipsisVertical className=' rounded-sm hover:border-2' />
          </div>
          <div className='container gap-3 flex flex-col py-10'>
            <TaskCard
              title='Task 7'
              description='Description for Task 7'
              progress={70}
              date='12.11.2024'
            />
            <TaskCard
              title='Task 8'
              description='Description for Task 8'
              progress={90}
              date='12.11.2024'
            />
            <TaskCard
              title='Task 9'
              description='Description for Task 9'
              progress={50}
              date='12.11.2024'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default analytics

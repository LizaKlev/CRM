import TaskCard from '@/lib/components/task-card'
import React from 'react'

const analytics = () => {
  return (
    <div className='flex flex-row'>
      <div className='container flex flex-col mx-auto py-10'>
        <TaskCard
          title='Task 1'
          description='Description for Task 1'
          progress={45}
        />

        <TaskCard
          title='Task 2'
          description='Description for Task 2'
          progress={30}
        />

        <TaskCard
          title='Task 3'
          description='Description for Task 3'
          progress={60}
        />
        <TaskCard
          title='Task 4'
          description='Description for Task 4'
          progress={80}
        />
        <TaskCard
          title='Task 5'
          description='Description for Task 5'
          progress={20}
        />
      </div>
      <div className='container flex flex-col mx-auto py-10'>
        <TaskCard
          title='Task 7'
          description='Description for Task 7'
          progress={70}
        />
        <TaskCard
          title='Task 8'
          description='Description for Task 8'
          progress={90}
        />
        <TaskCard
          title='Task 9'
          description='Description for Task 9'
          progress={50}
        />
        <TaskCard
          title='Task 10'
          description='Description for Task 10'
          progress={10}
        />
        <TaskCard
          title='Task 11'
          description='Description for Task 11'
          progress={25}
        />
        <TaskCard
          title='Task 12'
          description='Description for Task 12'
          progress={90}
        />
      </div>
    </div>
  )
}

export default analytics

import { useMemo, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TaskCard } from './components/TaskCard'
import { TaskDialog } from './components/TaskDialog'
import { AddTaskDialog } from './components/AddTaskDialog'
import { FilterSort } from './components/FilterSort'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Button } from './components/ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { Toaster } from './components/ui/sonner'

interface Task {
  id: string
  title: string
  client: string
  priority: 'High' | 'Medium' | 'Low'
  dueDate: string
  assignee: string
  status: string
  description: string
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review customer onboarding process',
      client: 'Acme Corp',
      priority: 'High',
      dueDate: 'Oct 18, 2025',
      assignee: 'Sarah Johnson',
      status: 'Not Started',
      description:
        'Conduct a thorough review of the current customer onboarding process, identify bottlenecks, and propose improvements to enhance user experience and reduce churn rate.',
    },
    {
      id: '2',
      title: 'Update CRM database entries',
      client: 'TechStart Inc',
      priority: 'Medium',
      dueDate: 'Oct 20, 2025',
      assignee: 'Mike Chen',
      status: 'Not Started',
      description:
        'Clean and update all customer records in the CRM database, ensuring data accuracy and completeness. Remove duplicate entries and verify contact information.',
    },
    {
      id: '3',
      title: 'Follow up with potential leads',
      client: 'Global Solutions',
      priority: 'High',
      dueDate: 'Oct 16, 2025',
      assignee: 'Emily Rodriguez',
      status: 'Not Started',
      description:
        "Contact all leads from last week's marketing campaign. Qualify prospects and schedule demo calls for interested parties.",
    },
    {
      id: '4',
      title: 'Prepare quarterly sales report',
      client: 'Innovate Ltd',
      priority: 'Medium',
      dueDate: 'Oct 22, 2025',
      assignee: 'David Park',
      status: 'Started',
      description:
        'Compile and analyze Q3 sales data, create visualizations, and prepare comprehensive report for management review. Include trend analysis and forecasts.',
    },
    {
      id: '5',
      title: 'Client contract renewal',
      client: 'MegaCorp Industries',
      priority: 'High',
      dueDate: 'Oct 17, 2025',
      assignee: 'Lisa Wang',
      status: 'Started',
      description:
        'Negotiate contract renewal terms with MegaCorp. Prepare proposal with updated pricing and additional services. Schedule meeting with decision makers.',
    },
    {
      id: '6',
      title: 'Product demo preparation',
      client: 'StartupXYZ',
      priority: 'Low',
      dueDate: 'Oct 25, 2025',
      assignee: 'Tom Wilson',
      status: 'Started',
      description:
        'Create customized product demonstration for StartupXYZ focusing on their specific use cases. Prepare presentation materials and demo environment.',
    },
    {
      id: '7',
      title: 'Customer feedback analysis',
      client: 'Retail Plus',
      priority: 'Low',
      dueDate: 'Oct 28, 2025',
      assignee: 'Amanda Foster',
      status: 'Completed',
      description:
        'Analyze customer feedback from recent surveys and support tickets. Identify common themes and areas for improvement. Present findings to product team.',
    },
    {
      id: '8',
      title: 'Training session for new CRM features',
      client: 'Enterprise Group',
      priority: 'Medium',
      dueDate: 'Oct 19, 2025',
      assignee: 'James Lee',
      status: 'Completed',
      description:
        'Conducted training session for Enterprise Group team on new CRM features. Provided documentation and recorded session for future reference.',
    },
  ])

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [addDialogStatus, setAddDialogStatus] = useState<string>('Not Started')
  const [editTask, setEditTask] = useState<Task | null>(null)

  // Filter and sort states
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterAssignee, setFilterAssignee] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')

  // Get unique assignees for filter dropdown
  const uniqueAssignees = useMemo(() => {
    return Array.from(new Set(tasks.map((task) => task.assignee))).sort()
  }, [tasks])

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks]

    // Apply filters
    if (filterPriority !== 'all') {
      filtered = filtered.filter((task) => task.priority === filterPriority)
    }
    if (filterAssignee !== 'all') {
      filtered = filtered.filter((task) => task.assignee === filterAssignee)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { High: 0, Medium: 1, Low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      } else if (sortBy === 'client') {
        return a.client.localeCompare(b.client)
      } else {
        // dueDate
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
    })

    return filtered
  }, [tasks, filterPriority, filterAssignee, sortBy])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsTaskDialogOpen(true)
  }

  const handleAddTask = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
    }
    setTasks([...tasks, newTask])
    toast.success('Task added successfully!')
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
    toast.success('Task updated successfully!')
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    toast.success('Task deleted successfully!')
  }

  const handleEditTask = (task: Task) => {
    setEditTask(task)
    setIsAddDialogOpen(true)
  }

  const openAddDialog = (status: string) => {
    setEditTask(null)
    setAddDialogStatus(status)
    setIsAddDialogOpen(true)
  }

  const handleDrop = (taskId: string, newStatus: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
    toast.success(`Task moved to ${newStatus}!`)
  }

  const notStartedTasks = filteredAndSortedTasks.filter(
    (task) => task.status === 'Not Started'
  )
  const startedTasks = filteredAndSortedTasks.filter(
    (task) => task.status === 'Started'
  )
  const completedTasks = filteredAndSortedTasks.filter(
    (task) => task.status === 'Completed'
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='min-h-screen bg-[#fdfbf8] relative'>
        <Header />
        <Sidebar />

        <div className='absolute left-[274px] top-[80px] right-[31px]'>
          {/* Section Top */}
          <div className='relative shrink-0 w-full mb-[18px]'>
            <div className='flex flex-row items-center size-full'>
              <div className='box-border content-stretch flex items-center justify-between px-[18px] py-[8px] relative w-full'>
                <div
                  className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#03221f] text-[24px] text-nowrap"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  <p className='leading-[24px] whitespace-pre'>Tasks</p>
                </div>
                <div className='content-stretch flex items-start relative shrink-0'>
                  <div
                    className='bg-[#004c43] box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0 cursor-pointer'
                    onClick={() => openAddDialog('Not Started')}
                  >
                    <div
                      aria-hidden='true'
                      className='absolute border border-[#004c43] border-solid inset-0 pointer-events-none rounded-[8px]'
                    />
                    <div className='box-border content-stretch flex gap-[10px] items-start p-[2px] relative shrink-0'>
                      <div className='relative shrink-0 size-[12px]'>
                        <svg
                          className='block size-full'
                          fill='none'
                          preserveAspectRatio='none'
                          viewBox='0 0 12 12'
                        >
                          <g>
                            <path
                              d='M5.9649 1L5.9649 11.071'
                              stroke='var(--stroke-0, white)'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M0.928711 6.03564L10.9997 6.03564'
                              stroke='var(--stroke-0, white)'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div
                      className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-nowrap text-white"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      <p className='leading-[18px] whitespace-pre'>
                        Create Task
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter and Sort */}
          <div className='px-[18px] mb-6'>
            <FilterSort
              filterPriority={filterPriority}
              filterAssignee={filterAssignee}
              sortBy={sortBy}
              onFilterPriorityChange={setFilterPriority}
              onFilterAssigneeChange={setFilterAssignee}
              onSortByChange={setSortBy}
              assignees={uniqueAssignees}
            />
          </div>

          {/* Kanban Board */}
          <div className='content-stretch flex gap-[12px] items-start relative shrink-0 w-full px-[18px]'>
            {/* Not Started Column */}
            <div className='content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[234.25px]'>
              <div className='h-[48px] relative shrink-0 w-full'>
                <div
                  aria-hidden='true'
                  className='absolute border-[#cc9766] border-[0px_0px_1px] border-solid inset-0 pointer-events-none'
                />
                <div className='size-full'>
                  <div className='box-border content-stretch flex flex-col h-[48px] items-start px-[12px] py-[4px] relative w-full'>
                    <div className='box-border content-stretch flex items-center justify-between px-0 py-[8px] relative shrink-0 w-full'>
                      <div
                        className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#03221f] text-[14px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        <p className='leading-[24px]'>Not Started</p>
                      </div>
                      <div
                        className='flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]'
                        style={
                          {
                            '--transform-inner-width': '16.921875',
                            '--transform-inner-height': '10',
                          } as React.CSSProperties
                        }
                      >
                        <div className='flex-none rotate-[90deg]'>
                          <div
                            className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative text-[#c3c3c3] text-[16.111px] text-nowrap"
                            style={{
                              fontVariationSettings: "'wdth' 100",
                            }}
                          >
                            <p className='leading-[10px] whitespace-pre'>•••</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {notStartedTasks.map((task) => (
                <div
                  key={task.id}
                  onDrop={(e) => {
                    e.preventDefault()
                    const taskId = e.dataTransfer.getData('taskId')
                    if (taskId) handleDrop(taskId, 'Not Started')
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('taskId', task.id)
                    }}
                  >
                    <TaskCard
                      id={task.id}
                      title={task.title}
                      client={task.client}
                      priority={task.priority}
                      dueDate={task.dueDate}
                      assignee={task.assignee}
                      onClick={() => handleTaskClick(task)}
                    />
                  </div>
                </div>
              ))}

              <div
                className='bg-white h-[48px] relative rounded-[16px] shrink-0 w-full cursor-pointer'
                onClick={() => openAddDialog('Not Started')}
              >
                <div
                  aria-hidden='true'
                  className='absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[16px]'
                />
                <div className='size-full'>
                  <div className='box-border content-stretch flex flex-col h-[48px] items-start px-[12px] py-[4px] relative w-full'>
                    <div className='box-border content-stretch flex gap-[6px] items-center justify-center px-0 py-[8px] relative shrink-0 w-full'>
                      <div className='box-border content-stretch flex gap-[10px] items-start p-[2px] relative shrink-0'>
                        <div className='relative shrink-0 size-[12px]'>
                          <svg
                            className='block size-full'
                            fill='none'
                            preserveAspectRatio='none'
                            viewBox='0 0 12 12'
                          >
                            <g>
                              <path
                                d='M5.9649 1L5.9649 11.071'
                                stroke='var(--stroke-0, #03221F)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M0.928711 6.03564L10.9997 6.03564'
                                stroke='var(--stroke-0, #03221F)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div
                        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#03221f] text-[14px] text-nowrap"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        <p className='leading-[24px] whitespace-pre'>
                          Add a Card
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Started Column */}
            <div className='content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[234.25px]'>
              <div className='h-[48px] relative shrink-0 w-full'>
                <div
                  aria-hidden='true'
                  className='absolute border-[#ccb766] border-[0px_0px_1px] border-solid inset-0 pointer-events-none'
                />
                <div className='size-full'>
                  <div className='box-border content-stretch flex flex-col h-[48px] items-start px-[12px] py-[4px] relative w-full'>
                    <div className='box-border content-stretch flex items-center justify-between px-0 py-[8px] relative shrink-0 w-full'>
                      <div
                        className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#03221f] text-[14px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        <p className='leading-[24px]'>Started</p>
                      </div>
                      <div
                        className='flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]'
                        style={
                          {
                            '--transform-inner-width': '16.921875',
                            '--transform-inner-height': '10',
                          } as React.CSSProperties
                        }
                      >
                        <div className='flex-none rotate-[90deg]'>
                          <div
                            className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative text-[#c3c3c3] text-[16.111px] text-nowrap"
                            style={{
                              fontVariationSettings: "'wdth' 100",
                            }}
                          >
                            <p className='leading-[10px] whitespace-pre'>•••</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {startedTasks.map((task) => (
                <div
                  key={task.id}
                  onDrop={(e) => {
                    e.preventDefault()
                    const taskId = e.dataTransfer.getData('taskId')
                    if (taskId) handleDrop(taskId, 'Started')
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('taskId', task.id)
                    }}
                  >
                    <TaskCard
                      id={task.id}
                      title={task.title}
                      client={task.client}
                      priority={task.priority}
                      dueDate={task.dueDate}
                      assignee={task.assignee}
                      onClick={() => handleTaskClick(task)}
                    />
                  </div>
                </div>
              ))}

              <div
                className='bg-white h-[48px] relative rounded-[16px] shrink-0 w-full cursor-pointer'
                onClick={() => openAddDialog('Started')}
              >
                <div
                  aria-hidden='true'
                  className='absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[16px]'
                />
                <div className='size-full'>
                  <div className='box-border content-stretch flex flex-col h-[48px] items-start px-[12px] py-[4px] relative w-full'>
                    <div className='box-border content-stretch flex gap-[6px] items-center justify-center px-0 py-[8px] relative shrink-0 w-full'>
                      <div className='box-border content-stretch flex gap-[10px] items-start p-[2px] relative shrink-0'>
                        <div className='relative shrink-0 size-[12px]'>
                          <svg
                            className='block size-full'
                            fill='none'
                            preserveAspectRatio='none'
                            viewBox='0 0 12 12'
                          >
                            <g>
                              <path
                                d='M5.9649 1L5.9649 11.071'
                                stroke='var(--stroke-0, #03221F)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M0.928711 6.03564L10.9997 6.03564'
                                stroke='var(--stroke-0, #03221F)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div
                        className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#03221f] text-[14px] text-nowrap"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        <p className='leading-[24px] whitespace-pre'>
                          Add a Card
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Completed Column */}
            <div className='content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[234.25px]'>
              <div className='h-[48px] relative shrink-0 w-full'>
                <div
                  aria-hidden='true'
                  className='absolute border-[#36a295] border-[0px_0px_1px] border-solid inset-0 pointer-events-none'
                />
                <div className='size-full'>
                  <div className='box-border content-stretch flex flex-col h-[48px] items-start px-[12px] py-[4px] relative w-full'>
                    <div className='box-border content-stretch flex items-center justify-between px-0 py-[8px] relative shrink-0 w-full'>
                      <div
                        className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#03221f] text-[14px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        <p className='leading-[24px]'>Completed</p>
                      </div>
                      <div
                        className='flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]'
                        style={
                          {
                            '--transform-inner-width': '16.921875',
                            '--transform-inner-height': '10',
                          } as React.CSSProperties
                        }
                      >
                        <div className='flex-none rotate-[90deg]'>
                          <div
                            className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative text-[#c3c3c3] text-[16.111px] text-nowrap"
                            style={{
                              fontVariationSettings: "'wdth' 100",
                            }}
                          >
                            <p className='leading-[10px] whitespace-pre'>•••</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  onDrop={(e) => {
                    e.preventDefault()
                    const taskId = e.dataTransfer.getData('taskId')
                    if (taskId) handleDrop(taskId, 'Completed')
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('taskId', task.id)
                    }}
                  >
                    <TaskCard
                      id={task.id}
                      title={task.title}
                      client={task.client}
                      priority={task.priority}
                      dueDate={task.dueDate}
                      assignee={task.assignee}
                      onClick={() => handleTaskClick(task)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dialogs */}
        <TaskDialog
          task={selectedTask}
          open={isTaskDialogOpen}
          onOpenChange={setIsTaskDialogOpen}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />

        <AddTaskDialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open)
            if (!open) setEditTask(null)
          }}
          defaultStatus={addDialogStatus}
          editTask={editTask}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
        />

        <Toaster />
      </div>
    </DndProvider>
  )
}

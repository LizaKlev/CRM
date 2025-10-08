import * as React from 'react'
import { Switch } from './ui/switch'
import { Bell } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

function Header({}: React.ComponentProps<'input'>) {
  return (
    <div className='flex justify-end border-b border-border h-14 items-center gap-3 px-4 w-full'>
      <Switch />
      <Bell className='h-5 w-5 text-muted-foreground'></Bell>
      <Avatar className='h-6 w-6'>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}

export { Header }

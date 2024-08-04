'use client'
import { Input } from '@nextui-org/react'
import { createEvent } from '@/actions/events'
import { Button, Tooltip } from '@nextui-org/react'
import { CirclePlus } from 'lucide-react'
import { useTransition } from 'react'

const Nav = () => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => {
      createEvent()
    })
  }

  return (
    <nav className="h-[65px] border-b border-default-50 flex items-center px-6 gap-4">
      <div>
        <Tooltip content="Create Event">
          <Button
            size="sm"
            variant="ghost"
            isIconOnly
            isLoading={isPending}
            onClick={handleClick}
          >
            <CirclePlus size={16} />
          </Button>
        </Tooltip>
      </div>
      <div className="w-1/2">
        <Input size="sm" variant="faded" placeholder="search" />
      </div>
    </nav>
  )
}

export default Nav

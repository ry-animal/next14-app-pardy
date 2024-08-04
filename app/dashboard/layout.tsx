'use client'
import Shell from '@/components/Shell'
import { usePathname } from 'next/navigation'

const Dashboard = ({ children, rsvps, events }: any) => {
  const pathname = usePathname()

  return (
    <Shell>
      {pathname === '/dashboard' ? (
        <div className="flex w-full h-full">
          <div className="w-1/2 border-r border-default-50">{rsvps}</div>
          <div className="w-1/2 flex flex-col">
            <div className="w-full h-1/2 border-b border-default-50">
              {events}
            </div>
            <div className="h-1/2 w-full">{children}</div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </Shell>
  )
}

export default Dashboard

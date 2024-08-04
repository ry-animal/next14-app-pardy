import { getAttendees } from '@/utils/attendees'
import { getCurrentUser } from '@/utils/users'

const Home = async () => {
  const user = await getCurrentUser()
  const count = await getAttendees(user.id)

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div>
        <h4 className="text-lg">Attendees</h4>
        <h2 className="text-6xl font-semibold my-8 text-center">{count}</h2>
      </div>
    </div>
  )
}

export default Home

import Link from "next/link"

const HomePage = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <div className="flex flex-col gap-3">
        <h2 className="text-green-400 font-extrabold text-4xl">Task was successfully assigned!!!</h2>
        <Link href='/create-task' className="font-semibold text-blue-400 text-xl">Want to assign another Task ?
          <span className="underline font-light">Assign task</span>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
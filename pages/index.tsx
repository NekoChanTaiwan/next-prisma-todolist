import React from 'react'
import { FaGithub } from 'react-icons/fa'
import Form from '@/components/Form'
import TodoList from '@/components/TodoList'
import ToolBar from '@/components/ToolBar'
import { useTodoContext } from '@/context'
import { prisma } from '@/lib/prisma'
import type { InferGetServerSidePropsType } from 'next'
import type { ITodo } from '@/types/todo'

export const getServerSideProps = async () => {
  const todoListDB = (await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
    },
  })) as ITodo[]

  return {
    props: {
      todoListDB,
    },
  }
}

function Home({ todoListDB }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { initialTodoList } = useTodoContext()

  React.useEffect(() => {
    initialTodoList(todoListDB)
  }, [initialTodoList, todoListDB])

  return (
    <div className='flex justify-center'>
      <div className='max-h-[90vh] w-full overflow-hidden rounded-md bg-[#f5f5f5] bg-opacity-60 p-4 shadow-xl sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]'>
        <div className='mb-2 flex items-end justify-between'>
          <h1 className='inline-block font-logo text-6xl text-black'>Todo List</h1>
          <span className='flex flex-col items-end'>
            <a
              className='flex items-center hover:text-[#f43f5d98]'
              href='https://github.com/NekoChanTaiwan/next-prisma-todolist'
              target='_blank'
              rel='noreferrer'
            >
              <FaGithub className='mr-1 inline-block text-lg' />
              <span>GitHub - By NekoChan</span>
            </a>
            <p>Built on Next.js, Tailwind CSS, Prisma, MySQL and TypeScript</p>
          </span>
        </div>
        <Form />
        <ToolBar todoListDB={todoListDB} />
        <TodoList todoListDB={todoListDB} />
      </div>
    </div>
  )
}

export default Home

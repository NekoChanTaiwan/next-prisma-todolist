import React from 'react'
import { useTodoContext } from '@/context/todoContext'
import type { ITodo } from '@/types/todo'

const initTodo: ITodo = {
  id: 0, // id will be generated by prisma
  title: '',
  description: '',
  status: false,
}

function Form() {
  const [form, setForm] = React.useState<ITodo>(initTodo)
  const { createTodo } = useTodoContext()

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // prevent page reload

    createTodo(form)

    setForm(initTodo)
  }

  return (
    <form className='flex flex-col text-black' onSubmit={onSubmitHandler}>
      <input
        type='text'
        className='mb-2'
        placeholder='Title'
        required
        value={form.title}
        onChange={(e) => setForm((state) => ({ ...state, title: e.target.value }))}
      />
      <textarea
        className='mb-2'
        placeholder='Description'
        required
        value={form.description}
        onChange={(e) => setForm((state) => ({ ...state, description: e.target.value }))}
      />
      <button type='submit' className='bg-[#fff] p-2'>
        Add todo
      </button>
    </form>
  )
}

export default Form
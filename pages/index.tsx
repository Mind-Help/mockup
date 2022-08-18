import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { PrismaClient } from "@prisma/client"
import { FormEvent, useState } from 'react'

const client = new PrismaClient()

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ id }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handle_submit = async (e: FormEvent) => {
    e.preventDefault()
    await client.user.create({
      data: {
        name,
        email
      }
    })
  }

  return (
    <fieldset>
      <h1>Olá visitante de numero {id}</h1>
      <form onSubmit={handle_submit} className="flex flex-col text-zinc-100 items-center p-4">
        <label className="mb-4">
          Nome
          <input onChange={(e) => setName(e.target.value)} className="text-zinc-900 rounded p-2 ml-4" placeholder="John Doe" type="text" />
        </label>
        <label className="mb-4">
          Email
          <input onChange={(e) => setEmail(e.target.value)} className="text-zinc-900 rounded p-2 ml-4" placeholder="johndoe@mail.com" type="email" />
        </label>
        <button
          className="bg-purple-700 px-4 py-2 rounded border hover:bg-purple-800 transition-all timing-2 active:bg-purple-900"
          type="submit">Enviar</button>
      </form>
    </fieldset>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const { id } = await client.counter.create({
    data: {}
  })
  return {
    props: {
      id
    }
  }
}
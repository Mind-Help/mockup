import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { PrismaClient } from "@prisma/client";
import { FormEvent, useState } from "react";

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handle_submit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/create_user", {
      method: "POST",
      body: new URLSearchParams({ name, email }),
    });

    switch (res.status) {
      case 201: {
        setMessage("registrado com sucesso!");
        break;
      }
      case 400: {
        const { message } = await res.json();
        setMessage(message);
        break;
      }
    }
  };

  return (
    <fieldset>
      <h1>Olá visitante de numero {id}</h1>
      <form
        onSubmit={handle_submit}
        className="flex flex-col text-zinc-100 items-center p-4"
      >
        <label className="mb-4">
          Nome
          <input
            onChange={(e) => setName(e.target.value)}
            className="text-zinc-900 rounded border p-2 ml-4"
            placeholder="John Doe"
            type="text"
          />
        </label>
        <label className="mb-4">
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-zinc-900 rounded border p-2 ml-4"
            placeholder="johndoe@mail.com"
            type="email"
          />
        </label>
        <button
          className="bg-purple-700 px-4 py-2 rounded border hover:bg-purple-800 transition-all active:bg-purple-900"
          type="submit"
        >
          Enviar
        </button>
        <span className="mt-4">{message}</span>
      </form>
    </fieldset>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const client = new PrismaClient();
  const { id } = await client.counter.create({
    data: {},
  });
  return {
    props: {
      id,
    },
  };
};

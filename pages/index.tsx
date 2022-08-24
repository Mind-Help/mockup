import type { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import Header from "../components/header";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handle_submit = async (e: FormEvent) => {
    e.preventDefault();
    if (name === "") {
      setMessage("nome não é válido");
      return;
    }
    if (email === "") {
      setMessage("email não é válido");
      return;
    }
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

  useEffect(() => {
    if (localStorage.getItem("has_visited_before") !== null) return;

    const handle_visit = async () =>
      await fetch("/api/add_to_counter", { method: "POST" });

    localStorage.setItem("has_visited_before", "true");
    handle_visit();
  });

  return (
    <>
      <Header />
      <main>
        <section className="p-4">
          <p className="indent-2">
            Olá!! Tudo bem? Somos estudantes do curso técnico de informática do
            Colégio Luterano Concórdia - SL, estamos iniciando nossa pesquisa de
            validação do problema do nosso TCC, ao clicar no link dos stories,
            você já participou da nossa pesquisa! Muito obrigada, caso queira
            ficar por dentro das atualizações no nosso projeto, inscreva-se:{" "}
          </p>
        </section>
        <fieldset className="text-center p-12">
          <form onSubmit={handle_submit} className="flex flex-col p-4">
            <label htmlFor="name" className="mt-4 mb-2">
              Nome
            </label>
            <input
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="text-zinc-900 rounded border p-2 mx-auto"
              placeholder="John Doe"
              type="text"
            />
            <label htmlFor="email" className="mt-4 mb-2">
              Email
            </label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="text-zinc-900 rounded border p-2 mx-auto"
              placeholder="johndoe@mail.com"
              type="email"
            />
            <button
              className="bg-brand-dark4 mt-4 mx-auto px-6 py-2 rounded border hover:bg-brand-dark3 transition-all active:bg-brand-dark2"
              type="submit"
            >
              Enviar
            </button>
            <span className="mt-4">{message}</span>
          </form>
        </fieldset>
      </main>
    </>
  );
};

export default Home;

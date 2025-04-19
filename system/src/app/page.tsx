"use client";

import { FormButton, FormCard, Input } from "@/components/ui/FormComponents";
import { poppins, raleway } from "@/components/ui/theme";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    name: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      ...credentials
    });

    if (res?.ok) {
      toast.success("Login realizado com sucesso!");
      setInterval(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      toast.error("Usuário ou senha inválido.");
    }
  };

  return (
    <FormCard onSubmit={handleFormSubmit}>
      <h1 className={raleway.className}>Login</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <Image
          src="/images/logo.png"
          alt="logo"
          width={341}
          height={167}
          id="logo"
        />

        <article
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "1.5rem"
          }}
        >
          <div>
            <Input className={poppins.className}>
              <input
                type="text"
                id="name"
                required
                value={credentials.name}
                onChange={handleChange}
              />
              <label htmlFor="name">Usuário</label>
            </Input>

            <Input className={poppins.className}>
              <input
                type="password"
                id="password"
                required
                value={credentials.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Senha</label>
            </Input>

            <FormButton>Logar</FormButton>
          </div>
        </article>
      </div>
    </FormCard>
  );
}

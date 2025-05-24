"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const NextAuthProvider = async ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

import { useSession } from "next-auth/react";
import Image from "next/image";
import { colors, poppins } from "./ui/theme";

export function Header() {
  const { data: session } = useSession();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: ".5rem .5rem",
        marginBottom: "1rem",
        backgroundColor: colors.primary
      }}
    >
      <Image
        src="/images/logo.png"
        alt="logo"
        height={258}
        width={527}
        layout="responsive"
        objectFit="cover"
        style={{
          maxWidth: "12rem",
          height: "auto"
        }}
      />

      {session && (
        <h1
          className={poppins.className}
          style={{
            fontSize: "1.6rem",
            margin: "1rem 2rem",
            color: colors.white
          }}
        >
          Olá {session.user?.name}
        </h1>
      )}
    </div>
  );
}

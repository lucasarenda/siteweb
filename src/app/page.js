import Link from 'next/link'
import "@/app/globals.css"
import "@/app/home.css"
export default function Home() {
  return (
    <body>
    <header>
        <nav>
        <Link href="/" >
            Home
          </Link>
          <Link href="/local" >
            Localizacao
          </Link>

          <Link href="/sobre" >
            Sobre
          </Link>
          <img src='logo.png'></img>
        </nav>

        </header>
    <main>
      <h1>Sua saúde não pode esperar. Nós mostramos o caminho mais rápido!</h1>
      <img src="/prontosocorro.jpg"/>
    </main>
    <footer>

    </footer>
    </body>
  );
}

import Link from 'next/link'
import "@/app/globals.css"
import "@/app/localizacao.css"
export default function Local() {
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
          <img src="/logo.png"/>
        </nav>
        </header>
    <main>
      <h1 className='titulolocal'>digite seu endereço completo abaixo e encontre os hospitais mais proximos a voce</h1>
      <div className='map'>
      <label>Endereço completo:</label>
      <input type="text" id="endereco" name="endereco" placeholder="Ex: Rua Exemplo, 123 - Centro, São Paulo/SP" required/>
      <img src="/exemplo.png"/>
      </div>
    </main>
    <footer>

    </footer>
    </body>
  );
}
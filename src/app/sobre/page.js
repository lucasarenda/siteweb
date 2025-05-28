import Link from 'next/link'
import "../../app/globals.css"
import "../../app/sobre.css"
export default function sobre() {
  return (
    <body>
    <header>
        <nav className='cabecalho'>
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
        <main className='textosobre'>
      <h1>Sobre Nós</h1>
      <p>Conheça mais sobre nosso projeto e propósito.</p>
      
      <h2>Perguntas Frequentes</h2>
      <ul>
        <li>
          <Link href="/sobre/porque">
            Por que criamos este site?
          </Link>
        </li>
        <li>
          <Link href="/sobre/como-funciona">
            Como funciona o sistema?
          </Link>
        </li>
        <li>
          <Link href="/sobre/privacidade">
            O que fazemos com seus dados?
          </Link>
        </li>
      </ul>
    </main>
    </body>
        )
        
}

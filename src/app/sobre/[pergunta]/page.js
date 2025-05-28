import Link from 'next/link'
import "../../app/globals.css"
import "../../app/sobre.css"
const respostas = {
    'porque': {
      titulo: 'Por que criamos este site?',
      conteudo:'Nosso site nasceu de uma necessidade urgente: ajudar pessoas a encontrar assistência médica rápida em momentos críticos. Em situações de emergência, cada minuto conta, e saber qual hospital está mais próximo pode fazer toda a diferença.'    
    },
    'como-funciona': {
      titulo: 'Como funciona o sistema?',
      conteudo: 'Nosso sistema utiliza geolocalização e dados de mapas para identificar os hospitais mais próximos da sua localização atual.'
    },
    'privacidade': {
      titulo: 'Política de Privacidade',
      conteudo: 'Respeitamos sua privacidade. Os dados de localização são usados apenas durante a sessão e não são armazenados.'
    }
  }
  
  export default function PerguntaPage({ params }) {
    const resposta = respostas[params.pergunta]
    return (
      <div>
        <h1 className='respostatitulo'>{resposta.titulo}</h1>
        <p className='respostaconteudo'>{resposta.conteudo}</p>
        <Link href="/sobre" className='linkvoltar'>← Voltar para Sobre</Link>
      </div>
    )
  }

// Hooks do React
import { useState, useRef, useEffect } from 'react'

// Estilos/ícones globais
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

// Assets e dados
import capaImg from './assets/bras_cubas.jpeg'
import livro from './assets/capitulos/livro'

// Componentes da aplicação
import SeletorCapitulos from './SeletorCapitulos'
import BotoesControles from './BotoesControles'
import Capa from './Capa'
import GerenciadorDeFaixa from './GerenciadorDeFaixa'
import ContainerProgresso from './ContainerProgresso'

function App() {
  // Referência ao elemento <audio> para controlar play/pause/etc
  const audioRef = useRef(null)

  // Estado: se está tocando (true) ou pausado (false)
  const [taTocando, setTaTocando] = useState(false)

  // Estado: índice da faixa/capítulo atual dentro do array "livro"
  const [faixaAtual, setFaixaAtual] = useState(0)

  const [tempoTotalFaixa, setTempoTotalFaixa] = useState(0)

  const [tempoAtualFaixa, setTempoAtualFaixa] = useState(0)

  const barraProgressoRef = useRef(null)

  // Objeto com metadados do "álbum"/livro e a lista de capítulos
  const informacoesLivro = {
    nome: 'Memórias Póstumas de Brás Cubas',
    autor: 'Machado de Assis',
    capitulos: livro,                // array importado com as faixas/capítulos
    totalCapitulos: livro.length,    // evita número fixo; acompanha o array
    capa: capaImg,
    textoAlternativo: 'Capa do livro Memórias Póstumas de Brás Cubas',
  }

  // Função de play/pause acionada pelo botão principal
  function tocarOuPausar() {
    const audio = audioRef.current
    if (!audio) return

    if (taTocando) {
      // Se já está tocando, pausa e reflete no estado
      audio.pause()
      setTaTocando(false)
    } else {
      // Se está pausado, garante posição válida e tenta tocar
      if (!Number.isFinite(audio.currentTime)) {
        audio.currentTime = 0
      }
      audio.play().then(() => {
        setTaTocando(true)
      }).catch(() => {
        // Em caso de bloqueio de autoplay pelo navegador, mantém coerência
        setTaTocando(false)
      })
    }
  }

  // Efeito: sempre que "faixaAtual" mudar, prepara o <audio> para a nova faixa.
  // Se já estava tocando, tenta iniciar a reprodução automaticamente.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Para a faixa anterior, reseta o tempo e força recarregar a nova fonte
    audio.pause()
    audio.currentTime = 0
    if (typeof audio.load === 'function') audio.load()

    // Se o estado diz que estava tocando, tenta tocar a nova faixa
    if (taTocando) {
      audio.play().catch(() => {
        // Se o navegador bloquear, desativa o estado de "tocando"
        setTaTocando(false)
      })
    }
  }, [faixaAtual]) // Reage a mudanças de faixa e do próprio estado "taTocando"

  // salvar o local storage
  // salvar
  useEffect(() => {
    const a = audioRef.current; if (!a) return
    const id = setInterval(() => {
      const key = `posicao:${informacoesLivro.nome}:${faixaAtual}`
      localStorage.setItem(key, String(Math.floor(a.currentTime || 0)))
    }, 5000)
    return () => clearInterval(id)
  }, [faixaAtual, informacoesLivro.nome])

  // restaurar
  useEffect(() => {
    if (!tempoTotalFaixa) return
    const key = `posicao:${informacoesLivro.nome}:${faixaAtual}`
    const salvo = Number(localStorage.getItem(key) || 0)
    if (salvo > 0 && audioRef.current) {
      audioRef.current.currentTime = Math.min(salvo, tempoTotalFaixa)
      setTempoAtualFaixa(audioRef.current.currentTime)
    }
  }, [faixaAtual, tempoTotalFaixa])


  // Avança para a próxima faixa com "wrap-around" (vai para 0 no fim)
  const avancarFaixa = () => {
    setFaixaAtual(prev => (prev + 1) % informacoesLivro.totalCapitulos)
  }

  // Retrocede para a faixa anterior com "wrap-around" (vai para a última se estava na 0)
  const retrocederFaixa = () => {
    setFaixaAtual(prev => (prev - 1 + informacoesLivro.totalCapitulos) % informacoesLivro.totalCapitulos)
  }

  // Handler para quando a faixa termina naturalmente: avança para a próxima
  const aoTerminarFaixa = () => {
    avancarFaixa()
  }

  const avancar15s = () => {
    audioRef.current.currentTime += 15
  }

  const voltar15s = () => {
    audioRef.current.currentTime -= 15
  }

  const avancarPara = (event) => {
    const largura = barraProgressoRef.current.clientWidth
    const novoTempo = (event.nativeEvent.offsetX / largura) * tempoTotalFaixa
    audioRef.current.currentTime = novoTempo
  }

  // Renderização da interface
  return (
    <>
      {/* Capa com título/autor/imagem */}
      <Capa informacoes={informacoesLivro} />

      {/* Mostra o número do capítulo atual (1-based para usuário) */}
      <SeletorCapitulos capituloAtual={faixaAtual + 1} />

      {/* Gerencia o elemento <audio> da faixa atual.
          - "faixa" deve conter ao menos a URL/arquivo em "src" (ou campo equivalente)
          - "referencia" expõe o <audio> para controle externo via audioRef
          - "onEnded" avança automaticamente ao finalizar */}
      <GerenciadorDeFaixa
        faixa={informacoesLivro.capitulos[faixaAtual]}
        referencia={audioRef}
        onEnded={aoTerminarFaixa}
        setTempoTotalFaixa={setTempoTotalFaixa}
        setTempoAtualFaixa={setTempoAtualFaixa}

      />

      <ContainerProgresso
        tempoTotalFaixa={tempoTotalFaixa}
        tempoAtualFaixa={tempoAtualFaixa}
        referencia={barraProgressoRef}
        avancarPara={avancarPara} />

      {/* Botões de controle: play/pause, próximo e anterior */}
      <BotoesControles
        taTocando={taTocando}
        setTaTocando={setTaTocando}
        tocarFaixa={tocarOuPausar}
        avancarFaixa={avancarFaixa}
        retrocederFaixa={retrocederFaixa}
        avancar15s={avancar15s}
        voltar15s={voltar15s}
      />
    </>
  )
}

export default App

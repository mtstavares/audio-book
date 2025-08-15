import { useState, useRef } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

import capaImg from './assets/bras_cubas.jpeg'
import livro from './assets/capitulos/livro'

import SeletorCapitulos from './SeletorCapitulos'
import BotoesControles from './BotoesControles'
import Capa from './Capa'
import GerenciadorDeFaixa from './GerenciadorDeFaixa'


function App() {

  const [taTocando, setTaTocando] = useState(false);
  const [faixaAtual, setFaixaAtual] = useState(0);
  const audioRef = useRef(null);

  const tocarFaixa = () => {
    if (taTocando) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setTaTocando(!taTocando);
  }

  const informacoesLivro = {
    nome: "Memórias Póstumas de Brás Cubas",
    autor: "Machado de Assis",
    capitulos: livro,
    totalCapitulos: 2,
    capa: capaImg,
    textoAlternativo: "Capa do livro Memórias Póstumas de Brás Cubas"
  }

  return (
    <>
      <Capa informacoes={informacoesLivro} />

      <SeletorCapitulos capituloAtual={faixaAtual + 1} />

      <GerenciadorDeFaixa faixa={informacoesLivro.capitulos[faixaAtual]}
      referencia={audioRef} />

      <BotoesControles taTocando={taTocando}
       setTaTocando={setTaTocando}
      tocarFaixa={tocarFaixa} />
    </>
  )
}

export default App

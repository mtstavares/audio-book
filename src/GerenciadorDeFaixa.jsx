const GerenciadorDeFaixa = ({faixa, referencia, setTempoTotalFaixa, setTempoAtualFaixa}) => {
  return (
    <audio
     src={faixa} 
     ref={referencia} 
     onLoadedMetadata={() => setTempoTotalFaixa(referencia.current.duration)}
     onTimeUpdate={() => setTempoAtualFaixa(referencia.current.currentTime)}>

     </audio>
  )
}

export default GerenciadorDeFaixa
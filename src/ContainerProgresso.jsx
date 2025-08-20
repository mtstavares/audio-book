

const ContainerProgresso = (props) => {

    const formatarTempo = (tempoEmSegundos) => {
        const tempo = new Date(null)
        tempo.setSeconds(tempoEmSegundos)
        return tempo.toISOString().slice(14, 19)
    }

  return (
    <section className="container-progresso" onClick={props.avancarPara}>
        <div className="progresso-total" ref={props.referencia} onClick={props.avancarPara}>
            <div className="progresso-atual" style={{
            width: `${props.tempoAtualFaixa / props.tempoTotalFaixa * 100}%`
        }}></div>
            <div className="marcador-posicao" style={{
            left: `${props.tempoAtualFaixa / props.tempoTotalFaixa * 100}%`
        }}></div>
        </div>
        <div className="metricas-tempo">
            <p>{formatarTempo(props.tempoAtualFaixa)}</p>
            <p>{formatarTempo(props.tempoTotalFaixa - props.tempoAtualFaixa)}</p>
        </div>

    </section>
  )
}

export default ContainerProgresso
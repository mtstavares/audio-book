

const ContainerProgresso = (props) => {

    const formatarTempo = (seg = 0) => {
        seg = Math.max(0, Math.floor(seg || 0))
        const h = Math.floor(seg / 3600)
        const m = Math.floor((seg % 3600) / 60)
        const s = seg % 60
        return h
            ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
            : `${m}:${String(s).padStart(2, '0')}`
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
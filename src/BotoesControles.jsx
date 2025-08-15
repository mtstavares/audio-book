const BotoesControles = (props) => {
  return (
    <div className="caixa-botoes">
        <button onClick={() => props.retrocederFaixa()}>
            <i className="bi bi-skip-start"></i>
        </button>
        <button>
            <i className="bi bi-skip-backward"></i>
        </button>
        <button onClick={() => props.tocarFaixa()}>
            <i className={`bi bi-${props.taTocando ? 'pause' : 'play'}-circle-fill`}></i>
        </button>
        <button >
            <i className="bi bi-skip-forward"></i>
        </button>
        <button onClick={() => props.avancarFaixa()}>
            <i className="bi bi-skip-end"></i>
        </button>
    </div>
  )
}

export default BotoesControles
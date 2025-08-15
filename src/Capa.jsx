const Capa = (props) => {
  return (
    <img className="capa" src={props.informacoes.capa} alt={props.informacoes.textoAlternativo} />
  )
}

export default Capa
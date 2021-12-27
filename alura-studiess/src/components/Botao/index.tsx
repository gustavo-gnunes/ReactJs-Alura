import React from 'react';

import style from './Botao.module.scss';

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children?: React.ReactNode
}

function Botao({ onClick, type, children }: Props) {
  return (
    // if tiver onClick qdo chamar este componente (neste caso está sendo chamada no componente Cronometro), executa a função onClick
    <button onClick={onClick} type={type} className={style.botao}>
      {children}
    </button>
  )
}

// diferença entre um componente usando function e um usando class (estou usando o componente com function)


// type? -> o ? quer dizer que é opicional passar ou não pela propriedade do botão qdo chamar este componente
// caso ñ cololcar o ?, toda vez que chamar este componente Botão teria que passar uma propriedade do tipo type
class Botao1 extends React.Component<{
  // o type é uma desses tipos
  // ?-> não é obrigatório passar essa props qdo for chamar este componente
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}> {
  render() {
    // const { type = "button "} = this.props -=> serve para qdo ñ passar nenhuma  propriedade para esse componente, ele vai colocar que é do tipo "button" 
    // const { type = "button "} = this.props;
    return (
      // if tiver onClick qdo chamar este componente (neste caso está sendo chamada no componente Cronometro), executa a função onClick
      <button onClick={this.props.onClick} type={this.props.type} className={style.botao}>
        {this.props.children}
      </button>
    )
  }
}

export default Botao;
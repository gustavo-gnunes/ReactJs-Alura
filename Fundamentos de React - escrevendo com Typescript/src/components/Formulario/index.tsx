import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// como o ITarefa vai ser usado em mais de um componente, em vez de criar uma interface para cada componente, eu crio um arquivo com as interface e importo elas em cada componnete que vai ser utilizado
import { ITarefa } from '../../types/tarefa';

import Botao from '../Botao';

import style from './Formulario.module.scss';

interface Props {
  // React.Dispatch<React.SetStateAction<ITarefa[]>> -> para dizer que o setTarefas é desse tipo, esse tipo dá para ver se passar o mouse por cima no App.tsx...
  // ... qdo chama o <Formulario setTarefas={ setTarefas } />, é só passar o mouse em cima do { setTarefas }, que ele mostra o tipo
  setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>
}

function Formulario({ setTarefas }: Props) {
  const  [tarefa, setTarefa] = useState('');
  const [tempo, setTempo] = useState('00:00');

  function adicionarTarefa(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    // setTarefas -> é o setTarefas que está vindo como propriedades, que foi passado pelo elemento pai "neste caso o App.tsx" 
    // ...tarefasAntigas -> seria todas as tarefas que já tinha cadastrada
    // tarefasAntigas -> vai receber tudo o que já tinha, mais o que está vindo deste componente -> que é o tempo e a tarefa que foi digitada no input deste componente
    setTarefas(tarefasAntigas =>
      [
        ...tarefasAntigas,
        {
          tarefa,
          tempo,
          selecionado: false, // para saber qual tarefa está selecionado
          completado: false, // para saber qual tarefa foi completada
          id: uuidv4(),
        }
      ]
    )

    // limpar campos
    setTarefa('');
    setTempo('00:00')
  }

  return (
    <form onSubmit={adicionarTarefa} className={style.novaTarefa}>
      <div className={style.inputContainer}>
        {/* htmlFor="tarefa" -> qdo clicar no label o input tarefa é selecionado */}
        <label htmlFor="tarefa">
          Adicione um novo estudo
        </label>
        <input
          type="text"
          name="tarefa"
          id="tarefa"
          onChange={evento => setTarefa(evento.target.value)}
          value={tarefa}
          placeholder="O que você quer estudar"
          required // campo obrigatório
        />
      </div>

      <div className={style.inputContainer}>
        <label htmlFor="tempo">
          Tempo
        </label>
        <input
          type="time"
          step="1"
          name="tempo"
          onChange={evento => setTempo(evento.target.value)}
          value={tempo}
          id="tempo"
          min="00:00:00"
          max="01:30:00"
          required
        />
      </div>

      <Botao type="submit">
        Adicionar
      </Botao>
    </form>
  )
}



// diferença entre um componente usando function e um usando class (estou usando o componente com function)




class Formulario1 extends React.Component<{
  // React.Dispatch<React.SetStateAction<ITarefa[]>> -> para dizer que o setTarefas é desse tipo, esse tipo dá para ver se passar o mouse por cima no App.tsx...
  // ... qdo chama o <Formulario setTarefas={ setTarefas } />, é só passar o mouse em cima do { setTarefas }, que ele mostra o tipo
  setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>
}> {
  state = {
    tarefa: "",
    tempo: "00:00",
  }

  adicionarTarefa(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    // this.props.setTarefas -> é o setTarefas que está vindo como propriedades, que foi passado pelo elemento pai "neste caso o App.tsx" 
    // tarefasAntigas -> seria todas as tarefas que já tinha cadastrada
    // tarefasAntigas -> vai receber tudo o que já tinha, mais o que está vindo deste componente "this.state" -> que é o tempo e a tarefa que foi digitada no input deste componente
    this.props.setTarefas(tarefasAntigas =>
      [
        ...tarefasAntigas,
        {
          ...this.state,
          selecionado: false, // para saber qual tarefa está selecionado
          completado: false, // para saber qual tarefa foi completada
          id: uuidv4(),
        }
      ]
    )

    // limpar campos
    this.setState({
      tarefa: "",
      tempo: "00:00",
    })
  }

  render() {
    return (
      // .bind(this): associa a função a outro escopo, que esse espoco é o this
      // executa o adicionar tarefa e associa ele ao this, se não fizer isso lá na função adicionarTarefa, não consegue usar o this.state, pq o this vai como undefined
      // isso acontece pq este componente é uma class e não uma function
      <form onSubmit={this.adicionarTarefa.bind(this)} className={style.novaTarefa}>
        <div className={style.inputContainer}>
          {/* htmlFor="tarefa" -> qdo clicar no label o input tarefa é selecionado */}
          <label htmlFor="tarefa">
            Adicione um novo estudo
          </label>
          <input
            type="text"
            name="tarefa"
            id="tarefa"
            onChange={evento => this.setState({ ...this.state, tarefa: evento.target.value })}
            value={this.state.tarefa}
            placeholder="O que você quer estudar"
            required // campo obrigatório
          />
        </div>

        <div className={style.inputContainer}>
          <label htmlFor="tempo">
            Tempo
          </label>
          <input
            type="time"
            step="1"
            name="tempo"
            onChange={evento => this.setState({ ...this.state, tempo: evento.target.value })}
            value={this.state.tempo}
            id="tempo"
            min="00:00:00"
            max="01:30:00"
            required
          />
        </div>

        <Botao type="submit">
          Adicionar
        </Botao>
      </form>
    )
  }
}

export default Formulario;
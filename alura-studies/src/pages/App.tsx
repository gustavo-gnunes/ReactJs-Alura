import React, { useState } from 'react';

import Formulario from '../components/Formulario';
import Lista from '../components/Lista';
import Cronometro from '../components/Cronometro';
import { ITarefa } from '../types/tarefa';

import style from './App.module.scss';


function App() {
  // <ITarefa[] | []>([]) -> ele é um array de Itarefa(qdo estiver tarefas já cadastradas) ou um array vazio
  const [tarefas, setTarefas] = useState<ITarefa[] | []>([]);
  // da para fazer com contex api, mas neste curso não aprendeu, por isso tem que passar por props
  const [selecionado, setSelecionado] = useState<ITarefa>();

  // essa função vai ser usado no componente Item. Então deve passar para o componente Lista e do componete Lista, passar para o Item
  function selecionaTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada);

    // para saber qual tarefa foi selecionada
    // percorre todas as tarefas que estão em setTarefas e compara com a tarefa selecionada, qdo achar a variável selecionado recebe true
    setTarefas(tarefasAntigas => tarefasAntigas.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id ? true : false
    })))
  }

  // função para finalizar uma tarefa
  function finalizarTarefa() {
    // pega a tarefa que está selecionada
    if(selecionado) {
      setSelecionado(undefined); // deve deixar como undefined, pq ñ vai ter masi nada selecionado, pois a tarefa selecionada vai ser finalizada
      setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => {
        if(tarefa.id === selecionado.id) {
          return {
            ...tarefa,
            selecionado: false,
            completado: true
          }
        }
        return tarefa;
      }))
    }
  }

  return (
    <div className={style.AppStyle}>
      <Formulario setTarefas={ setTarefas } />
      {/* estou passando como props, pq tanto o componente Lista qto o Formulario, vão precisar saber das tarefas */}
      {/* caso o componente Formulario não precisar ter acesso ao tarefa, era só colocar const [tarefas, setTarefas] dentro do componente Lista */}
      <Lista 
          tarefas={ tarefas }
          selecionaTarefa={ selecionaTarefa }
      />
      <Cronometro 
        selecionado={ selecionado} 
        finalizarTarefa={ finalizarTarefa }// vai executar finalizarTarefa, qdo o cronometro chegar a zero
      />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

import Botao from "../Botao";
import Relogio from './Relogio';

import { tempoParaSegundos } from '../../common/utils/time';
import { ITarefa } from "../../types/tarefa";

import style from './Cronometro.module.scss';

interface Props {
  selecionado: ITarefa | undefined,
  finalizarTarefa: () => void,
}

export default function Cronometro({ selecionado, finalizarTarefa }: Props) {
  const [tempo, setTempo] = useState<number>();

  useEffect(() => {
    // ?-> se selecionado existir e selecionado.tempo existir (permite verificar um encadeamento para não haver problemas de tempo ser null)
    // o if a baixo é a mesma coisa que esse if-> if(selecionado && selecionado.tempo)
    if (selecionado?.tempo) {
      // tempoParaSegundos-> converte o tempo h, min e segundos em segundos
      setTempo(tempoParaSegundos(selecionado.tempo));
    }
  }, [selecionado])

  // função para ir decrementando o tempo da tarefa que está no cronometro
  // contador: number = 0-> se for undefined, por padrão coloca zero
  function regressiva(contador: number = 0) {
    // setTimeout(() =>)-> executa a função varias vezes, depois de um determinado tem (neste caso depois de 1 segundo)
    setTimeout(() => {
      // ainda tem minutos ou segundos contando no cronometro
      if (contador > 0) {
        // diminuir o tempo
        setTempo(contador - 1); 
        // faz esse loop até contador ser igual a zero
        return regressiva(contador - 1); // isso é uma função recursiva
      }
      finalizarTarefa(); // entra aqui qdo o cronemetro estiver zerado (o contador for <= a zero)
      
    }, 1000) // 1000 = 1 segundo
  }

  return (
    <div className={style.cronometro}>
      <p className={style.titulo}>Escolha um card e inicie o crônometro</p>

      <div className={style.relogioWrapper}>
        <Relogio tempo={tempo} />
      </div>

      <Botao onClick={() => regressiva(tempo)} >
        Começar!
      </Botao>
    </div>
  )
}
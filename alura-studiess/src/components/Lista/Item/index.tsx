// como o ITarefa vai ser usado em mais de um componente, em vez de criar uma interface para cada componente, eu crio um arquivo com as interface e importo elas em cada componnete que vai ser utilizado
import { ITarefa } from '../../../types/tarefa';
import style from './Item.module.scss';

// extends ITarefa-> vai ter tudo que está em ITarefa (tarefa, tempo, selecionado, completado e id), mais selecionaTarefa
interface Props extends ITarefa {
  selecionaTarefa: (tarefaSelecionada: ITarefa) => void
}

//  tarefa, tempo }: é o props
// ITarefa-> é uma interface que está sendo importada
export default function Item({ tarefa, tempo, selecionado, completado, id, selecionaTarefa }: Props) {
  // export default function Item({ tarefa, tempo, selecionado, completado, id }: ITarefa) { // como tive que usar a função selecionaTarefa, criei uma outra interface pra isso. Com isso mudou um pouco os parametros, por isso deixei comentado essa linha 
  // export default function Item({ tarefa, tempo }: { tarefa: string, tempo: string }) {
  // em vez de declarar aqui "const { tarefa, tempo } = props;", pode colocar no parametro do Item ()
  // em vez de ficar Item(props: { tarefa: string, tempo: string })
  // fica Item({ tarefa, tempo }: { tarefa: string, tempo: string })
  // const { tarefa, tempo } = props; // fazendo como a explicação a cima, não precisa dessa linha

  return (
    // onClick-> retorna a função selecionaTarefa(), esta função está em App.tsx, que está passando para o componente Lista, que a Lista está passando para o componente Item
    <li 
      // if a variável 'selecionado' estiver como true add a className itemSelecionado
      className={`
        ${style.item} 
        ${selecionado ? style.itemSelecionado : ''}
        ${completado ? style.itemCompletado : ''}
      `}
      // !completado-> se estiver completado, ñ pode deixar selecionar a tarefa, pois a tarefa já foi completada
      onClick={() => !completado && selecionaTarefa({
        tarefa,
        tempo,
        selecionado,
        completado,
        id,
      })}
    >
      <h3>{tarefa}</h3>
      <span>{tempo}</span>
      {/* para mostrar um icone de completado (um check), na tarefa que foi completada */}
      {completado &&
        <span className={style.concluido} aria-label="tarefa completada"></span>
      }
    </li>
  )
}
import Item from './Item';
// como o ITarefa vai ser usado em mais de um componente, em vez de criar uma interface para cada componente, eu crio um arquivo com as interface e importo elas em cada componnete que vai ser utilizado
import { ITarefa } from '../../types/tarefa';
import style from './Lista.module.scss';

// coloco o Itarefa dentro de um arquivo e toda vez que for usar esse ITarefa é só importar
// interface ITarefa{
//   tarefa: string;
//   tempo: string;
// }

interface Props {
  tarefas: ITarefa[],
  selecionaTarefa: (tarefaSelecionada: ITarefa) => void,
}


// { tarefas } -> para pegar as tarefas que estão sendo passadas pelo elemento pai(neste caso é o App.tsx) por propriedades
// deve fazer isso, pq essas tarefas vão ser usada tanto no componente Lista, qto no Formulario, caso fosse só usada no Lista, era só fazer como o exemplo abaixo ...
// .. e em vez de passar como propriedade, declarar o const [tarefas, setTarefas] aqui neste componente
// tarefa: ITarefa[] -> para dizer que tarefas é uma array
function Lista({ tarefas, selecionaTarefa }: Props) {
// function Lista({ tarefas }: {tarefas: ITarefa[]}) { // como tive que usar a função selecionaTarefa, criei uma outra interface pra isso. Com isso mudou um pouco os parametros, por isso deixei comentado essa linha 
  // como neste curso não vai ser utilizado Context, e vai ter que passar como props, para o componente Formulario se comunicar com o componente Lista
  // deve declarar o const [tarefas, setTarefas] dentro do App.tsx, com isso eu consigo passar por propriedade as tarefa, tanto para o componente Lista, qto para o componente Formulario
  // const [tarefas, setTarefas] = useState([
  //   {
  //     tarefa: 'React',
  //     tempo: '02:00:00'
  //   },
  //   {
  //     tarefa: 'Javascript',
  //     tempo: '01:00:00'
  //   },
  //   {
  //     tarefa: 'Typescript',
  //     tempo: '03:00:00'
  //   }
  // ])

  return (
    <aside className={style.listaTarefas}>
      <h2>Estudos do dia</h2>

      <ul>
        {tarefas.map(item => (
          <Item
            selecionaTarefa={selecionaTarefa}
            key={item.id}
            // passa como props tudo que tem dentro do item e lá no componente Item, desistrutura no parametro "Item({tarefa, tempo})"
            {...item}
          // ou faz assim
          // tarefa={item.tarefa}
          // tempo={item.tempo}
          />
        ))}
      </ul>
    </aside>
  )
}

export default Lista;
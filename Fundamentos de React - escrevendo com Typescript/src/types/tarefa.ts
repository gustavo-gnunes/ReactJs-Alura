// como a interface vai ser usada em mais de um componente, eu crio esse arquivo, declaro as interface que vão ser usadas em mais de um componente...
// ... e ao em vez de toda vez eu declarar uma interface nos componentes, é só importar esse arquivo no componente que vai utilizar essas interface

export interface ITarefa{
  tarefa: string,
  tempo: string,
  selecionado: boolean,
  completado: boolean,
  id: string,
}


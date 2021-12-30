import { createContext, useState } from 'react';

// como estamos usando function, ñ usa assim, utiliza o hook useContext
// // serve para lincar o contexto com o classComponent, utilizando class
// class Component extends React.Component {
//   render () {
//     return (
//       <></>
//     )
//   }
// }
// Component.contextType = UsuarioContext;

// criando contexto
export const UsuarioContext = createContext();
// displayName-> é uma string, é o nome que vai aparecer qdo vc instalar uma extensão no chrome chamada React Context Dev Tool
// para acessar esta extensão vai em inspecionar do navegador-> React Context
// serve para mostrar o que está dentro deste contexto
UsuarioContext.displayName = "Usuario";

export const UsuarioProvider = ({ children }) => {
  const [nome, setNome] = useState('');
  const [saldo, setSaldo] = useState(0);

  return (
    // Provider-> para prover o contexto para o componente
    // value-> qual o valor do contexto, o que vai ter dentro desse contexto. O que o componnete que está dentro do UsuarioProvider(Login no componente routes.js) vai poder ver
    <UsuarioContext.Provider value={{ nome, setNome, saldo, setSaldo }}>
      {children}
    </UsuarioContext.Provider>
  )
}
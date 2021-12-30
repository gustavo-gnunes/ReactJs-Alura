import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UsuarioContext } from 'common/context/Usuario';

import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment
} from '@material-ui/core';

function Login() {
  const history = useHistory();
  // dentro de usarioContext tem tudo que está sendo passado no value do UsuarioContext.Provider (no componente Usuario.js)
  //const usarioContext = useContext(UsuarioContext);
  // pode usar do jeito a cima, mas desse jeito a baixo é melhor, pq vc desistrura o que está vindo, já pengando as variaveis
  const { nome, setNome, saldo, setSaldo } = useContext(UsuarioContext);

  return (
    <Container>
      {/* UsuarioContext.Consumer-> utilizava o Consumer dentro de class, para funções ñ precisa é só usar o hook useContext */}
      {/* Consumer-> para consumir o contexto (utilizar ele) */}
      {/* <UsuarioContext.Consumer>
        se estiver que digitar algo antes do fragment (javascript), deve colocar assim
        {() => {
          //escreve algo aqui
          retrun (
            <>html</>
          )
        }}
        se ñ precisar digitar nada antes do fragment, coloca assim
        ()-> pega o que está dentro do contexto
        {({ nome, setNome, saldo, setSaldo }) => (
          <>html</>
        )}
      </UsuarioContext.Consumer> */}
      <Titulo>
        Insira o seu nome
      </Titulo>
      <InputContainer>
        <InputLabel>
          Nome
        </InputLabel>
        <Input
          type="text"
          onChange={(event) => setNome(event.target.value)}
          value={nome}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
          type="number"
          onChange={(event) => setSaldo(event.target.value)}
          value={saldo}
          startAdornment={
            <InputAdornment position="start">
              R$
            </InputAdornment>
          }
        />
      </InputContainer>
      <Button
        variant="contained"
        color="primary"
        disabled={nome.length < 4} // o botão é desabilitado se o tamanho do nome tiver menos q 4 silabas
        onClick={() => history.push('/feira')}
      >
        Avançar
      </Button>


    </Container>
  )
};

export default Login;
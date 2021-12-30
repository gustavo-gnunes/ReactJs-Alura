import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Container, Voltar, TotalContainer, PagamentoContainer } from './styles';

import { useContext, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { UsuarioContext } from 'common/context/Usuario';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { usePagamentoContext } from 'common/context/Pagamento';

import Produto from 'components/Produto';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { carrinho, valorTotalCarrinho, efetuarCompra } = useCarrinhoContext();
  // saldo = 0-> se saldo for undefined, atribui valor 0
  const { saldo = 0 } = useContext(UsuarioContext); // para pegar o saldo do usuário (da tela inicial)
  const { formaPagamento, tiposPagamento, mudarFormaPagamento } = usePagamentoContext(usePagamentoContext);
  const history = useHistory();
  // useMemo-> só muda uma variavel qdo vc quiser q ela mude. Ex: só vai calcular o total, qdo o saldo ou a valorTotalCarrinho mudar (que é o que vai ser passado dentro do [])
  // usa isso para ñ ficar renderizando a tela desnecessário. Ex: mudou o nome do usuario, mas ñ mudou o total, se ñ fizer assim, qdo mudar o nome do usuario o total vai renderizar, e desse jeito ñ renderiza, pq só vai renderizar se mudar alguma variavel que está dentro do []
  const total = useMemo(() => saldo - valorTotalCarrinho, [saldo, valorTotalCarrinho]); // para saber qto resta do saldo do usuário

  return (
    <Container>
      {/* goBack-> volta para tela anterior q estava navegando */}
      <Voltar onClick={() => history.goBack()} />
      <h2>
        Carrinho
      </h2>

      {carrinho.map(produto => (
        <Produto
          {...produto}
          key={produto.id}
        />
      ))}

      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          onChange={(event) => mudarFormaPagamento(event.target.value)}
          value={formaPagamento.id}
        >

        {/* mostrar todos os tipos de pagamento (Boleto, Cartão de Crédito, PIX, Crediário) */}
        {tiposPagamento.map(pagamento => (
          <MenuItem value={pagamento.id} key={pagamento.id}>
            {pagamento.nome}
          </MenuItem>
        ))}

        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total no Carrinho: </h2>
          {/* .toFixed(2)-> para deixar o valor com 2 casa decimais depois da virgula */}
          <span>R$ {valorTotalCarrinho.toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ {Number(saldo).toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ {total.toFixed(2)}</span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          efetuarCompra();
          setOpenSnackbar(true);
        }}
        disabled={total < 0 || carrinho.length === 0} // deixa o botão desabilitado se o Saldo Total for negativo ou se ñ tiver nenhum produto no carrinho, ñ deixando efetuar a compra
        color="primary"
        variant="contained"
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={
          {
            vertical: 'top',
            horizontal: 'right'
          }
        }
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

export default Carrinho;
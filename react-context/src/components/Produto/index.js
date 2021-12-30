import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { useCarrinhoContext } from 'common/context/Carrinho';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {
  // {carrinho, adicionarProduto}-> é o que está sendo retornado de dentro do useCarrinhoContext do arquivo Carrinho.js
  // adicionarProduto-> é uma função para adicionar um produto no carrinho
  // coloca a função adicionarProduto dentro do arquivo Carrinho.js, para tirar a responsabilidade do componente Produto
  // o componnete Produto ñ precisa ter a responsabilidade de como deve add um produto, ele ñ precisa saber se o produto existe ou ñ. Ele só precisa saber q ele tem que executar o adicionarProduto
  // deixa essa responsabilidade para o Carrinho.js, para o proprio contexto (o proprio hook)
  const { carrinho, adicionarProduto, removerProduto } = useCarrinhoContext();

  // para encontrar o produto de dentro do carrinho. Faz isso para saber e exibir a qdte de cada produto
  // id-> esse id é o que está vindo por props
  const produtoNoCarrinho = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === id);

  return (
    <Container>
      <div>
        <img
          src={`/assets/${foto}.png`}
          alt={`foto de ${nome}`}
        />
        <p>
          {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton
          color="secondary"
          onClick={() => removerProduto(id)}
          disabled={!produtoNoCarrinho} // desabilita o botão, qdo um determinado produto ñ existir (qtde estiver 0)
        >
          <RemoveIcon />
        </IconButton>

        {/* ?-> deve colocar o ?, pq qdo carrega a página dos produtos, não vai ter nada carregado no carrinho e o produtoNoCarrinho é undefined, então dá erro */}
        {/* ||-> se o produtoNoCarrinho estiver algo, mostra a quantidade, se não mostra 0 */}
        {produtoNoCarrinho?.quantidade || 0}

        <IconButton 
          color="primary" 
          onClick={() => adicionarProduto({ nome, foto, id, valor })}
        >
          <AddIcon />
        </IconButton>
      </div>
    </Container >
  )
}

export default memo(Produto)
import { createContext, useState, useContext, useEffect } from 'react';
import { usePagamentoContext } from './Pagamento';
import { UsuarioContext } from './Usuario';

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = 'Carrinho';

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        quantidadeProdutos,
        setQuantidadeProdutos,
        valorTotalCarrinho,
        setValorTotalCarrinho
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

// criando um hook customizado
export const useCarrinhoContext = () => {
  // consigo desistruturar e pegar o carrinho e o setCarrinho, que vem de dentro do CarrinhoContext
  // CarrinhoContext-> pega o value que vem dentro do CarrinhoContext.Provider
  const { 
    carrinho, 
    setCarrinho, 
    quantidadeProdutos, 
    setQuantidadeProdutos,
    valorTotalCarrinho,
    setValorTotalCarrinho
  } = useContext(CarrinhoContext);

  // pegar a forma de pagamento selecionada, para ver se precisa acrescentar juros na hora de finalizar a compra
  const { formaPagamento } = usePagamentoContext();
  const { setSaldo } = useContext(UsuarioContext); // para atualizar o saldo, qdo a compra for concluida 

  function mudarQuantidade(id, quantidade) {
    return carrinho.map(itemDoCarrinho => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    })
  }

  function adicionarProduto(novoProduto) {
    // some()-> é uma função de array do javascript, q retorna um boolean para saber se existe ou ñ a validação de dentro do parametro
    // para saber se o produto já existe no carrinho
    const temOProduto = carrinho.some(itemDoCarrinho => itemDoCarrinho.id === novoProduto.id);
    if (!temOProduto) {
      novoProduto.quantidade = 1; // add uma quantidade
      // add o produto no carrinho
      return setCarrinho(carrinhoAnterior =>
        [...carrinhoAnterior, novoProduto]
      )
    }
    // entra aqui se o produto já existir
    // deve procurar o produto e qdo achar add a quantidade do produto
    setCarrinho(mudarQuantidade(novoProduto.id, 1));

  }

  function removerProduto(id) {
    // retorna se achou o produto
    const produto = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === id)
    // para ver se existe só uma qdte daquele produtoi que vai ser excluido
    const ehOUltimo = produto.quantidade === 1;

    // se for o ultimo, deve excluir o produto do carrinho
    if (ehOUltimo) {
      // para filtrar o produto, para excluir. filter-> se for diferente, mantem o item no carrinho, se for igual tira
      return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemDoCarrinho => itemDoCarrinho.id !== id))
    }
    // se ñ for o ultimo, só deve excluir uma qtde do determinado produto
    setCarrinho(mudarQuantidade(id, -1));

  }

  // finalizar compra
  function efetuarCompra() {
    setCarrinho([]); // limpa o carrinho, pois a compra vai ser concluida
    setSaldo(saldoAtual => saldoAtual - valorTotalCarrinho); // atualizar o saldo qdo a compra for concluida
  }

  // para ver se existe produto no carrinho (pega a qdte e o valor total de todos os produtos). 
  // Vou usar a quantidadeProdutos no componente Feira-> NavBar-> index.js, uso lá por causa do ícone do carrinho, ele add a qtde total do carrinho, em cima do ícone do carrinho
  useEffect(() => {
    // reduce-> faz um loop em cada item do array e joga para uma determinada variavel. 
    // o reduce pede 2 parametros. 1º é o contador e o 2º é o produto-> para ver qual é o proximo produto
    // 0-> indica q o contador inicia com 0
    // este calcula só a qtde
    // const novaQuantidade = carrinho.reduce((contador, produto) => contador + produto.quantidade, 0)
    // este calcula a qtde e o valor
    // onde é contador + produto.quantidade, colocar ({})-> o () significa q estou retornando e o {} que vai ser retornado um objeto
    // onde no outro é 0, aqui vai ser um objeto q vai ter novaQuantidade e novoTotal que ambos é 0, pois eles começam com 0
    const { novoTotal, novaQuantidade } = carrinho.reduce((contador, produto) => ({
      novaQuantidade: contador.novaQuantidade + produto.quantidade, // coloca o valor q já tinha no contador.novaQuantidade + o valor atual q é produto.quantidade
      novoTotal: contador.novoTotal + (produto.valor * produto.quantidade) // para saber o valor total, contador.novoTotal-> pega o valor que já tem, mais o q vai ser calculado em  (produto.valor * produto.quantidade) . Ex: tomate é 2,48 e compro 2, produto.valor 2,48, produto.quantidade 2
    }), {
      novaQuantidade: 0, // para iniciar com 0, se ñ tiver valor se inicia com 0
      novoTotal: 0
    });

    setQuantidadeProdutos(novaQuantidade);
    // se tiver juros na forma de pagamento q foi seleciona, ele calcula aqui. Ex: finalizar compra no boleto, ñ tem juros, mas no cartão de crédito, tem juros
    // esse juros estão pré fixados no componente common-> context-> Pagamento.js
    setValorTotalCarrinho(novoTotal * formaPagamento.juros); 


  }, [carrinho, setQuantidadeProdutos, setValorTotalCarrinho, formaPagamento])

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    quantidadeProdutos,
    setQuantidadeProdutos,
    valorTotalCarrinho,
    efetuarCompra
  }
}
import { createContext, useState, useContext } from 'react';

export const PagamentoContext = createContext();
PagamentoContext.displayName = 'Pagamento';

export const PagamentoProvider = ({ children }) => {
  const tiposPagamento = [
    {
      nome: 'Boleto',
      juros: 1, // 1-> pq qdo a forma de pagamento é boleto, ñ tem juros, como vai pegar o valor da compra e multiplicar pelo juros, qq numero * 1-> dá ele mesmo
      id: 1
    },
    {
      nome: 'Cartão de Crédito',
      juros: 1.3, // 1.3-> pagamentos com cartão de crédito, vai ter 30% de juros
      id: 2
    },
    {
      nome: 'PIX',
      juros: 1, // ñ tem juros para pagar com pix
      id: 3
    },
    {
      nome: 'Crediário',
      juros: 1.5, // 50% de juros
      id: 4
    }
  ];

  // para saber qual forma de pagamento está selecionada, por padrão deixa como Boleto
  const [formaPagamento, setFormaPagamento] = useState(tiposPagamento[0]);

  return (
    <PagamentoContext.Provider value={{
      tiposPagamento,
      formaPagamento,
      setFormaPagamento
    }}>
      {children}
    </PagamentoContext.Provider>
  )
}

export const usePagamentoContext = () => {
  const { tiposPagamento, formaPagamento, setFormaPagamento } = useContext(PagamentoContext);

  // para mudar a forma de pagamento, conseguir selecionar outra forma de pagamento existente
  // id-> esse id vem do onChange de dentro de pages-> Carrinho. O event.target.value é o id da forma de pagamento q está selecionado
  function mudarFormaPagamento(id) {
    // encontrar qual foi o pagamento selecionado pelo usuário
    const pagamentoAtual = tiposPagamento.find(pagamento => pagamento.id === id);

    setFormaPagamento(pagamentoAtual);
  }

  return {
    tiposPagamento,
    formaPagamento,
    mudarFormaPagamento
  }
}
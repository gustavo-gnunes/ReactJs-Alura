import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import { useHistory } from 'react-router-dom';

import { useCarrinhoContext } from 'common/context/Carrinho';

export default function NavBar() {
  const { quantidadeProdutos } = useCarrinhoContext();
  const history = useHistory();

  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={quantidadeProdutos === 0} // desabilita o ícone do carrinho, caso a quantidadeProdutos for 0, significa q ñ tem nenhuma produto selecionado ainda
        onClick={() => history.push('/carrinho')}
      >
        <Badge
          color="primary"
          badgeContent={quantidadeProdutos}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}
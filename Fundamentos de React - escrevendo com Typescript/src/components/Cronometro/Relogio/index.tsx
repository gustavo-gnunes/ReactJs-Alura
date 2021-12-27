import style from './Relogio.module.scss';

interface Props {
  tempo: number | undefined;
}

// tempo = 0-> se o tempo vier na props como undefined ou nulo, eu passo um valor padrão pra ele, neste caso zero
// se vier com algum valor, ele pega o valor passado e descarta o zero
export default function Relogio({ tempo = 0 }: Props) {
  // Math.floor-> pega somente o numero antes da virgula, arredonda pra baixo
  const minutos = Math.floor(tempo / 60); // transforma segundos em minutos

  // %-> pega somente o numero depois da virgula (a parte que sobra)
  const segundos = tempo % 60; // pega o resto da divisão, que vai ser os segundos

  // [minutosDezena, minutoUnidade]-> para o typescript para de dar erro, colocar no arquivo tsconfig.json ("downlevelIteration": true,)
  // desistrutura o minuto, minutoDezena-> pega o primeiro numero (posição 0 do array), minutoUnidade-> pega o segundo numero (posição 1)
  // deve fazer isso, pois cada span é um numero, 1 span não pega todo o minuto. Ex: 14min, um span pega o 1 e o outro pega o 4
  // padStart()-> para ter uma cadeia de caracteres padrão e se não tiver o numero ele coloca. Ex: 3-> ele coloca 03, se for 14-> ele deixa como está
  // padStart(2, '0')-> primeiro paramentro é a largura de caracteres, segundo parametro-> qual vai ser o caracter default que vai ser colocado, que neste caso vai ser o zero
  const [minutosDezena, minutoUnidade] = String(minutos).padStart(2, '0');
  const [segundoDezena, segundoUnidade] = String(segundos).padStart(2, '0');

  return (
    <>
      <span className={style.relogioNumero}>{minutosDezena}</span>
      <span className={style.relogioNumero}>{minutoUnidade}</span>
      <span className={style.relogioDivisao}>:</span>
      <span className={style.relogioNumero}>{segundoDezena}</span>
      <span className={style.relogioNumero}>{segundoUnidade}</span>
    </>
  )
}
// conveter horas, minutos e segundos, para segundos
export function tempoParaSegundos(tempo: string) {
  // split-> pega um string e quebra ela. Neste caso, toda vez que achar o : a string vai ser quebrada
  // primeiro item do array é a horas, o segundo é o minutos e o terceiro é o segundos
  // horas = '0'-> caso não vem nada na horas, por padrão ele coloca zero, a mesma coisa com minutos e segundos
  const [horas = '0', minutos = '0', segundos = '0'] = tempo.split(':')

  // Number-> transforma string em numero
  const horasEmSegundos = Number(horas) * 3600; // 1h equivale a 3600 segundos
  const minutosEmSegundos = Number(minutos) * 60; // 1min equivale a 60 segundos

  return horasEmSegundos + minutosEmSegundos + Number(segundos);
}
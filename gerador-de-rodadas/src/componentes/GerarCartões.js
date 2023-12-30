function distribuirParticipantes(participantes, numRodadas, numMesasPorRodada, limitePorMesa) {
  const mesas = [];
  const rodadas = Array.from({ length: numRodadas }, () => []);

  for (let i = 0; i < numRodadas; i++) {
      for (let j = 0; j < numMesasPorRodada; j++) {
          const mesa = Array.from({ length: limitePorMesa }, () => null);
          mesas.push(mesa);
      }
  }

  const participantesPorRodada = participantes.length / numRodadas;
  const mesasPorParticipantePorRodada = numMesasPorRodada / participantesPorRodada;

  for (let participanteIndex = 0; participanteIndex < participantes.length; participanteIndex++) {
      for (let rodada = 0; rodada < numRodadas; rodada++) {
          const mesaIndex = (participanteIndex * mesasPorParticipantePorRodada + rodada) % numMesasPorRodada;
          const mesa = mesas[rodada * numMesasPorRodada + mesaIndex];
          const participante = participantes[participanteIndex];

          for (let assentoIndex = 0; assentoIndex < limitePorMesa; assentoIndex++) {
              if (mesa[assentoIndex] === null) {
                  mesa[assentoIndex] = participante;
                  rodadas[rodada].push({ participante, mesa: mesaIndex + 1 });
                  break;
              }
          }
      }
  }

  return rodadas;
}

// Exemplo de uso:
const participantes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const numRodadas = 5;
const numMesasPorRodada = 5;
const limitePorMesa = 2;

const distribuicao = distribuirParticipantes(participantes, numRodadas, numMesasPorRodada, limitePorMesa);
console.log(distribuicao);

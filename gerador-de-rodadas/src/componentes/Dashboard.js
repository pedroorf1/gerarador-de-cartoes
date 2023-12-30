import React, { useState } from "react";

const handleGerarCartoes = (
  numeroParticipantes,
  tempoMaximoEvento,
  tempoPorRodada,
  numeroMaximoPorMesa,
  setParticipantesRodadas
) => {
  const numeroRodadas = Math.floor(tempoMaximoEvento / tempoPorRodada);
  const numeroMesas = Math.ceil(numeroParticipantes / numeroMaximoPorMesa);

  if (numeroMesas < 2) {
    alert("Não há mesas suficientes para acomodar os participantes.");
    return;
  }

  const interacoesParticipantes = Array.from({ length: numeroParticipantes }, () => []);

  const participantes = Array.from({ length: numeroParticipantes }, (_, index) => index + 1);
  const mesas = Array.from({ length: numeroMesas }, () => []);

  const shuffleArray = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const shuffledParticipantes = shuffleArray(participantes);

  shuffledParticipantes.forEach((participante) => {
    let mesaIndex = 0;
    let participanteAdicionado = false;

    while (mesaIndex < numeroMesas && !participanteAdicionado) {
      const mesaSelecionada = mesas[mesaIndex];

      if (
        mesaSelecionada.length < numeroMaximoPorMesa &&
        !mesaSelecionada.some((outroParticipante) => interacoesParticipantes[participante - 1][outroParticipante - 1])
      ) {
        mesaSelecionada.push(participante);
        mesas[mesaIndex] = mesaSelecionada;

        mesaSelecionada.forEach((outroParticipante) => {
          interacoesParticipantes[participante - 1][outroParticipante - 1] = true;
          interacoesParticipantes[outroParticipante - 1][participante - 1] = true;
        });

        participanteAdicionado = true;
      }

      mesaIndex++;
    }
  });
  const rodadasParticipantes = Array.from({ length: numeroParticipantes }, () => []);

  for (let participante = 1; participante <= numeroParticipantes; participante++) {
    const mesasJaVisitadas = [];

    for (let rodada = 1; rodada <= numeroRodadas; rodada++) {
      const mesasDisponiveis = mesas
        .map((_, index) => index)
        .filter((mesa) => !mesasJaVisitadas.includes(mesa));

      const mesaAtual = mesasDisponiveis[Math.floor(Math.random() * mesasDisponiveis.length)];

      rodadasParticipantes[participante - 1].push({
        rodada: rodada,
        mesa: mesaAtual + 1,
      });

      mesasJaVisitadas.push(mesaAtual);

      const interacoesAtuais = interacoesParticipantes[participante - 1];
      const participantesOutrasMesas = participantes.filter(
        p => p !== participante && !interacoesAtuais[p - 1]
      );

      const participantesDisponiveis = participantesOutrasMesas.filter(
        p => !mesas[mesaAtual].some(otherParticipant => interacoesAtuais[otherParticipant - 1])
      );

      const indexOutros = Math.floor(Math.random() * participantesDisponiveis.length);
      rodadasParticipantes[participante - 1][rodada - 1].outrosParticipantes =
        indexOutros >= 0 ? participantesDisponiveis[indexOutros] : "Nenhum";
    }
  }

  setParticipantesRodadas(rodadasParticipantes);
  rodadasParticipantes.forEach((rodadas, index) => {
    console.log(`Participante ${index + 1}`);
    if (rodadas.length === 0) {
      console.log('Sem rodadas');
    } else {
      rodadas.forEach((rodada) => {
        console.log(`  Rodada ${rodada.rodada}: Mesa ${rodada.mesa}`);
      });
    }
    console.log('-------------------------');
  });
};

const PaginaDados = () => {
  const [numeroParticipantes, setNumeroParticipantes] = useState("");
  const [tempoMaximoEvento, setTempoMaximoEvento] = useState("");
  const [tempoPorRodada, setTempoPorRodada] = useState("");
  const [numeroMaximoPorMesa, setNumeroMaximoPorMesa] = useState("");
  const [participantesRodadas, setParticipantesRodadas] = useState({});

  const gerarCartoes = () => {
    handleGerarCartoes(
      Number(numeroParticipantes),
      Number(tempoMaximoEvento),
      Number(tempoPorRodada),
      Number(numeroMaximoPorMesa),
      setParticipantesRodadas
    );
  };

  return (
    <div>
      <h2>Insira os dados:</h2>
      <label htmlFor="numeroParticipantes">Número de participantes:</label>
      <input
        id="numeroParticipantes"
        type="number"
        value={numeroParticipantes}
        onChange={(e) => setNumeroParticipantes(e.target.value)}
      />
      <label htmlFor="tempoMaximoEvento">Tempo Máximo do Evento:</label>
      <input
        id="tempoMaximoEvento"
        type="number"
        value={tempoMaximoEvento}
        onChange={(e) => setTempoMaximoEvento(e.target.value)}
      />
      <label htmlFor="tempoPorRodada">Tempo por rodada:</label>
      <input
        id="tempoPorRodada"
        type="number"
        value={tempoPorRodada}
        onChange={(e) => setTempoPorRodada(e.target.value)}
      />
      <label htmlFor="numeroMaximoPorMesa">Participantes por mesa:</label>
      <input
        id="numeroMaximoPorMesa"
        type="number"
        value={numeroMaximoPorMesa}
        onChange={(e) => setNumeroMaximoPorMesa(e.target.value)}
      />
      <button onClick={gerarCartoes}>Gerar Cartões</button>
    </div>
  );
};

export default PaginaDados;

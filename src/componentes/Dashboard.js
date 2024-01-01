import React, { useState } from "react";
import handleGerarCartoes from "./GerarCartoes";


const PaginaDados = () => {
  const [numeroParticipantes, setNumeroParticipantes] = useState("");
  const [tempoMaximoEventoHoras, setTempoMaximoEventoHoras] = useState("");
  const [tempoPorRodadaHoras, setTempoPorRodadaHoras] = useState("");
  const [numeroMaximoPorMesa, setNumeroMaximoPorMesa] = useState("");

  const gerarCartoes = () => {
    handleGerarCartoes(
      Number(numeroParticipantes),
      Number(tempoMaximoEventoHoras),
      Number(tempoPorRodadaHoras),
      Number(numeroMaximoPorMesa)
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
      <label htmlFor="tempoMaximoEvento">Tempo Máximo do Evento (horas):</label>
      <input
        id="tempoMaximoEvento"
        type="number"
        value={tempoMaximoEventoHoras}
        onChange={(e) => setTempoMaximoEventoHoras(e.target.value)}
      />
      <label htmlFor="tempoPorRodada">Tempo por rodada (horas):</label>
      <input
        id="tempoPorRodada"
        type="number"
        value={tempoPorRodadaHoras}
        onChange={(e) => setTempoPorRodadaHoras(e.target.value)}
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

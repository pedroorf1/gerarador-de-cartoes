const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const handleGerarCartoes = (
    numeroParticipantes,
    tempoMaximoEventoHoras,
    tempoPorRodadaHoras,
    numeroMaximoPorMesa
  ) => {
    const rodadasPossiveis = Math.floor(
      tempoMaximoEventoHoras / tempoPorRodadaHoras
    );
    const mesas = Math.ceil(numeroParticipantes / numeroMaximoPorMesa);
    const encontrosArray = []; // Array para armazenar todos os encontros por rodada
    const participantes = Array.from(
      { length: numeroParticipantes },
      (_, index) => index + 1
    );
    console.log("Distribuição de Participantes:");
    const encontrosRegistrados = new Set(); // Set para rastrear os encontros já registrados
  
    const shuffleParticipants = shuffleArray(participantes);
  
    for (let i = 1; i <= rodadasPossiveis; i++) {
      const encontrosRodada = []; // Array para armazenar os encontros da rodada atual
      const participantesRestantes = shuffleArray([...shuffleParticipants]); // Embaralhar a ordem dos participantes para cada rodada
      console.log(`Rodada ${i}:`);
  
      for (let j = 1; j <= mesas && participantesRestantes.length > 0; j++) {
        const participantesNaMesa = [];
        const encontradosNaMesa = new Set();
  
        for (let k = 0; k < numeroMaximoPorMesa && participantesRestantes.length > 0; k++) {
          const participanteAtual = participantesRestantes.shift();
          let encontrado = false;
  
          for (const outroParticipante of shuffleParticipants) {
            const encontro1 = `${participanteAtual}-${outroParticipante}`;
            const encontro2 = `${outroParticipante}-${participanteAtual}`;
  
            if (
              participanteAtual !== outroParticipante &&
              !encontrosRegistrados.has(encontro1) &&
              !encontrosRegistrados.has(encontro2) &&
              !encontradosNaMesa.has(outroParticipante)
            ) {
              participantesNaMesa.push(participanteAtual);
              encontrosRegistrados.add(encontro1);
              encontrosRegistrados.add(encontro2);
              encontradosNaMesa.add(outroParticipante);
              encontrado = true;
              break;
            }
          }
  
          if (!encontrado) {
            participantesRestantes.push(participanteAtual); // Devolve o participante para tentar na próxima mesa
            break;
          }
        }
  
        console.log(`Mesa ${j}:`, participantesNaMesa);
        encontrosRodada.push(participantesNaMesa);
      }
  
      // Realoca os participantes que não tiveram todos os encontros para a próxima rodada
      const participantesSemEncontro = participantes.filter(
        (participante) => !encontrosRegistrados.has(`${participante}-X`)
      );
  
      shuffleArray(participantesSemEncontro); // Embaralha a ordem dos participantes sem encontros
      shuffleParticipants.push(...participantesSemEncontro.slice(0, mesas * numeroMaximoPorMesa));
      
      encontrosArray.push(...encontrosRodada);
    }
  
    console.log("Array de Encontros:");
    console.log(encontrosArray);
  };
  
  export default handleGerarCartoes;
  
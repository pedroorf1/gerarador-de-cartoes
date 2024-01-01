import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { handleGerarCartoes } from '../componentes/Dashboard';
import { participanteJaNaMesa } from '../componentes/Dashboard';
import PaginaDados from '../componentes/Dashboard';

describe('PaginaDados Component', () => {
  test('renderiza corretamente os inputs', () => {
    const { getByLabelText } = render(<PaginaDados />);
    const numeroParticipantesInput = getByLabelText('Número de participantes:');
    const tempoMaximoEventoInput = getByLabelText('Tempo Máximo do Evento:');
    // Adicione verificações para os outros inputs conforme necessário
    expect(numeroParticipantesInput).toBeInTheDocument();
    expect(tempoMaximoEventoInput).toBeInTheDocument();
    // Adicione mais expectativas para os outros inputs conforme necessário
  });

  test('alteração nos inputs atualiza o estado', () => {
    const { getByLabelText } = render(<PaginaDados />);
    const numeroParticipantesInput = getByLabelText('Número de participantes:');
    fireEvent.change(numeroParticipantesInput, { target: { value: '10' } });
    expect(numeroParticipantesInput.value).toBe('10');
    // Repita o mesmo processo para os outros inputs
  });

  test('gerar cartões atualiza corretamente o estado', () => {
    // Mock da função setParticipantesRodadas
    const setParticipantesRodadas = jest.fn();

    // Simular um cenário com 12 participantes, tempo de evento de 5, tempo por rodada de 1 e limite de 4 por mesa
    const numeroParticipantes = 12;
    const tempoMaximoEvento = 5;
    const tempoPorRodada = 1;
    const numeroMaximoPorMesa = 4;

    // Chama a função para gerar os participantesAssociados
    handleGerarCartoes(numeroParticipantes, tempoMaximoEvento, tempoPorRodada, numeroMaximoPorMesa, setParticipantesRodadas);

    // Aqui, você pode verificar se o estado foi atualizado corretamente após o clique no botão
    // Por exemplo:
    // Verifique se o estado `participantesRodadas` foi atualizado com os valores esperados
    // Verifique se o console.log produz o resultado esperado ou se chama a função de maneira adequada
    expect(setParticipantesRodadas).toHaveBeenCalled();
  });

  test('não gera encontros repetidos entre participantes', () => {
    // Simular um cenário com 10 participantes, tempo de evento de 60, tempo por rodada de 15 e limite de 4 por mesa
    const numeroParticipantes = 10;
    const tempoMaximoEvento = 60;
    const tempoPorRodada = 15;
    const numeroMaximoPorMesa = 4;

    // Chama a função para gerar os participantesAssociados
    const participantesAssociados = handleGerarCartoes(numeroParticipantes, tempoMaximoEvento, tempoPorRodada, numeroMaximoPorMesa);

    // Verifica se não há encontros repetidos entre participantes em diferentes rodadas
    let encontrouRepetido = false;
    Object.keys(participantesAssociados).forEach(participante => {
      for (let i = 0; i < participantesAssociados[participante].length; i++) {
        if (participanteJaNaMesa(participante, i, participantesAssociados)) {
          encontrouRepetido = true;
          break;
        }
      }
    });

    expect(encontrouRepetido).toBe(false);
  });

  test('não excede o limite por mesa', () => {
    // Simular um cenário com 10 participantes, tempo de evento de 60, tempo por rodada de 15 e limite de 4 por mesa
    const numeroParticipantes = 10;
    const tempoMaximoEvento = 60;
    const tempoPorRodada = 15;
    const numeroMaximoPorMesa = 4;

    // Chama a função para gerar os participantesAssociados
    const participantesAssociados = handleGerarCartoes(numeroParticipantes, tempoMaximoEvento, tempoPorRodada, numeroMaximoPorMesa);

    // Verifica se o limite por mesa não é excedido em nenhuma rodada
    let excedeuLimitePorMesa = false;
    Object.keys(participantesAssociados).forEach(participante => {
      for (let i = 0; i < participantesAssociados[participante].length; i++) {
        const mesaAtual = participantesAssociados[participante][i].mesa;
        const participantesNaMesa = Object.values(participantesAssociados)
          .map(rodadas => rodadas[i])
          .filter(participante => participante.mesa === mesaAtual);

        if (participantesNaMesa.length > numeroMaximoPorMesa) {
          excedeuLimitePorMesa = true;
          break;
        }
      }
    });

    expect(excedeuLimitePorMesa).toBe(false);
  });
});

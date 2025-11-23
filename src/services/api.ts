const BASE_URL = 'http://localhost:5000/api';

export interface User {
  cpf: string;
  name: string;
}

export const api = {
  //LOGIN
  async login(cpf: string) {
    const cleanCpf = cpf.replace(/\D/g, '');
    
    console.log("Enviando CPF:", cleanCpf); 

    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf: cleanCpf })
    });

    const data = await response.json();
    
    if (!response.ok) {
        console.error("Erro do Python:", data);
        throw new Error(data.message || 'Erro na requisição');
    }
    
    return data;
  },

  //GERAR TREINO
  async gerarTreino(dados: any) {
    const response = await fetch(`${BASE_URL}/gerar-treino`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados)
    });
    return await response.json();
  },

  //BUSCAR HISTÓRICO
  async getHistorico(cpf: string) {
    const response = await fetch(`${BASE_URL}/historico?cpf=${cpf}`, {
      method: 'GET'
    });
    return await response.json();
  },

  //DELETAR TREINO (NOVO)
  async deleteHistorico(cpf: string, timestamp: string) {
    const url = `${BASE_URL}/historico?cpf=${cpf}&timestamp=${encodeURIComponent(timestamp)}`;
    
    const response = await fetch(url, {
      method: 'DELETE'
    });
    
    return await response.json();
  }
};
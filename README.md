<div align="center">

  <h1>🏋️‍♂️ GO PLAN</h1>

  <p>
    <strong>Gerador de Treinos Personalizados Desktop</strong>
  </p>


  ![Badge Tauri](https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=tauri&logoColor=black)
  ![Badge React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Badge TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Badge Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
  ![Badge Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
  ![Badge Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

<br />

## 📋 Sobre

O **GoPlan** é uma aplicação desktop moderna desenvolvida para gerar, gerenciar e imprimir planos de treino personalizados. 

O projeto utiliza a seguinte arquitetura: a interface leve e reativa é construída com **React + TypeScript**, enquanto toda a lógica de negócios e geração de treinos roda em um backend **Python** embutido, orquestrados pelo framework **Tauri**.

## Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

* **Frontend:** React, TypeScript, Vite, TailwindCSS, Shadcn UI.
* **Backend:** Python 3, Flask.
* **Desktop Wrapper:** Tauri (Rust).
* **Build Tools:** PyInstaller (para empacotar o Python), NPM.

##  Funcionalidades

*  **Login via CPF:** Sistema de autenticação simples baseado em arquivo JSON.
*  **Geração de Treinos:** Algoritmo em Python que cria treinos baseados em:
    * Nível (Iniciante, Intermediário, Avançado).
    * Objetivo (Hipertrofia, Perda de Peso).
    * Frequência semanal e Prioridade muscular.
*  **Histórico:** Salvamento automático dos treinos gerados para consulta futura.
*  **Impressão/PDF:** Layout otimizado para impressão direta ou salvamento em PDF para levar à academia.
*  **Totalmente Offline:** O servidor Python é empacotado junto com o app, não requer internet ou instalação prévia de Python na máquina do usuário.

## 💻 Como Rodar

### Pré-requisitos

* Node.js e NPM instalados.
* Python instalado.
* Rust instalado (necessário para o Tauri).

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/marcusaugustoo/projeto-sistema-de-academia.git
    cd projeto-sistema-de-academia
    ```

2.  **Instale as dependências do Frontend:**
    ```bash
    npm install
    ```

3.  **Configuração do Backend (Sidecar):**
    O projeto espera um executável Python na pasta `src-tauri`.
    
    * Vá até a pasta onde está o script `server.py`.
    * Gere o executável:
        ```bash
        python -m PyInstaller -F server.py
        ```
    * Mova o arquivo `server.exe` gerado (na pasta `dist`) para dentro de `src-tauri/`.
    * Certifique-se de que `cpf.json`, `exercises.json` e `workout_history.json` também estejam em `src-tauri/`.

4.  **Rodar em Desenvolvimento:**
    ```bash
    npm run tauri dev
    ```

5.  **Gerar Instalador (Build Final):**
    ```bash
    npm run tauri build
    ```
    *O instalador será gerado em `src-tauri/target/release/bundle/nsis/`.*

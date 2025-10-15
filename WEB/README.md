#  Agenda com Tarefas e Calendário

Este projeto é uma aplicação web que permite ao usuário organizar eventos e tarefas de forma interativa. Ele utiliza HTML, CSS e JavaScript puro, com a biblioteca [FullCalendar](https://fullcalendar.io/) para exibir um calendário dinâmico.

##  Requisitos para Desenvolvimento

- [Visual Studio Code](https://code.visualstudio.com/)
- Extensão recomendada: **Live Server** (Ritwick Dey)
- Navegador moderno (Chrome, Firefox, Edge)

---

##  Estrutura do Projeto

- index.html----------- Estrutura da interface
- style/estilo.css----- Estilos visuais
- script/funçao.js----- Lógica e interatividade


## Como Executar no VSCode

1. Abra a pasta do projeto no VSCode
2. Instale a extensão **Live Server** (caso não tenha)
3. Clique com o botão direito no `index.html` e selecione **"Open with Live Server"**
4. O navegador abrirá automaticamente com a aplicação rodando localmente

---

##  Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- FullCalendar (via CDN)

---

## Funcionalidades

- Adicionar eventos com título, data, hora e descrição
- Visualizar eventos no calendário
- Criar tarefas vinculadas aos eventos
- Marcar tarefas como concluídas ou pendentes
- Editar e excluir tarefas
- Filtrar tarefas por status
- Armazenamento local com `localStorage`



## Armazenamento Local

Os dados são salvos no navegador usando `localStorage`:

- `tarefas`: lista de tarefas
- `eventos`: lista de eventos do calendário

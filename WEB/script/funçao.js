document.addEventListener('DOMContentLoaded', () => {
  const calendarioEl = document.getElementById('calendario');
  const formAgenda = document.getElementById('form-agenda');
  const listas = {
    todas: document.getElementById('todas-tarefas'),
    pendentes: document.getElementById('pendentes-tarefas'),
    concluidas: document.getElementById('concluidas-tarefas')
  };

  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  let eventosSalvos = JSON.parse(localStorage.getItem('eventos')) || [];

  function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  function criarBotao(texto, onClick) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.onclick = onClick;
    return btn;
  }

  function criarItemTarefa(tarefa, index) {
    const li = document.createElement('li');
    li.textContent = `${tarefa.texto} (${tarefa.data})`;
    if (tarefa.concluida) li.classList.add('concluida');

    li.appendChild(criarBotao(tarefa.concluida ? 'Reativar' : 'Concluir', () => {
      tarefa.concluida = !tarefa.concluida;
      salvarTarefas();
      renderizarTarefas();
    }));

    li.appendChild(criarBotao('Editar', () => {
      const novoTexto = prompt('Editar tarefa:', tarefa.texto);
      if (novoTexto) {
        tarefa.texto = novoTexto;
        salvarTarefas();
        renderizarTarefas();
      }
    }));

    li.appendChild(criarBotao('Excluir', () => {
      tarefas.splice(index, 1);
      salvarTarefas();
      renderizarTarefas();
    }));

    return li;
  }

  function renderizarTarefas() {
    Object.values(listas).forEach(ul => ul.innerHTML = '');

    tarefas.forEach((tarefa, index) => {
      const item = criarItemTarefa(tarefa, index);
      listas.todas.appendChild(item.cloneNode(true));
      (tarefa.concluida ? listas.concluidas : listas.pendentes).appendChild(criarItemTarefa(tarefa, index));
    });
  }

  document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const ul = listas[btn.dataset.filtro];
      ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
    });
  });

  const calendario = new FullCalendar.Calendar(calendarioEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: eventosSalvos,
    dateClick(info) {
      const tarefasDoDia = tarefas.filter(t => t.data === info.dateStr);
      if (!tarefasDoDia.length) return alert('Nenhuma tarefa neste dia.');

      const opcoes = tarefasDoDia.map((t, i) => `${i + 1}. ${t.texto}`).join('\n');
      const escolha = prompt(`Tarefas em ${info.dateStr}:\n${opcoes}\nDigite o número para editar ou excluir:`);
      const index = parseInt(escolha) - 1;
      const tarefaSelecionada = tarefasDoDia[index];

      if (tarefaSelecionada) {
        const acao = prompt('Digite "editar" ou "excluir":');
        const globalIndex = tarefas.indexOf(tarefaSelecionada);

        if (acao === 'editar') {
          const novoTexto = prompt('Novo texto da tarefa:', tarefaSelecionada.texto);
          if (novoTexto) {
            tarefas[globalIndex].texto = novoTexto;
            salvarTarefas();
            renderizarTarefas();
          }
        } else if (acao === 'excluir') {
          tarefas.splice(globalIndex, 1);
          salvarTarefas();
          renderizarTarefas();
        }
      }
    }
  });

  calendario.render();

  formAgenda.addEventListener('submit', e => {
    e.preventDefault();

    const titulo = formAgenda.titulo.value;
    const data = formAgenda.data.value;
    const hora = formAgenda.hora.value;
    const descricao = formAgenda.descricao.value;

    if (!titulo || !data || !hora) return;

    const evento = {
      title: titulo,
      start: `${data}T${hora}`,
      description: descricao
    };

    calendario.addEvent(evento);
    eventosSalvos.push(evento);
    localStorage.setItem('eventos', JSON.stringify(eventosSalvos));

    tarefas.push({ texto: titulo, data, concluida: false });
    salvarTarefas();
    renderizarTarefas();
    formAgenda.reset();
  });

  renderizarTarefas();
});
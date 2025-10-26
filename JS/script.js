// script.simple.js
// Versão comentada linha-a-linha para uso em aula
// Objetivo: listar produtos da API e permitir exclusão usando Fetch

// URL base da API (mudar se for necessário)
const API = 'https://proweb.leoproti.com.br/alunos';

// ----- Seletores rápidos (atalhos para o DOM) -----
// $('seletor') -> retorna o primeiro elemento que casa com o seletor
const $ = s => document.querySelector(s);
// $$('seletor') -> retorna NodeList com todos os elementos que casam
const $$ = s => document.querySelectorAll(s);

// ----- Elementos usados na página -----
// tbody da tabela onde os produtos serão inseridos
const tbody = $('#alunos-table tbody');
// div que mostra o estado de carregamento
const loading = $('#loading');
// div usada para mostrar mensagens ao usuário
const message = $('#message');

// ----- Funções utilitárias -----
// Alterna o indicador de 'loading' (mostrar/ocultar)
function setLoading(on) {
    // Se o elemento não existir, sai (evita erros em testes)
    if (!loading) return;
    // Exibe o elemento quando 'on' for true, caso contrário oculta
    loading.style.display = on ? 'block' : 'none';
}

// Mostra uma mensagem curta (tipo: 'success' ou 'error') e some após 3s
function showMessage(text, type = 'success') {
    // Se não há elemento de mensagem, sai
    if (!message) return;
    // Define o texto da mensagem
    message.textContent = text;
    // Define classes do Bootstrap para estilo (verde/vermelho)
    message.className = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
    // Mostra a div
    message.style.display = 'block';
    // Após 3 segundos, oculta novamente
    setTimeout(() => { message.style.display = 'none'; }, 3000);
}

// Função pequena e genérica para chamar a API e retornar um objeto com {ok,status,data}
async function callApi(path = '', opts = {}) {
    // Faz a chamada fetch para API completa (API + path)
    const res = await fetch(API + path, { mode: 'cors', headers: { 'Content-Type': 'application/json' }, ...opts });
    // Lê o corpo como texto (pode estar vazio)
    const txt = await res.text();
    // Tenta fazer parse JSON; se falhar, retorna o texto cru
    try {
        return { ok: res.ok, status: res.status, data: txt ? JSON.parse(txt) : null };
    } catch (e) {
        return { ok: res.ok, status: res.status, data: txt };
    }
}

// ----- Carregar dados -----
// Busca os alunos e chama 'renderizar' para mostrar na tabela
async function carregarAlunos() {
    // Mostra indicador de carregamento
    setLoading(true);
    try {
        // Chama a API na raiz (GET /alunos)
        const r = await callApi('');
        // Se a resposta for OK e vier um array, renderiza os alunos
        if (r.ok && Array.isArray(r.data)) renderizar(r.data);
        else renderizar([]); // caso contrário, renderiza tabela vazia
    } catch (e) {
        // Se houver erro de rede (ex.: CORS ou API off), usamos dados de exemplo
        renderizar([
            { id: 1, nome: 'Arthur Gabriel', turma: 'A1', curso: 'Engenharia', matricula: '12345' },
            { id: 2, nome: 'Vinicius Ferreira', turma: 'B2', curso: 'Design', matricula: '67890' }
        ]);
        // Mostra mensagem informando que estamos em modo offline
        showMessage('Modo offline: usando dados de exemplo', 'error');
    } finally {
        // Esconde o indicador de carregamento sempre
        setLoading(false);
    }
}

// ----- Renderizar tabela -----
// Recebe um array de produtos e popula o tbody
function renderizar(alunos) {
    // Limpa o conteúdo atual
    tbody.innerHTML = '';
    // Se não houver produtos, mostra uma linha informando isso
    if (!alunos || alunos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">Nenhum Aluno</td></tr>';
        return; // sai da função
    }

    // Para cada produto, cria uma linha na tabela
    alunos.forEach(a => {
        const tr = document.createElement('tr'); // cria <tr>
        // Preenche a linha usando template string. Note que formatamos o preço.
        tr.innerHTML = `
            <td>${a.id}</td>
            <td>${a.nome}</td>
            <td>${a.turma}</td>
            <td>${a.curso}</td>
            <td>${a.matricula}</td>
            <td>
                <a class="btn btn-sm btn-primary" href="form.html?id=${a.id}">Editar</a>
                <button class="btn btn-sm btn-danger btn-delete" data-id="${a.id}" data-nome="${a.nome}" data-turma="${a.turma}" data-curso="${a.curso}" data-matricula="${a.matricula}"> Excluir</button>
            </td>`;
        // Anexa a linha ao tbody
        tbody.appendChild(tr);
    });

    // Depois de inserir as linhas, pegamos todos os botões de excluir e associamos o evento
    $$('.btn-delete').forEach(btn => btn.addEventListener('click', () => {
        // Lê id e nome do dataset do botão
        const id = btn.dataset.id;
        const nome = btn.dataset.nome;
        const turma = btn.dataset.turma;
        const curso = btn.dataset.curso;
        const matricula = btn.dataset.matricula;
        // Pergunta confirmação ao usuário antes de excluir
        if (confirm(`Excluir aluno(a):  "${nome}"  "${turma}"  "${curso}"  "${matricula}" ?`)) excluirAluno(id);
    }));
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const campoBusca = document.getElementById('campoBusca');
  const tabela = document.getElementById('alunos-table').getElementsByTagName('tbody')[0];

  // Evita o comportamento padrão do form (recarregar a página)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = campoBusca.value.toLowerCase();

    // Pega todas as linhas da tabela
    const linhas = tabela.getElementsByTagName('tr');

    for (let linha of linhas) {
      const textoLinha = linha.textContent.toLowerCase();
      // Mostra ou esconde conforme o termo digitado
      linha.style.display = textoLinha.includes(nome) ? '' : 'none';
    }
  });
});


// ----- Excluir produto -----
// Envia DELETE /produtos/{id} e recarrega a lista se sucesso
async function excluirAluno(id) {
    setLoading(true); // mostra o spinner
    try {
        // Chama a API com método DELETE
        const r = await callApi('/' + id, { method: 'DELETE' });
        // Se OK, mostra mensagem e recarrega a lista
        if (r.ok) {
            showMessage('Aluno excluído', 'success');
            carregarAlunos();
        } else {
            // Caso a API retorne erro, mostra mensagem de erro
            showMessage('Erro ao excluir', 'error');
        }
    } catch (e) {
        // Erro de conexão (ex.: CORS ou sem internet)
        showMessage('Erro de conexão', 'error');
    } finally {
        // Sempre oculta o loading
        setLoading(false);
    }
}

// ----- Inicialização -----
// Quando o DOM estiver pronto, executa carregarProdutos()
window.addEventListener('DOMContentLoaded', carregarAlunos);
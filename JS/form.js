// form.js - versão comentada linha-a-linha para uso em aula
// Objetivo: permitir criar (POST) e editar (PUT) alunos usando a API

// ----- Configuração -----
// URL base da API
const API = 'https://proweb.leoproti.com.br/alunos';
// Atalho para query selector
// Aqui declaramos uma função curta chamada "$" para facilitar selecionar elementos no DOM.
// Explicação do parâmetro 's':
// - 's' é uma string que representa um seletor CSS, por exemplo:
//     '#nome'      -> seleciona elemento com id="nome"
//     '.classe'    -> seleciona primeiro elemento com a classe 'classe'
//     'input[type="text"]' -> seleciona o primeiro input de texto
// - A função retorna o PRIMEIRO elemento que casar com o seletor (comportamento de document.querySelector).
// - Uso prático em aula: $('#nome') é muito mais curto que document.querySelector('#nome').
const $ = s => document.querySelector(s);

// ----- Referências aos campos do formulário -----
const idField = $('#alunos-id');    // campo escondido com o id (se editar)
const nomeField = $('#nome');        // input nome
const turmaField = $('#turma');      // input preço
const cursoField = $('#curso');      // input preço
const matriculaField = $('#matricula');  // input preço
const form = $('#alunos-form');     // elemento <form>
const message = $('#message');       // área de mensagens (feedback)

// ----- Função para mostrar mensagens (temporárias) -----
function showMessage(text, type = 'success'){
  if(!message) return; // segura se o elemento não existir
  message.textContent = text; // coloca o texto
  // usa classes do Bootstrap para estilo
  message.className = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
  message.style.display = 'block';
  // esconde após 3 segundos
  setTimeout(()=> message.style.display = 'none', 3000);
}

// ----- Função genérica para chamar a API -----
// Faz uma requisição para API e retorna um objeto simples { ok, status, data }
// - `ok`: boolean (res.ok)
// - `status`: código HTTP
// - `data`: resposta já parseada como JSON quando possível, ou texto cru
async function callApi(path = '', opts = {}){
  // Monta a URL final: base API + path (ex.: '/123')
  // Usa fetch para fazer a requisição. Passamos `mode: 'cors'` para permitir chamadas cross-origin
  // e um header Content-Type padrão. Qualquer opção adicional (method, body, etc.) pode ser passada via `opts`.
  const res = await fetch(API + path, { mode: 'cors', headers: { 'Content-Type': 'application/json' }, ...opts });

  // Lê o corpo da resposta como texto. Fizemos isso porque nem sempre a resposta tem corpo JSON
  // (ex.: respostas 204 No Content). Ler como texto evita exceções ao chamar res.json() em corpos vazios.
  const txt = await res.text();

  // Tenta converter o texto para JSON. Se der certo, retornamos `data` como objeto; se falhar, retornamos o texto.
  try {
    return { ok: res.ok, status: res.status, data: txt ? JSON.parse(txt) : null };
  } catch (e) {
    // Se o parse falhar (não é JSON), retornamos o texto original para inspeção.
    return { ok: res.ok, status: res.status, data: txt };
  }
}

// ----- Carregar produto para edição -----
// Quando o usuário acessa form.html?id=123, esta função puxa os dados
async function carregar(id){
  try{
    const r = await callApi('/' + id); // GET /alunos/{id}
    if(r.ok && r.data){
      // Preenche campos com os dados retornados
      idField.value = r.data.id;
      nomeField.value = r.data.nome;
      turmaField.value = r.data.turma;
      cursoField.value = r.data.curso;
      matriculaField.value = r.data.matricula;
      // Altera o título do formulário para indicar edição
      const title = document.getElementById('form-title'); if(title) title.textContent = 'Editar Alunos';
    } else showMessage('Alunos não encontrado','error');
  }catch(e){
    // Em caso de erro de rede/CORS, mostra mensagem e loga no console
    showMessage('Erro ao carregar alunos','error');
    console.error(e);
  }
}

// ----- Salvar (criar ou atualizar) -----
async function salvar(e){
  e.preventDefault(); // previne envio padrão do form
  // Monta o objeto produto a partir dos campos
  const aluno = {nome: nomeField.value.trim(),turma: turmaField.value.trim(),curso: cursoField.value.trim(),matricula: matriculaField.value.trim()};
  // Validação simples: nome não vazio e preço numérico
  if (!aluno.nome || !aluno.turma || !aluno.curso || !aluno.matricula) {showMessage('Preencha todos os campos corretamente', 'error');
    return;}
  try{
    if(idField.value){
      // Modo edição: chama PUT /alunos/{id}
      const r = await callApi('/' + idField.value, { method: 'PUT', body: JSON.stringify(aluno) });
      if(r.ok) {
        showMessage('Aluno atualizado','success');
        // Redireciona de volta para a lista após 700ms
        setTimeout(()=> location.href = 'index.html', 700);
      } else showMessage('Erro ao atualizar','error');
    } else {
      // Modo criação: POST /alunos
      const r = await callApi('', { method: 'POST', body: JSON.stringify(aluno) });
      if(r.ok) {
        showMessage('Aluno criado','success');
        setTimeout(()=> location.href = 'index.html', 700);
      } else showMessage('Erro ao criar','error');
    }
  }catch(e){
    // Erro de conexão (CORS ou rede)
    showMessage('Erro de conexão','error');
    console.error(e);
  }
}

// ----- Inicialização -----
// Registra o evento de submit do formulário
form.addEventListener('submit', salvar);

// Se houver ?id= na URL, carrega o produto para edição
const params = new URLSearchParams(location.search);
if(params.has('id')) carregar(params.get('id'));
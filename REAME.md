# 📘 CRUD de Alunos - Sistema de Gerenciamento Acadêmico

Sistema web completo de gerenciamento de alunos desenvolvido como prática acadêmica, implementando operações CRUD (Create, Read, Update, Delete) através de integração com API REST.

---

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido como atividade prática para estudo de **integração frontend-backend**, utilizando HTML, CSS (Bootstrap) e JavaScript puro para consumir uma API REST pública de gerenciamento de alunos.

A aplicação permite o cadastro completo de estudantes com informações como nome, turma, curso e matrícula, oferecendo uma interface intuitiva e responsiva para todas as operações.

---

## ✨ Funcionalidades Implementadas

- ✅ **Listar Alunos** - Visualização de todos os registros em tabela responsiva
- ➕ **Cadastrar Aluno** - Adicionar novos estudantes ao sistema
- ✏️ **Editar Aluno** - Atualizar informações de registros existentes
- 🗑️ **Excluir Aluno** - Remover registros com confirmação
- 🔍 **Buscar por ID** - Localizar aluno específico
- ⚠️ **Validação de Formulário** - Campos obrigatórios e feedback visual
- 📱 **Design Responsivo** - Interface adaptável para todos os dispositivos
- 💬 **Mensagens de Feedback** - Alertas de sucesso e erro para o usuário

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estruturação semântica da página
- **CSS3** - Estilização customizada
- **Bootstrap 5.3** - Framework CSS para responsividade e componentes
- **JavaScript ES6+** - Lógica de programação e manipulação do DOM
- **Fetch API** - Requisições HTTP assíncronas

### Backend (API Externa)
- **API REST** - `https://proweb.leoproti.com.br/alunos`
- **JSON** - Formato de dados para comunicação

---

## 📊 Estrutura de Dados

A API trabalha com o seguinte modelo de aluno:

```json
{
  "id": 1,
  "nome": "João Silva",
  "turma": "3A",
  "curso": "Informática",
  "matricula": "2024001"
}
```

### Campos obrigatórios:
- **nome** (string, mínimo 3 caracteres)
- **turma** (string)
- **curso** (string)
- **matricula** (string, deve ser única)

---

## 🔌 Endpoints da API

| Método | Endpoint | Descrição | Uso no Projeto |
|--------|----------|-----------|----------------|
| `GET` | `/alunos` | Retorna todos os alunos | Carregar tabela inicial |
| `GET` | `/alunos/{id}` | Retorna aluno específico | Buscar para edição |
| `POST` | `/alunos` | Cria novo aluno | Cadastrar estudante |
| `PUT` | `/alunos/{id}` | Atualiza aluno existente | Salvar edições |
| `DELETE` | `/alunos/{id}` | Remove aluno | Excluir registro |

📖 **Documentação completa:** [Swagger API](https://proweb.leoproti.com.br/swagger/index.html)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexão com internet (para acessar API e Bootstrap CDN)

### Executando Localmente

1. **Clone o repositório**
```bash
git clone https://github.com/nati3054/API.git
cd API
```

2. **Abra o arquivo HTML**
   - Opção 1: Navegue até a pasta `HTML` e clique duas vezes no arquivo `index.html`
   - Opção 2: Use a extensão **Live Server** no VS Code (clique com botão direito no `HTML/index.html`)
   - Opção 3: Execute um servidor local:
   ```bash
   python -m http.server 8000
   # Acesse: http://localhost:8000/HTML/index.html
   ```

3. **Pronto!** A aplicação já está funcionando e conectada à API

---

## 🌐 Deploy na Vercel

### Passos para publicação:

1. **Instale o Vercel CLI**
```bash
npm install -g vercel
```

2. **Faça login na Vercel**
```bash
vercel login
```

3. **Deploy do projeto**
```bash
vercel
```

4. **Siga as instruções no terminal**
   - Confirme o diretório do projeto
   - Configure o nome do projeto
   - Aguarde o deploy
   - Acesse o link fornecido

📹 **Tutorial:** [Como hospedar na Vercel](https://www.youtube.com/watch?v=exemplo)

---

## 📁 Estrutura de Arquivos

```
API/
│
├── CSS/
│   └── index.css        # Estilos customizados da aplicação
│
├── HTML/
│   ├── form.html        # Página do formulário
│   └── index.html       # Página inicial
│
├── JS/
│   ├── form.js          # Lógica do formulário
│   └── script.js        # Lógica principal (CRUD + validações)
│
└── README.md            # Documentação do projeto
```

---

## 💻 Principais Funções Implementadas

### JavaScript (script.js e form.js)

**script.js** - Funções principais do CRUD:
```javascript
// Listar todos os alunos
async function listarAlunos()

// Cadastrar novo aluno
async function cadastrarAluno(aluno)

// Buscar aluno por ID
async function buscarAluno(id)

// Atualizar aluno existente
async function atualizarAluno(id, aluno)

// Excluir aluno
async function excluirAluno(id)
```

**form.js** - Validações e manipulação do formulário:
```javascript
// Validar formulário
function validarFormulario()

// Limpar campos
function limparFormulario()

// Preencher formulário para edição
function preencherFormulario(aluno)
```

---

## ✅ Validações Implementadas

- ✔️ Todos os campos são obrigatórios
- ✔️ Nome deve ter no mínimo 3 caracteres
- ✔️ Campos não podem conter apenas espaços em branco
- ✔️ Confirmação antes de excluir registros
- ✔️ Tratamento de erros da API
- ✔️ Feedback visual imediato (alertas Bootstrap)

---

## 🎨 Interface do Usuário

### Componentes principais:
- **Navbar** - Cabeçalho com título do sistema
- **Formulário** - Card com campos de entrada e botões de ação
- **Tabela** - Listagem responsiva com ações (Editar/Excluir)
- **Alertas** - Mensagens de sucesso/erro dinâmicas
- **Botões** - Cores semânticas (primary, warning, danger)

### Responsividade:
- 📱 Mobile-first design
- 💻 Adaptação automática para tablets e desktops
- 🎯 Tabela com scroll horizontal em telas pequenas

---

## 🔍 Fluxo de Uso

1. **Ao carregar a página**: Sistema busca e exibe todos os alunos cadastrados
2. **Para cadastrar**: Preencher formulário → Clicar em "Cadastrar" → Aluno aparece na tabela
3. **Para editar**: Clicar em "Editar" → Dados preenchem o formulário → Modificar → Salvar
4. **Para excluir**: Clicar em "Excluir" → Confirmar ação → Registro removido
5. **Feedback**: Mensagens de sucesso (verde) ou erro (vermelho) após cada operação

---

## 🐛 Tratamento de Erros

- ❌ Campos vazios ou inválidos: Alerta na interface
- ❌ Falha na API: Mensagem de erro com detalhes
- ❌ Conexão perdida: Notificação ao usuário
- ❌ ID não encontrado: Feedback apropriado
- ❌ Dados duplicados: Mensagem da API exibida

---

## 📚 Aprendizados e Conceitos Aplicados

- ✅ Consumo de API REST com Fetch
- ✅ Métodos HTTP (GET, POST, PUT, DELETE)
- ✅ Promises e async/await
- ✅ Manipulação do DOM
- ✅ Event listeners e handlers
- ✅ Validação de formulários
- ✅ Tratamento de erros e exceções
- ✅ Estruturação de código JavaScript
- ✅ Responsividade com Bootstrap
- ✅ Deploy de aplicações web

---

## 🎓 Referências e Materiais

- [Documentação da API](https://proweb.leoproti.com.br/swagger/index.html)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)

---

## 🚧 Possíveis Melhorias Futuras

- [ ] Paginação da tabela de alunos
- [ ] Filtro e busca por nome/matrícula
- [ ] Ordenação de colunas
- [ ] Exportação de dados (CSV/PDF)
- [ ] Modo escuro (dark mode)
- [ ] Validação de matrícula duplicada no frontend
- [ ] Animações de transição
- [ ] Testes automatizados

---

## 📝 Licença

Este projeto foi desenvolvido para fins **educacionais** como parte de atividade acadêmica.  
Livre para uso e modificação.

---

## 👨‍💻 Desenvolvedor

**Natalia Ferreira**  
📧 Email: contato@nataliaferreira.com  
💼 GitHub: [@nati3054](https://github.com/nati3054)

---

## 🔗 Links do Projeto

- 💻 **Repositório:** [https://github.com/nati3054/API.git](https://github.com/nati3054/API.git)
- 🌐 **Deploy:** [Em breve - Vercel]
- 📖 **API:** [Swagger Documentation](https://proweb.leoproti.com.br/swagger/index.html)

---

## 🤝 Agradecimentos

Agradecimento especial pela orientação e disponibilização da API REST para práticas de desenvolvimento web.

---

**⭐ Gostou do projeto? Deixe uma estrela no repositório!**

---

*Projeto desenvolvido por Natalia Ferreira*  
*Última atualização: Outubro de 2025*
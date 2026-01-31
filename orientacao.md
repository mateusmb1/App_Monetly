Quero que você projete e implemente a ARQUITETURA e a LÓGICA de um aplicativo de controle financeiro pessoal e familiar, preferencialmente como PWA (Progressive Web App), com foco em:

- Uso diário simples (lançar receita/despesa rápido).
- Projeções para próximos meses (incluindo salário variável, cartões e financiamentos).
- Uso compartilhado entre usuários (grupos: casal/família).
- Integração coerente com TODAS as telas que já estão definidas no arquivo `codigosTelas.txt` (que você já tem acesso).

IMPORTANTE:
- Use as telas, componentes e rotas já existentes no arquivo `codigosTelas.txt`.
- Adapte os nomes que eu usar aqui (como “Dashboard”, “Tela de Lançamento de Despesa”) para os nomes reais de telas/componentes/rotas que estão no arquivo.
- Se houver telas equivalentes às descrições abaixo, conecte os fluxos a elas. Se não houver, sugira a criação/reutilização de componentes com base no que já está no arquivo.

---

## 1. Objetivo do produto

- Controle financeiro pessoal e familiar.
- Lançamento de receitas e despesas (fixas, variáveis, imprevistos).
- Projeção de saldo e dívidas para os próximos meses.
- Gestão de cartões de crédito como dívida contínua.
- Gestão de financiamentos (carro, etc.) com parcelas.
- Sugestões de organização: essenciais, lazer, imprevistos, dívidas.

---

## 2. Entidades principais (modelo de dados)

Estruture o backend (e o state global do front) com, no mínimo, as seguintes entidades:

1. **User**
   - `id`, `name`, `email`, etc.

2. **Group**
   - `id`, `name` (ex.: “Meu orçamento”, “Família X”).
   - Dono (`owner_id`).
   - Configurações do grupo (moeda, dia de início do mês, etc.).

3. **GroupMember**
   - `id`, `group_id`, `user_id`, `role` (`owner`, `member`).
   - `permissions` (ver tudo, só lançar, etc.).

4. **Account**
   - `id`, `group_id`, `name`.
   - `type`: `cash`, `bank`, `credit_card`.
   - Para `credit_card`:
     - `limit_total`.
     - `closing_day`.
     - `due_day`.
     - `interest_rate`.
     - `total_debt` (saldo total em dívida).

5. **Income**
   - `id`, `group_id`, `user_id`.
   - `amount`, `date`.
   - `type`: `fixed`, `variable`.
   - `source` (salário, freelance, etc.).
   - `recurrence`: `none`, `monthly`.
   - `is_salary` (boolean).
   - `salary_can_vary` (boolean).

6. **Expense**
   - `id`, `group_id`, `user_id`.
   - `amount`, `date`.
   - `category` (aluguel, água, luz, mercado, lazer, saúde, transporte, imprevistos, etc.).
   - `recurrence`: `none`, `monthly`.
   - `is_fixed` (boolean).
   - `is_variable_recurrent` (para contas tipo água/luz/mercado).
   - `is_unexpected` (imprevisto).
   - `payment_method` (cash, bank, credit_card, auto_debit).
   - `account_id`.
   - `description`.

7. **Budget**
   - `id`, `group_id`, `month`, `year`.
   - `category` OU `pot` (essenciais, lazer, imprevistos, dívidas).
   - `planned_amount`.

8. **DebtPlan**
   - `id`, `group_id`.
   - `debt_type`: `credit_card`, `loan`, `generic`.
   - `related_account_id`.
   - `target_months`.
   - `planned_monthly_amount`.

9. **Financing (Loan)**
   - `id`, `group_id`, `user_id`.
   - `type`: carro, moto, imóvel, outro.
   - `name`.
   - `principal_amount`.
   - `down_payment` (opcional).
   - `total_months`.
   - `start_date`.
   - `installment_amount`.
   - `installment_type`: `fixed`, `variable`.
   - `paid_installments_count`.

10. **Notification / Reminder (opcional, se fizer sentido com as telas)**
    - Para lembretes de check-in diário e confirmação de salário.

Use o que já existir no `codigosTelas.txt` como base para naming.

---

## 3. Fluxos principais (ligação entre telas)

Abaixo descrevo os FLUXOS. Você deve:

- Mapear cada fluxo para as telas reais do `codigosTelas.txt`.
- Ajustar nomes de telas/rotas conforme o arquivo.
- Garantir que a navegação entre telas corresponde a esses fluxos.

### 3.1 Onboarding e criação inicial

Fluxo esperado:

1. Usuário abre app:
   - Se não autenticado → Tela de Login/Registro (use a tela equivalente do arquivo).
2. Após registro:
   - Tela de Onboarding (uso inicial):
     - Perguntas básicas: renda mensal aproximada, principais despesas fixas, se tem cartão, se tem financiamento.
   - Criar automaticamente:
     - Um `Group` padrão (ex.: “Meu orçamento”).
     - Contas básicas (carteira, conta bancária).
3. Ao concluir onboarding:
   - Redirecionar para o **Dashboard do mês atual** (Home principal).

No prompt técnico, deixe claro:

> Use a tela/rota de onboarding já existente no `codigosTelas.txt` (por exemplo, algo tipo `OnboardingScreen` ou similar). Caso não exista, proponha reutilizar a próxima tela mais próxima e descreva como adaptá-la.

### 3.2 Dashboard (mês atual)

A tela principal (provavelmente algo no arquivo como `HomeScreen`, `DashboardScreen` etc.) deve mostrar:

- Saldo projetado do mês (card grande).
- Resumo:
  - Total de receitas.
  - Total de despesas.
  - Total de pagamentos de dívidas (cartões + financiamentos).
- Distribuição por “pots”:
  - Essenciais, Lazer, Imprevistos, Dívidas.
- Próximos vencimentos:
  - Aluguel, água, luz, financiamento, cartão, etc.
- Atalhos:
  - Botão para lançar despesa (abre tela/modal de despesa).
  - Botão para lançar receita.
  - Acesso a Planejamento/Projeções.
  - Acesso ao Grupo/Família.
- Check-in diário se ainda não respondido (ver item 3.4).
- Alertas: projeção negativa, fatura alta, financiamento pesado etc.

Fluxo:

- Dashboard → “+ Despesa” → Tela de Lançamento de Despesa.
- Dashboard → “+ Receita” → Tela de Lançamento de Receita.
- Dashboard → card de “Cartões” → Tela de Lista/Detalhe de Cartões.
- Dashboard → card de “Financiamentos” → Tela de Lista/Detalhe de Financiamentos.
- Dashboard → botão “Planejamento” → Tela de Projeções.
- Dashboard → ícone/menu “Grupo” → Tela de Grupo/Família.

### 3.3 Lançamento de receitas e despesas

Conecte as telas que já existem para formulário de transação (ex.: `NewTransactionScreen`, `ExpenseFormScreen`, etc.) com esta lógica:

**Receita:**

- Campos:
  - Valor, data, tipo (`fixed`/`variable`), fonte, conta de entrada.
  - Flag “salário que pode variar”.
- Ao salvar:
  - Criar `Income`.
  - Atualizar projeções.
  - Navegar de volta ao Dashboard ou listar transações (conforme já implementado no arquivo).

**Despesa:**

- Campos:
  - Valor, data, categoria, forma de pagamento, conta/cartão, recorrência, flags:
    - `is_fixed`, `is_variable_recurrent`, `is_unexpected`.
  - Quem lançou (se houver multiusuário).
- Ao salvar:
  - Criar `Expense`.
  - Se for cartão:
    - Associar à `Account` tipo `credit_card`.
  - Atualizar projeções.
  - Voltar ao fluxo adequado (Dashboard/lista).

Certifique-se de que:

- As telas de listagem de transações (se existirem) consumam essas entidades de forma consistente.
- O fluxo pós-salvamento respeite o comportamento de navegação que já está no `codigosTelas.txt`.

### 3.4 Rotina diária de check-in de gastos

Mapeie dentro do arquivo uma tela/modal adequado para o “check-in diário” (pode ser um modal, bottom-sheet, etc.).

Fluxo:

1. Uma vez por dia (ou quando o usuário acessar o app após certo período):
   - Mostrar “Você teve algum gasto que ainda não registrou?”
2. Botões:
   - “Sim, registrar agora” → abre versão simplificada da tela de despesa.
   - “Não, hoje não” → registra que o check-in do dia foi respondido.
3. Versão simplificada:
   - Campos: valor, categoria (lista curta), forma de pagamento, descrição opcional.

No prompt, peça explicitamente:

> Use um modal ou tela existente (por exemplo, alguma tela de “quick add” ou “bottom sheet” que exista no `codigosTelas.txt`) para implementar este check-in diário, evitando criar componentes totalmente novos se não for necessário.

### 3.5 Rotina mensal de confirmação de salário

Fluxo:

1. No início do mês (primeiro login do mês ou primeira visita ao Dashboard):
   - Mostrar pop-up:
     - “Seu salário deste mês foi igual ao do mês passado?”
2. Se “Sim”:
   - Mantém o valor anterior e aplica nas projeções.
3. Se “Não”:
   - Perguntar se foi maior/menor ou apenas aceitar um valor.
   - Campo numérico para valor do salário.
   - Atualizar `Income` do mês e média usada nas projeções.

Use:

- Tela/modal já existente para confirmação/edição (caso no arquivo haja algo tipo `EditIncomeModal`, `ConfirmDialog` etc.).

### 3.6 Cartão de crédito como dívida

Use as telas já existentes no arquivo para lista e detalhe de cartão (por exemplo, `CardListScreen`, `CardDetailScreen`).

**No detalhe do cartão:**

- Mostrar:
  - Limite total.
  - Limite disponível.
  - Saldo total em dívida (`total_debt`).
  - Próxima fatura estimada.
- Seção “Estratégia de pagamento”:
  - Opções:
    - Pagar sempre o valor total.
    - Pagar sempre o mínimo.
    - Pagar valor fixo mensal.
    - Pagar percentagem do saldo total.
  - Mostrar texto de projeção: “Com esta estratégia, você zera em X meses”.

**Lógica:**

- Usar `Account` tipo `credit_card` + transações para calcular:
  - Fatura do mês.
  - Saldo total em dívida.
- Gerar parcelas/fluxo de pagamento futuro conforme estratégia escolhida.
- Incluir o pagamento do cartão nas projeções mensais (como despesa).

Certifique-se de conectar:

- Tela de Cartões → Tela de Detalhe → Tela de configuração de estratégia (se for separada) → atualização de projeções.

### 3.7 Financiamentos (ex.: carro)

Use telas existentes que representem “empréstimos” / “financiamentos” (ex.: `LoanListScreen`, `LoanDetailScreen`, etc.).

**Cadastro:**

- Tipo, nome, valor total, entrada, número de meses, data de início, prestação estimada, `installment_type` (fixa/variável).

**Se prestação fixa:**

- Gerar despesas mensais fixas até completar `total_months`.

**Se prestação variável:**

- No início de cada mês:
  - Perguntar se a prestação do financiamento X foi igual à do mês anterior.
  - Se não, pedir o valor e atualizar a despesa daquele mês.

**Detalhe do financiamento:**

- Mostrar parcelas pagas/total, total pago, valor restante estimado.
- Timeline de parcelas (mês/valor/status).

Conecte:

- Dashboard → card “Financiamentos” → Lista de Financiamentos → Detalhe → Pop-up mensal de ajuste (se variável).

### 3.8 Planejamento e Projeções (6–12 meses)

Use a tela de planejamento/projeções já existente (ou crie com base em uma tela semelhante):

- Timeline por mês:
  - Saldo inicial.
  - Receitas previstas.
  - Despesas fixas e variáveis.
  - Pagamentos de cartões.
  - Parcelas de financiamentos.
  - Resultado projetado + cor (verde/amarelo/vermelho).
- Gráfico (linha/barras) com evolução do saldo.

Lógica:

- A partir das entidades `Income`, `Expense`, `Financing`, `Account` (cartões) e `DebtPlan`, calcular projeções por mês.
- Integrar esse cálculo de forma centralizada (ex.: serviço/uso de hook global) para que:
  - Dashboard, Projeções e Detalhe de Cartão/Financiamento leiam a mesma fonte de verdade.

### 3.9 Grupo / Família (multiusuário)

Conecte as telas do arquivo que lidam com usuários/grupos (ex.: `GroupSettingsScreen`, `MembersScreen`):

- Listar membros, papeis, permissões.
- Mostrar resumo por pessoa:
  - Receitas lançadas.
  - Despesas lançadas.
  - Participação no total do grupo.

Fluxo:

- Dashboard → menu/ícone de grupo → Tela de Grupo/Família → Detalhe de membro (se existir).

---

## 4. Integração entre telas e backend / state

No prompt técnico, deixe claro:

- **Estado global mínimo**:
  - `currentUser`.
  - `currentGroup`.
  - `currentMonth`/`currentYear`.
  - Coleções: `accounts`, `incomes`, `expenses`, `financings`, `budgets`, `debtPlans`.
  - Resultado de projeções por mês (cacheado).
- **Rotas/telas**:
  - Mapear rotas (ex.: `/login`, `/onboarding`, `/dashboard`, `/transactions`, `/cards`, `/cards/:id`, `/loans`, `/loans/:id`, `/planning`, `/group`) para os componentes reais do `codigosTelas.txt`.
- **Offline-first (se aplicável)**:
  - Permitir lançamentos offline e sincronizar depois com backend.

---

## 5. O que eu espero que você faça

1. **Ler o arquivo `codigosTelas.txt` que já está com você** e:
   - Mapear as telas/componentes/rotas existentes.
   - Relacioná-los com os fluxos descritos aqui.
2. **Ajustar nomes de telas e rotas** no seu design de arquitetura para bater com o que já existe no arquivo.
3. **Desenhar o schema de dados** (usando as entidades descritas) e mostrar onde cada tela lê/escreve esses dados.
4. **Descrever, em pseudo-código ou diagramas textuais**, a lógica de:
   - Projeção mensal (receitas, despesas, cartões, financiamentos).
   - Rotina mensal de salário.
   - Rotina mensal de financiamento variável.
   - Rotina diária de check-in de gastos.
5. **Garantir que todos os fluxos estão interligados** com as telas já criadas, minimizando telas novas e reaproveitando o máximo possível dos componentes presentes em `codigosTelas.txt`.

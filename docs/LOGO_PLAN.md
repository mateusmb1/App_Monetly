# Plan de Integração de Logo & Vídeo - Monetly

Este plano descreve como integraremos a nova identidade visual (imagem e vídeo) ao seu aplicativo, mantendo e reforçando a estética Neo-Brutalista.

## Sugestão de Posicionamento

Para causar o máximo impacto visual ("WOW factor"), proponho os seguintes pontos de inserção:

### 1. Splash Screen & Login (O "Vídeo de Introdução")
- **Onde**: Na tela de `/login`.
- **Como**: Usaremos o vídeo (`grok-video-d8dcff3b-0b90-47f3-9634-77a1a4dd0699.mp4`) como o herói visual. Ele aparecerá no centro antes do formulário de login carregar, ou como um background dinâmico do lado esquerdo (no desktop) ou topo (no mobile).
- **Efeito**: Transição suave do vídeo para o formulário de login brutalista.

### 2. Cabeçalho de Navegação (A Marca Identitária)
- **Onde**: No componente `NeoLayout.tsx`.
- **Como**: Inserir a versão estática da logo (`logo1.jpg`) no topo do menu lateral ou no centro da barra de navegação superior.
- **Estilo**: A logo será envolta em uma borda preta espessa (brutal border) com uma sombra sólida (offset shadow) para combinar com os botões e cards.

### 3. Tela de Onboarding (Boas-vindas)
- **Onde**: No início do `/onboarding`.
- **Como**: Exibir o vídeo em loop suave para receber o novo usuário, transmitindo a energia da marca Jules.

## Agentes Envolvidos

| Agente | Responsabilidade |
|--------|------------------|
| `frontend-specialist` | Implementar os componentes de vídeo e imagem com estilos CSS Neo-Brutalistas. |
| `performance-optimizer` | Garantir que o vídeo carregue rápido, usando pré-carregamento e formatos otimizados. |
| `test-engineer` | Validar a responsividade da logo em telas pequenas e grandes. |

## Próximos Passos

1. **Ativos**: Mover os arquivos da pasta `logo` para `public/assets`.
2. **Desenvolvimento**: Atualizar `NeoLayout.tsx` e `app/login/page.tsx`.
3. **Refino**: Aplicar filtros CSS (se necessário) para que a logo se integre perfeitamente à paleta brutalista.

---

### Você aprova essa estratégia de posicionamento? (Y/N)
> [!TIP]
> O vídeo de introdução no Login dará um ar extremamente premium ao app.

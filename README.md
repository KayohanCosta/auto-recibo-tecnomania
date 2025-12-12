# Auto Recibo 🏪

Sistema completo e profissional de geração de recibos digitais com PDF.

## 🎯 Características

### ⚙️ **Configuração de Dados da Empresa** (v1.1.0) 🆕
- Botão de configurações no header da página inicial
- Edição completa dos dados da empresa:
  - Nome da empresa
  - CNPJ
  - Endereço completo
  - Telefone de contato
  - E-mail
  - Site
  - Instagram (usuário)
  - Horário de atendimento
- Alterações aplicadas automaticamente em **Recibos de Venda** e **Serviço**
- Persistência via localStorage

### ✅ **Três Tipos de Recibos**

1. **Recibo de Serviço** (Garantia 90 dias)
   - Formulário pré-configurado para somente preencher
   - Dados do cliente e serviço executado
   - Cálculo automático de validade
   - Layout profissional com logos e formatação
   - **Usa dados configuráveis da empresa**

2. **Recibo de Venda** (Garantia 30 dias)
   - Tabela dinâmica de produtos/itens
   - Cálculo automático de totais e descontos
   - Suporte para múltiplas formas de pagamento
   - Layout com design corporativo
   - **Usa dados configuráveis da empresa**

3. **Recibo Personalizado** ✨
   - Totalmente customizável
   - Upload de logo própria
   - Dados da empresa personalizáveis
   - Escolha entre Venda ou Serviço
   - Configuração de garantia em dias

### 🎨 **Interface Profissional**
- Design responsivo e intuitivo
- Tema claro com cores corporativas
- Componentes UI modernos
- Suporte a impressão otimizada
- Visualização em tempo real

### 💾 **Armazenamento Local**
- localStorage para dados persistentes
- Sem necessidade de backend
- Privacidade garantida (dados no navegador)

## 🛠️ **Stack Tecnológico**

- **Next.js 16.0.7** - Framework React com App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Estilos utilitários
- **React** - Componentes interativos
- **Lucide React** - Ícones
- **Shadcn/ui** - Componentes UI prontos

## 🚀 **Como Usar**

### Instalação

```bash
# Clone o repositório
git clone https://github.com/KayohanCosta/auto-recibo-tecnomania.git

# Instale as dependências
cd auto-recibo-tecnomania
pnpm install
# ou npm install

# Inicie o servidor de desenvolvimento
pnpm dev
# ou npm run dev
```

Acesse `http://localhost:3000` no navegador.

### Uso do Aplicativo

1. **Escolha o tipo de recibo** na página inicial
2. **Preencha o formulário** com os dados necessários
3. **Visualize o recibo** gerado em tempo real
4. **Imprima ou exporte** em PDF

## 📁 **Estrutura do Projeto**

```
app/
├── page.tsx                          # Página inicial
├── layout.tsx                        # Layout global
├── globals.css                       # Estilos globais
├── recibo-servico/
│   ├── page.tsx                     # Formulário de serviço
│   └── visualizar/page.tsx          # Visualização de serviço
├── recibo-venda/
│   ├── page.tsx                     # Formulário de venda
│   └── visualizar/page.tsx          # Visualização de venda
└── recibo-personalizado/
    ├── page.tsx                     # Formulário personalizado
    └── visualizar/page.tsx          # Visualização personalizada
components/
├── ui/                              # Componentes Shadcn
└── theme-provider.tsx               # Tema personalizado
public/
├── logo-tecnomania.png              # Logo da empresa
├── favicon.ico                      # Favicon
└── [outros assets]
```

## 🎯 **Funcionalidades Principais**

### Recibo de Serviço
- ✅ Nome e telefone do cliente
- ✅ CPF do cliente
- ✅ Descrição do serviço
- ✅ Valor do serviço
- ✅ Data de execução
- ✅ Forma de pagamento
- ✅ Cálculo automático de garantia (90 dias)
- ✅ Termos e condições formatados

### Recibo de Venda
- ✅ Múltiplos itens com descrição e preço
- ✅ Cálculo automático de totais
- ✅ Desconto individual
- ✅ Dados do cliente
- ✅ Forma de pagamento
- ✅ Layout com tabela profissional

### Recibo Personalizado
- ✅ Todos os campos da empresa customizáveis
- ✅ Upload de logo em imagem
- ✅ Modo Venda ou Serviço
- ✅ Garantia configurável em dias
- ✅ Dados de contato completos

## 📱 **Responsivo**

O aplicativo funciona perfeitamente em:
- 💻 Desktop
- 📱 Tablet
- 📲 Smartphone

## 🔒 **Privacidade**

- ✅ Todos os dados são armazenados localmente no navegador
- ✅ Nenhuma informação é enviada para servidores
- ✅ Seguro e privado

## 🚀 **Deploy no Vercel**

Este projeto está pronto para deploy no Vercel. Siga os passos abaixo:

### Método 1: Deploy via Interface Web (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub
2. Clique em "Add New Project"
3. Importe o repositório `KayohanCosta/auto-recibo-tecnomania`
4. Mantenha as configurações padrão (Vercel detecta automaticamente Next.js)
5. Clique em "Deploy"

O site será publicado automaticamente em uma URL como: `https://auto-recibo-tecnomania.vercel.app`

### Método 2: Deploy via CLI

```bash
# Instale a CLI do Vercel globalmente
npm install -g vercel

# No diretório do projeto, execute:
vercel

# Para deploy em produção:
vercel --prod
```

### Configurações Automáticas

O projeto já está configurado com:
- ✅ `vercel.json` otimizado para Next.js
- ✅ Headers de segurança (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ Cache para recursos estáticos (favicon, logos)
- ✅ Build automatizado
- ✅ Analytics do Vercel (@vercel/analytics)

### Variáveis de Ambiente

Este projeto não requer variáveis de ambiente especiais. Todos os dados são armazenados localmente no navegador do usuário.

### Deploy Contínuo

Após o primeiro deploy, cada push para a branch `main` gerará automaticamente um novo deploy em produção. Pull requests criam deploys de preview automaticamente.

## 📝 **Licença**

Este projeto é exclusivo para KayohanCostadev.

## 👨‍💻 **Desenvolvido por**

Kayohan Costa - [GitHub](https://github.com/KayohanCosta)

## 📞 **Suporte**

Para dúvidas ou sugestões, contacte: kayohancostadev@gmail.com

---

**Versão:** 1.0.0  
**Última atualização:** 11 de Dezembro de 2025

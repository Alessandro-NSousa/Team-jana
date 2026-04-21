# 🏋️ Landing Page #TeamJana Alfa60

Landing page institucional moderna e responsiva para personal trainer, desenvolvida com foco em conversão e experiência do usuário.

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![License](https://img.shields.io/badge/license-MIT-magenta)

## 📋 Sobre o Projeto

Landing page profissional que implementa todos os requisitos especificados no documento fornecido, incluindo:

- ✅ Hero Section impactante com CTAs estratégicos
- ✅ Seção de Autoridade com apresentação profissional
- ✅ Grid de Serviços com 6 ofertas principais
- ✅ Diferenciais competitivos destacados
- ✅ Depoimentos de clientes (prova social)
- ✅ Métricas animadas de resultados
- ✅ CTA final persuasivo
- ✅ Formulário de contato completo
- ✅ Rodapé com informações essenciais
- ✅ Botão flutuante do WhatsApp

## 🎨 Identidade Visual

### Paleta de Cores

Baseada na imagem do uniforme fornecido:

- **Roxo Escuro**: `#1a0b2e`, `#2e1065`, `#4c1d95`
- **Rosa/Magenta**: `#d946ef`, `#ec4899`, `#f0abfc`
- **Neutros**: Cinza escuro para backgrounds

### Tipografia

- **Fonte Principal**: Inter (Google Fonts)
- **Pesos utilizados**: 300 a 900

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos customizados com animações
- **TailwindCSS**: Framework CSS via CDN
- **JavaScript Vanilla**: Interatividade e animações
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter

## 📦 Estrutura de Arquivos

```
jota/
├── index.html          # Página principal
├── styles.css          # Estilos customizados
├── script.js           # Funcionalidades JavaScript
└── README.md           # Esta documentação
```

## 🛠️ Instalação e Uso

### Opção 1: Abrir Diretamente

1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` em qualquer navegador moderno

### Opção 2: Servidor Local

```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Usando PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

## ⚙️ Funcionalidades Implementadas

### JavaScript

- ✅ **Scroll suave** entre seções
- ✅ **Contador animado** para métricas
- ✅ **Intersection Observer** para animações ao rolar
- ✅ **Validação de formulário** com feedback visual
- ✅ **Formatação automática** de telefone
- ✅ **Botão "Voltar ao topo"** com scroll suave
- ✅ **Sistema de notificações** para feedback do usuário
- ✅ **Proteção contra spam** no formulário
- ✅ **Lazy loading** de imagens (opcional)
- ✅ **Tracking de eventos** WhatsApp

### CSS

- ✅ **Animações personalizadas** (fadeIn, fadeInLeft, fadeInRight)
- ✅ **Hover effects** em cards e botões
- ✅ **Gradientes dinâmicos** 
- ✅ **Scrollbar customizada**
- ✅ **Estados de loading** para botões
- ✅ **Responsividade completa**

## 📱 Responsividade

A landing page é 100% responsiva e otimizada para:

- 📱 **Mobile**: 320px - 640px
- 📱 **Tablet**: 641px - 1024px
- 💻 **Desktop**: 1025px+
- 🖥️ **Large Desktop**: 1920px+

## 🎯 Customização

### Alterar Cores

Edite as cores no arquivo `index.html` na seção `<script>` do TailwindCSS:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'purple-deep': '#SUA_COR',
                'magenta': '#SUA_COR',
                // ...
            }
        }
    }
}
```

### Alterar Conteúdo

1. **Textos**: Edite diretamente no `index.html`
2. **Imagens**: Substitua os arquivos da pasta `assets/` pelas versões finais
3. **Links WhatsApp**: Procure por `559187630955` e substitua pelo número desejado

### Integração com Backend

Para conectar o formulário com um backend real:

1. Localize a função de submit no `script.js`:

```javascript
contactForm.addEventListener('submit', async (e) => {
    // Substitua a simulação por sua chamada de API
    const response = await fetch('/api/contato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
});
```

## 📊 Performance

### Métricas Alvo

- ⚡ PageSpeed Score: > 85
- 🚀 Tempo de carregamento: < 3s
- 📱 Mobile-friendly: 100%
- ♿ Acessibilidade: WCAG 2.1 AA

### Otimizações Implementadas

- Uso de CDN para bibliotecas
- Lazy loading de imagens
- CSS e JS minificados (recomendado para produção)
- Animações otimizadas com `requestAnimationFrame`
- Debouncing de eventos de scroll

## 🔧 Próximas Melhorias (Roadmap)

- [ ] Integração com Google Analytics
- [ ] Implementar Service Worker para PWA
- [ ] Adicionar testes automatizados
- [ ] Implementar Google Tag Manager
- [ ] Adicionar suporte multilíngue
- [ ] Criar versão AMP
- [ ] Adicionar chatbot
- [ ] Integração com CRM

## 📞 Contato e Suporte

Para personalização ou suporte:

- 📧 Email: janna180@gmail.com
- 📱 WhatsApp: +55 91 8763-0955

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🙏 Agradecimentos

- [TailwindCSS](https://tailwindcss.com) - Framework CSS
- [Font Awesome](https://fontawesome.com) - Ícones
- [Google Fonts](https://fonts.google.com) - Tipografia
- [Unsplash](https://unsplash.com) - Imagens de placeholder

---

**Desenvolvido com 💜 para #TeamJana Alfa60**

© 2026 #TeamJana. Todos os direitos reservados.

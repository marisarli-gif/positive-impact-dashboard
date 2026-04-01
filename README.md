# Positive Impact Dashboard

Dashboard interativo do Impact Report 2025 — pronto para deploy no Vercel.

---

## Deploy no Vercel (passo a passo)

### 1. Crie uma conta no Vercel
Acesse **vercel.com** e clique em **Sign Up**.  
Pode criar conta com GitHub, GitLab ou e-mail.

### 2. Faça o deploy da pasta
Na página inicial do Vercel, clique em **"Add New Project"**.  
Em seguida clique em **"Upload"** (canto superior direito da tela de import).  
Arraste a pasta `positive-impact-dashboard` inteira para a área indicada.

### 3. Configure o projeto
- **Framework Preset**: Next.js (Vercel detecta automaticamente)
- **Root Directory**: deixe como está (`.`)
- Clique em **Deploy**

### 4. Aguarde o build
O build leva cerca de 1–2 minutos.  
Quando terminar, o Vercel fornece uma URL no formato:  
`https://positive-impact-dashboard-xxxx.vercel.app`

### 5. Cole no Wix
No editor do Wix:
1. Clique em **"+"** para adicionar elemento
2. Busque por **"Embed & Social"** → **"Embed HTML"**
3. Clique em **"Enter Code"** e cole:

```html
<iframe
  src="https://SUA-URL-AQUI.vercel.app"
  width="100%"
  height="900"
  frameborder="0"
  scrolling="no"
  style="border:none;">
</iframe>
```

4. Ajuste a **altura** (height) conforme necessário no seu layout.

---

## Estrutura do projeto

```
positive-impact-dashboard/
├── pages/
│   └── index.jsx   ← dashboard completo com fontes embutidas
├── package.json
├── next.config.js
└── README.md
```

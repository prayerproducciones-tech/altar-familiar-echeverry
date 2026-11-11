# Altar Familiar · Familia Echeverry (Mentalidad Cristo)

Sitio estático (sin build) con el quiz de cada tema del altar familiar.

## Archivos
- `temas.js`  → TODO el contenido: temas, versículos y preguntas. Es lo único que se edita normalmente.
- `index.html`, `estilos.css`, `app.js` → diseño y lógica (no hace falta tocarlos).
- `logo.png`  → logo de Mentalidad Cristo.

## Para Claude: cómo agregar el tema nuevo cada mes
1. Abre `temas.js` y agrega un objeto NUEVO AL PRINCIPIO del arreglo `TEMAS` (el primero es el "tema del mes").
2. Campos: `id` (sin espacios), `titulo`, `mes`, `enfoque`, `versiculo`, `referencia`, `resumen`, `preguntas`.
3. Cada pregunta: `q` (texto), `o` (4 opciones), `a` (índice de la correcta, empezando en 0), `h` (pista, opcional), `e` (explicación).
4. Haz commit a `main`: Vercel despliega solo en ~30 segundos.

## Deploy
Vercel → Add New Project → importar este repo → Framework Preset "Other" → Deploy.

# Altar Familiar · Familia Echeverry (Mentalidad Cristo)

Sitio estático (sin build). El CONTENIDO (temas, versículos, preguntas) vive en la base de datos Supabase, tabla `altar_temas`, así se edita sin volver a subir archivos. `temas.js` es solo un respaldo si la base no responde.

## Para Claude: agregar o editar un tema (sin tocar GitHub)
1. Abrir el SQL Editor del proyecto Supabase `gcoshqflzgxeqhkfapdl` en Chrome:
   https://supabase.com/dashboard/project/gcoshqflzgxeqhkfapdl/sql/new
2. Nuevo tema (el de `orden` MÁS ALTO es el "tema del mes"):
   `insert into public.altar_temas (id, orden, datos) values ('mi-tema', 2, $j${...json del tema...}$j$::jsonb);`
3. Editar uno existente: `update public.altar_temas set datos = $j${...}$j$::jsonb where id = 'unidos-a-el';`
4. Ocultar un tema: `update public.altar_temas set publicado = false where id = '...';`
5. Cambia en el sitio al instante (sin deploy).

### Formato de `datos` (JSON)
{ "id": "mi-tema", "titulo": "...", "mes": "11 Noviembre 2026", "enfoque": "...", "versiculo": "...", "referencia": "Juan 15:4-5 · RVR1960", "resumen": "...",
  "preguntas": [ { "q": "pregunta", "o": ["op0","op1","op2","op3"], "a": 0, "h": "pista", "e": "explicación" } ] }
(`a` = índice de la opción correcta, empezando en 0. El `id` del JSON debe ser igual a la columna `id`.)

## Resultados
Tabla `altar_resultados` (tema, nombre, puntos, total, creado). Se ven en el botón "Ver resultados" del sitio.

## Código (rara vez se toca)
`index.html`, `estilos.css`, `app.js`, `temas.js` (respaldo + config SUPA), `logo.png`, `vercel.json`. Cambios de diseño sí requieren subir archivos a GitHub (Vercel despliega solo).

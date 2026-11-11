// ============================================================
//  CONTENIDO DEL ALTAR FAMILIAR · FAMILIA ECHEVERRY
//  Para agregar un tema nuevo: copia un bloque de TEMAS,
//  cámbiale los datos y ponlo AL PRINCIPIO de la lista
//  (el primero es el "tema del mes").
// ============================================================
window.FAMILIA = "Familia Echeverry";

// Base de datos compartida (Supabase) donde se guardan los resultados.
window.SUPA = { url: "https://gcoshqflzgxeqhkfapdl.supabase.co", key: "sb_publishable_hX-enCgeCprPpMXScve7mg_aETX5mXC", tabla: "altar_resultados" };

window.TEMAS = [
  {
    id: "unidos-a-el",
    titulo: "Unidos a Él",
    mes: "11 Noviembre 2026",
    enfoque: "Unidad",
    versiculo: "Permaneced en mí, y yo en vosotros. Como el pámpano no puede llevar fruto por sí mismo, si no permanece en la vid, así tampoco vosotros, si no permanecéis en mí. Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, éste lleva mucho fruto; porque separados de mí nada podéis hacer.",
    referencia: "Juan 15:4-5 · RVR1960",
    resumen: "La unidad verdadera comienza cuando cada uno decide permanecer unido a Jesús.",
    preguntas: [
      { q: "Según Juan 15:5, ¿quién es la vid?",
        o: ["Jesús", "La iglesia", "La familia", "Los discípulos"], a: 0,
        h: "Es quien está hablando en el versículo.",
        e: "Jesús dice: «Yo soy la vid, vosotros los pámpanos». Él es la fuente de vida." },
      { q: "¿Qué pasa con una rama que se separa de la vid?",
        o: ["Crece más fuerte", "No puede dar fruto", "Da fruto más rápido", "No le pasa nada"], a: 1,
        h: "Piensa en la rama de la actividad.",
        e: "El pámpano no puede llevar fruto por sí mismo si no permanece en la vid." },
      { q: "¿Cuándo comienza la unidad verdadera?",
        o: ["Cuando nos reunimos en el mismo lugar", "Cuando nadie discute", "Cuando cada uno decide permanecer unido a Jesús", "Cuando tenemos los mismos gustos"], a: 2,
        h: "Primero con Él, después entre nosotros.",
        e: "La unidad no comienza cuando nos unimos entre nosotros, sino cuando todos decidimos permanecer unidos a Jesús." },
      { q: "¿Cuál de estos NO es uno de los tres principios de la charla?",
        o: ["Una relación personal con Jesús", "Unidos a Él, vivimos unidos a los demás", "Unidos a Él, damos fruto", "Ganar todas las discusiones"], a: 3,
        h: "Uno de ellos no tiene nada que ver con permanecer.",
        e: "Los tres principios son: relación personal con Jesús, unidad con los demás y dar fruto." },
      { q: "Completa: «Separados de mí…»",
        o: ["…podéis hacerlo solos", "…nada podéis hacer", "…podéis hacer poco", "…podéis hacer lo que queráis"], a: 1,
        h: "Es la frase final del versículo.",
        e: "Juan 15:5: «porque separados de mí nada podéis hacer»." }
    ]
  }
  // ,{ id: "otro-tema", titulo: "...", mes: "...", enfoque: "...", versiculo: "...", referencia: "...", resumen: "...", preguntas: [ ... ] }
];

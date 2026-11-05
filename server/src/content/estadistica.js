import { card, choice, fill, order, match, reto, lesson, unit } from './_helpers.js';

export default {
  id: 'estadistica',
  title: 'Estadística y visualización',
  icon: '📈',
  color: '#e67700',
  level: 'Desde cero',
  description: 'Entiende los datos con estadística básica y cuéntalos con buenos gráficos.',
  units: [
    unit('Estadística descriptiva', 'Medidas centrales, dispersión y correlación.', [
      lesson(
        'Media, mediana y moda',
        [
          card('El valor "típico"', '- **Media**: suma ÷ cantidad\n- **Mediana**: el valor del centro al ordenar\n- **Moda**: el valor que más se repite\n\nLa media se ve muy afectada por valores extremos (**outliers**); la mediana no.', `Sueldos: 1000, 1200, 1300, 1500, 20000\nMedia   = 5000   ← engaña por el 20000\nMediana = 1300   ← más representativa`),
          card('¿Cuál usar?', 'Usa la **mediana** con datos muy desiguales (sueldos, precios de casas). Usa la **media** cuando los datos son parecidos entre sí. La **moda** sirve también para categorías (el color más vendido).'),
        ],
        [
          choice('¿Cuál es la mediana de 3, 1, 7?', ['1', '3', '7', '3,67'], 1, { explanation: 'Ordenados: 1, 3, 7. El del centro es el 3.' }),
          choice('¿Cuál es la media de 2, 4, 6?', ['4', '6', '12', '3'], 0),
          choice('¿Qué medida es más robusta frente a valores extremos?', ['Media', 'Mediana', 'Máximo', 'Suma'], 1),
          reto(
            'Escribe media(nums) en JavaScript: la suma de los números dividida entre cuántos hay.',
            `function media(nums) {\n  // suma todos y divide entre nums.length\n}`,
            [['media([2, 4, 6])', 4], ['media([10])', 10], ['media([1, 2, 3, 4])', 2.5]],
            `function media(nums) {\n  let suma = 0;\n  for (const n of nums) suma += n;\n  return suma / nums.length;\n}`
          ),
          choice('¿Cuál es la moda de: rojo, azul, rojo, verde?', ['azul', 'rojo', 'verde', 'No hay'], 1),
        ]
      ),
      lesson(
        'Dispersión',
        [
          card('¿Cómo de repartidos están?', 'Dos grupos pueden tener la misma media y ser muy distintos.\n\n- **Rango**: máximo − mínimo\n- **Desviación típica**: cuánto se alejan, de media, los valores de la media\n- **Percentiles / cuartiles**: el percentil 90 es el valor que supera al 90 % de los datos', `Grupo A: 49, 50, 51  → media 50, poca dispersión\nGrupo B: 0, 50, 100  → media 50, mucha dispersión`),
          card('Outliers', 'Un **outlier** es un valor muy alejado del resto. Puede ser un error (una edad de 250 años) o algo importante (un fraude). Nunca los borres sin entender por qué están ahí.'),
        ],
        [
          choice('¿Cuál es el rango de 4, 9, 2, 7?', ['5', '7', '9', '22'], 1),
          choice('Una desviación típica pequeña significa que los datos…', ['Están muy dispersos', 'Están cerca de la media', 'Son todos cero', 'Tienen errores'], 1),
          choice('El percentil 50 es lo mismo que…', ['La media', 'La mediana', 'La moda', 'El máximo'], 1),
          reto(
            'Escribe rango(nums): la diferencia entre el valor máximo y el mínimo.',
            `function rango(nums) {\n  // pista: Math.max(...nums)\n}`,
            [['rango([4, 9, 2, 7])', 7], ['rango([5, 5, 5])', 0], ['rango([-3, 10])', 13]],
            `function rango(nums) {\n  return Math.max(...nums) - Math.min(...nums);\n}`
          ),
          choice('Encuentras una edad de 250 años en los datos. ¿Qué haces primero?', ['Borrar toda la columna', 'Investigar si es un error de entrada', 'Ignorarlo', 'Usar la media'], 1),
        ]
      ),
      lesson(
        'Correlación y causalidad',
        [
          card('Correlación', 'La **correlación** mide si dos variables se mueven juntas, de **−1** a **1**:\n\n- Cerca de **1**: cuando una sube, la otra sube\n- Cerca de **−1**: cuando una sube, la otra baja\n- Cerca de **0**: no hay relación lineal', `df["horas_estudio"].corr(df["nota"])  # 0.82`),
          card('¡Correlación no es causalidad!', 'Que dos cosas vayan juntas no significa que una cause la otra. Las ventas de helados y los ahogamientos suben a la vez… porque ambos aumentan en **verano** (una tercera variable).\n\nPara demostrar causalidad hacen falta **experimentos** (como los tests A/B).'),
        ],
        [
          choice('Una correlación de −0,9 indica…', ['No hay relación', 'Cuando una sube, la otra baja con fuerza', 'Cuando una sube, la otra sube', 'Un error'], 1),
          choice('Helados y quemaduras solares suben a la vez. ¿Los helados causan quemaduras?', ['Sí', 'No: ambos dependen del calor/verano', 'Solo en España', 'Depende del helado'], 1),
          fill('Calcula la correlación en pandas', 'df["a"].___(df["b"])', 'corr', ['corr', 'relation', 'compare', 'link']),
          choice('¿Qué permite demostrar causalidad?', ['Un gráfico bonito', 'Un experimento controlado (test A/B)', 'Mucha correlación', 'Una media'], 1),
          match('Une cada valor de correlación', [['1', 'Relación positiva perfecta'], ['0', 'Sin relación lineal'], ['−1', 'Relación negativa perfecta'], ['0,5', 'Relación positiva moderada']]),
        ]
      ),
    ]),
    unit('Visualizar y comunicar', 'Elegir gráficos, Matplotlib/Seaborn y contar historias con datos.', [
      lesson(
        'Elegir el gráfico',
        [
          card('Cada pregunta, su gráfico', '- **Barras**: comparar categorías\n- **Líneas**: evolución en el tiempo\n- **Dispersión (scatter)**: relación entre dos variables\n- **Histograma**: cómo se distribuye una variable\n- **Tarta**: partes de un todo (solo con pocas categorías)'),
          card('Reglas de oro', '- Un mensaje por gráfico\n- Título que diga la **conclusión**, no solo el tema\n- Ejes con nombre y unidades\n- Las barras empiezan en **cero**\n- Pocos colores, y con intención'),
        ],
        [
          match('Une cada pregunta con su gráfico', [['¿Cómo evolucionaron las ventas por mes?', 'Líneas'], ['¿Qué producto vende más?', 'Barras'], ['¿Hay relación entre precio y ventas?', 'Dispersión'], ['¿Cómo se reparten las edades?', 'Histograma']]),
          choice('¿Por qué las barras deben empezar en cero?', ['Por estética', 'Si no, exageran las diferencias', 'Es obligatorio en Excel', 'No deben'], 1),
          choice('¿Qué título comunica mejor?', ['"Ventas"', '"Ventas 2026"', '"Las ventas crecieron un 30 % tras la campaña"', '"Gráfico 1"'], 2),
          choice('¿Cuándo evitar un gráfico de tarta?', ['Con 2 categorías', 'Con muchas categorías parecidas', 'Siempre está bien', 'Con porcentajes'], 1),
          choice('Para ver la distribución de los sueldos usas…', ['Una tarta', 'Un histograma', 'Una línea', 'Un mapa'], 1),
        ]
      ),
      lesson(
        'Matplotlib y Seaborn',
        [
          card('Matplotlib', 'La librería base de gráficos en Python. pandas la usa por debajo con `df.plot()`.', `import matplotlib.pyplot as plt\n\nplt.plot(meses, ventas)\nplt.title("Ventas por mes")\nplt.xlabel("Mes")\nplt.ylabel("Ventas (€)")\nplt.show()`),
          card('Seaborn', '**Seaborn** hace gráficos estadísticos bonitos con una línea, directamente desde un DataFrame.', `import seaborn as sns\n\nsns.barplot(data=df, x="ciudad", y="total")\nsns.histplot(data=df, x="edad")\nsns.scatterplot(data=df, x="precio", y="ventas")`),
        ],
        [
          fill('Importa pyplot', 'import matplotlib.pyplot as ___', 'plt', ['plt', 'mpl', 'py', 'chart']),
          fill('Pon el título', 'plt.___("Ventas 2026")', 'title', ['title', 'header', 'name', 'label']),
          match('Une cada función de Seaborn', [['barplot', 'Barras'], ['histplot', 'Histograma'], ['scatterplot', 'Dispersión'], ['lineplot', 'Líneas']]),
          choice('¿Qué hace plt.show()?', ['Guarda el archivo', 'Muestra el gráfico', 'Borra el gráfico', 'Nada'], 1),
          choice('¿Cómo haces un gráfico rápido de un DataFrame de pandas?', ['df.plot()', 'df.draw()', 'df.chart()', 'plot(df) no existe'], 0),
        ]
      ),
      lesson(
        'Contar historias con datos',
        [
          card('Del dato a la decisión', 'Un buen análisis responde: **¿qué pasó?**, **¿por qué?** y **¿qué hacemos?**\n\nEstructura: contexto → hallazgo principal → evidencia (gráfico) → recomendación.'),
          card('Herramientas de BI', 'En las empresas se usan herramientas de **Business Intelligence** para crear **dashboards** interactivos: **Power BI**, **Tableau**, **Looker Studio**. Se conectan a Excel, SQL o la nube y se actualizan solas.\n\nUn **KPI** es un indicador clave (ventas, clientes nuevos, tasa de abandono).'),
        ],
        [
          order('Ordena una buena presentación de datos', ['Contexto: cuál era la pregunta', 'Hallazgo principal', 'Evidencia con un gráfico', 'Recomendación']),
          choice('¿Qué es un KPI?', ['Un tipo de gráfico', 'Un indicador clave de rendimiento', 'Un lenguaje', 'Un error'], 1),
          match('Une cada herramienta', [['Power BI', 'BI de Microsoft'], ['Tableau', 'BI muy visual'], ['Looker Studio', 'BI gratuito de Google'], ['Excel', 'Hoja de cálculo']]),
          choice('Tu jefa tiene 2 minutos. ¿Qué le enseñas primero?', ['Todas las tablas', 'La conclusión principal y qué hacer', 'El código', 'La metodología'], 1),
          choice('Un dashboard sirve para…', ['Escribir código', 'Seguir indicadores de forma visual y actualizada', 'Guardar contraseñas', 'Limpiar datos'], 1),
        ]
      ),
    ]),
  ],
};

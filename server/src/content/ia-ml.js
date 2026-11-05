import { card, choice, fill, order, match, reto, lesson, unit } from './_helpers.js';

export default {
  id: 'ia-ml',
  title: 'Machine Learning',
  icon: '🤖',
  color: '#862e9c',
  level: 'Intermedio',
  description: 'Entrena tus propios modelos: regresión, clasificación, métricas y redes neuronales.',
  units: [
    unit('Tu primer modelo', 'Regresión, clasificación, entrenamiento, test y métricas.', [
      lesson(
        'Regresión lineal',
        [
          card('Una recta que predice', 'La **regresión lineal** busca la recta que mejor se ajusta a los datos: `y = m·x + b`.\n\n- `x`: la variable de entrada (**feature**), por ejemplo los metros de una casa\n- `y`: lo que predices (**target**), por ejemplo el precio\n- `m` y `b`: los parámetros que aprende el modelo', `precio = 2000 · metros + 30000\n# una casa de 80 m² → 2000·80 + 30000 = 190000 €`),
          card('El error', 'El modelo aprende **minimizando el error** entre sus predicciones y los valores reales. Una medida típica es el **error cuadrático medio (MSE)**.'),
        ],
        [
          choice('En y = m·x + b, ¿qué aprende el modelo?', ['x', 'y', 'm y b', 'Nada'], 2),
          choice('Con precio = 1000 · metros + 5000, ¿cuánto cuesta una casa de 50 m²?', ['50.000', '55.000', '1.050', '5.050'], 1),
          match('Une cada término', [['Feature', 'Variable de entrada'], ['Target', 'Lo que se quiere predecir'], ['Parámetros', 'Lo que ajusta el modelo'], ['MSE', 'Medida del error']]),
          reto(
            'Escribe predecir(m, b, x), que aplique la recta de una regresión lineal: y = m·x + b.',
            `function predecir(m, b, x) {\n  \n}`,
            [['predecir(2, 1, 3)', 7], ['predecir(1000, 5000, 50)', 55000], ['predecir(0, 4, 100)', 4]],
            `function predecir(m, b, x) {\n  return m * x + b;\n}`
          ),
          choice('¿Qué tipo de problema es la regresión?', ['Predecir categorías', 'Predecir números', 'Agrupar sin etiquetas', 'Generar imágenes'], 1),
        ]
      ),
      lesson(
        'Entrenamiento y test',
        [
          card('Separar los datos', 'Nunca evalúes un modelo con los mismos datos con los que aprendió. Se dividen en:\n\n- **Entrenamiento** (~80 %): para aprender\n- **Test** (~20 %): para comprobar cómo funciona con datos que **nunca ha visto**\n\nA veces también un conjunto de **validación** para ajustar el modelo.', `from sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)`),
          card('Overfitting y underfitting', '- **Overfitting**: memoriza el entrenamiento, falla con datos nuevos (demasiado complejo)\n- **Underfitting**: ni siquiera aprende bien el entrenamiento (demasiado simple)\n\nLo ideal: buen resultado en entrenamiento **y** en test.'),
        ],
        [
          choice('¿Para qué sirve el conjunto de test?', ['Para entrenar más', 'Para evaluar con datos que el modelo no ha visto', 'Para borrar datos', 'Para etiquetar'], 1),
          fill('Reserva el 20 % para test', 'train_test_split(X, y, test_size=___)', '0.2', ['0.2', '20', '2', '0.8']),
          match('Une cada situación', [['Bien en train, mal en test', 'Overfitting'], ['Mal en train y en test', 'Underfitting'], ['Bien en train y en test', 'Buen modelo'], ['Datos nunca vistos', 'Conjunto de test']]),
          choice('Evaluar el modelo con los datos de entrenamiento…', ['Es lo correcto', 'Da una idea demasiado optimista', 'Es imposible', 'Mejora el modelo'], 1),
          choice('Una forma de reducir el overfitting es…', ['Usar menos datos', 'Conseguir más datos o simplificar el modelo', 'Entrenar más tiempo siempre', 'Quitar el test'], 1),
        ]
      ),
      lesson(
        'Métricas de clasificación',
        [
          card('Accuracy no basta', '**Accuracy** = aciertos ÷ total. Pero si el 99 % de los correos no son spam, un modelo que diga siempre "no spam" tiene un 99 % de accuracy… ¡y no sirve para nada!'),
          card('Precision y recall', '- **Precision**: de lo que dije que era positivo, ¿cuánto lo era? (evitar falsas alarmas)\n- **Recall**: de todos los positivos reales, ¿cuántos encontré? (no dejarse ninguno)\n- **F1**: equilibrio entre ambas\n\nEn un test médico importa mucho el **recall**: no queremos dejar sin detectar a ningún enfermo.'),
        ],
        [
          choice('Un modelo acierta 90 de 100 casos. ¿Su accuracy?', ['9 %', '90 %', '10 %', '100 %'], 1),
          choice('Para detectar una enfermedad grave, ¿qué métrica priorizas?', ['Precision', 'Recall', 'Accuracy', 'Velocidad'], 1),
          match('Une cada métrica', [['Accuracy', 'Aciertos sobre el total'], ['Precision', 'Cuántas alarmas eran reales'], ['Recall', 'Cuántos positivos encontré'], ['F1', 'Equilibrio entre precision y recall']]),
          reto(
            'Escribe accuracy(reales, predichos): la proporción de posiciones donde coinciden (de 0 a 1).',
            `function accuracy(reales, predichos) {\n  // cuenta aciertos y divide entre el total\n}`,
            [['accuracy([1, 0, 1, 1], [1, 0, 0, 1])', 0.75], ['accuracy([1, 1], [1, 1])', 1], ['accuracy([0, 1], [1, 0])', 0]],
            `function accuracy(reales, predichos) {\n  let aciertos = 0;\n  for (let i = 0; i < reales.length; i++) {\n    if (reales[i] === predichos[i]) aciertos++;\n  }\n  return aciertos / reales.length;\n}`
          ),
          choice('¿Por qué la accuracy engaña con clases desequilibradas?', ['Porque es lenta', 'Porque predecir siempre la clase mayoritaria da un valor alto', 'Porque no existe', 'No engaña nunca'], 1),
        ]
      ),
    ]),
    unit('Herramientas y redes neuronales', 'scikit-learn, preparar datos y deep learning.', [
      lesson(
        'scikit-learn',
        [
          card('El ML clásico en Python', '**scikit-learn** tiene decenas de modelos con la **misma interfaz**: creas el modelo, lo entrenas con `fit` y predices con `predict`.', `from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\nmodelo = LogisticRegression()\nmodelo.fit(X_train, y_train)\npred = modelo.predict(X_test)\naccuracy_score(y_test, pred)`),
          card('Modelos populares', '- **Regresión lineal / logística**: simples e interpretables\n- **Árboles de decisión** y **Random Forest**: muy usados con datos de tablas\n- **K-means**: agrupar (no supervisado)\n- **KNN**: clasifica según los vecinos más cercanos'),
        ],
        [
          fill('Entrena el modelo', 'modelo.___(X_train, y_train)', 'fit', ['fit', 'train', 'learn', 'run']),
          fill('Predice con datos nuevos', 'pred = modelo.___(X_test)', 'predict', ['predict', 'guess', 'infer', 'output']),
          order('Ordena el flujo con scikit-learn', ['Separar train y test', 'Crear el modelo', 'modelo.fit(X_train, y_train)', 'modelo.predict(X_test)', 'Medir con accuracy_score']),
          match('Une cada modelo con su uso', [['K-means', 'Agrupar sin etiquetas'], ['Random Forest', 'Clasificación con tablas'], ['Regresión lineal', 'Predecir un número'], ['Regresión logística', 'Clasificar sí/no']]),
          choice('A pesar de su nombre, la regresión logística se usa para…', ['Predecir números', 'Clasificar', 'Agrupar', 'Generar texto'], 1),
        ]
      ),
      lesson(
        'Preparar los datos',
        [
          card('Features numéricas', 'Los modelos trabajan con **números**. Hay que preparar los datos:\n\n- **Escalar**: poner las variables en rangos parecidos (metros 50-300, habitaciones 1-5)\n- **One-hot encoding**: convertir categorías en columnas de 0/1\n- Tratar los **nulos**', `ciudad = "Madrid" → [1, 0, 0]\nciudad = "Sevilla" → [0, 1, 0]\nciudad = "Bilbao" → [0, 0, 1]`),
          card('Feature engineering', 'Crear variables útiles a partir de las que tienes suele mejorar más un modelo que cambiar de algoritmo. Ej: de una fecha sacar "día de la semana" o "es festivo".'),
        ],
        [
          choice('¿Por qué hay que convertir "Madrid" en números?', ['Por estética', 'Porque los modelos solo operan con números', 'Porque ocupa menos', 'No hace falta'], 1),
          choice('¿Qué es one-hot encoding?', ['Borrar categorías', 'Convertir cada categoría en una columna de 0 y 1', 'Ordenar datos', 'Un tipo de red neuronal'], 1),
          reto(
            'Escribe escalar(nums): transforma cada valor al rango 0-1 con (x − min) / (max − min).',
            `function escalar(nums) {\n  const min = Math.min(...nums);\n  const max = Math.max(...nums);\n  // devuelve un array nuevo\n}`,
            [['escalar([0, 5, 10])', [0, 0.5, 1]], ['escalar([10, 20])', [0, 1]], ['escalar([2, 4, 6, 10])', [0, 0.25, 0.5, 1]]],
            `function escalar(nums) {\n  const min = Math.min(...nums);\n  const max = Math.max(...nums);\n  return nums.map((x) => (x - min) / (max - min));\n}`,
            { hint: 'return nums.map((x) => (x - min) / (max - min));' }
          ),
          choice('¿Qué es feature engineering?', ['Comprar un servidor', 'Crear variables útiles a partir de los datos', 'Borrar columnas', 'Elegir colores'], 1),
          choice('Sacar "es fin de semana" de una fecha es un ejemplo de…', ['Overfitting', 'Feature engineering', 'Inferencia', 'Clustering'], 1),
        ]
      ),
      lesson(
        'Redes neuronales',
        [
          card('Neuronas artificiales', 'Una **neurona** multiplica cada entrada por un **peso**, suma todo, añade un **sesgo** y aplica una **función de activación**. Muchas neuronas en **capas** forman una **red neuronal**.\n\nCon muchas capas (deep learning) aprenden cosas complejas: ver, oír, traducir…', `salida = activación(w1·x1 + w2·x2 + b)`),
          card('Cómo aprenden', 'Con **backpropagation** y **descenso del gradiente**: miden el error, calculan cómo influye cada peso y los ajustan un poco en la dirección que reduce el error. Se repite millones de veces.\n\nFrameworks: **PyTorch**, **TensorFlow / Keras**.\n\nTipos: **CNN** (imágenes), **Transformers** (lenguaje).'),
        ],
        [
          choice('¿Qué hace una neurona artificial?', ['Guarda archivos', 'Suma entradas ponderadas por pesos y aplica una activación', 'Busca en internet', 'Ordena datos'], 1),
          reto(
            'Escribe neurona(entradas, pesos, sesgo): suma cada entrada × su peso, añade el sesgo y aplica ReLU (si el resultado es negativo devuelve 0).',
            `function neurona(entradas, pesos, sesgo) {\n  let suma = sesgo;\n  // suma entradas[i] * pesos[i]\n  // ReLU: Math.max(0, suma)\n}`,
            [['neurona([1, 2], [0.5, 0.25], 0)', 1], ['neurona([1, 1], [1, 1], 1)', 3], ['neurona([2], [-1], 0)', 0]],
            `function neurona(entradas, pesos, sesgo) {\n  let suma = sesgo;\n  for (let i = 0; i < entradas.length; i++) {\n    suma += entradas[i] * pesos[i];\n  }\n  return Math.max(0, suma);\n}`
          ),
          match('Une cada concepto', [['Peso', 'Importancia de cada entrada'], ['Backpropagation', 'Calcular cómo corregir los pesos'], ['CNN', 'Redes para imágenes'], ['Transformer', 'Arquitectura de los LLM']]),
          choice('¿Qué framework de deep learning es muy popular?', ['React', 'PyTorch', 'Express', 'Pandas'], 1),
          choice('El descenso del gradiente sirve para…', ['Bajar el volumen', 'Ajustar los pesos poco a poco para reducir el error', 'Dibujar gráficos', 'Dividir datos'], 1),
        ]
      ),
    ]),
  ],
};

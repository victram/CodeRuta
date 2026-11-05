import { card, choice, fill, order, match, lesson, unit } from './_helpers.js';

export default {
  id: 'pandas',
  title: 'Python para datos',
  icon: '🐼',
  color: '#1864ab',
  level: 'Intermedio',
  description: 'NumPy y pandas: carga, limpia, transforma y resume datos. Recomendado tras Python.',
  units: [
    unit('Pandas básico', 'Qué es el análisis de datos, NumPy, DataFrames y filtros.', [
      lesson(
        'Análisis de datos y NumPy',
        [
          card('¿Qué hace un analista de datos?', 'Convierte datos en **decisiones**. El proceso típico:\n\n- **Preguntar**: ¿qué queremos saber?\n- **Obtener** los datos (CSV, Excel, SQL, APIs)\n- **Limpiar** (¡el 80 % del trabajo!)\n- **Analizar** y **visualizar**\n- **Comunicar** las conclusiones'),
          card('NumPy', '**NumPy** trabaja con arrays numéricos muy rápido. Las operaciones se aplican a **todos los elementos a la vez** (vectorización), sin bucles.', `import numpy as np\n\nprecios = np.array([10, 20, 30])\nprecios * 1.21      # [12.1, 24.2, 36.3]\nprecios.mean()      # 20.0\nprecios.max()       # 30`),
        ],
        [
          order('Ordena el proceso de análisis', ['Hacer la pregunta', 'Obtener los datos', 'Limpiar los datos', 'Analizar y visualizar', 'Comunicar conclusiones']),
          choice('¿Qué parte del análisis suele llevar más tiempo?', ['Hacer gráficos', 'Limpiar los datos', 'Escribir el informe', 'Instalar Python'], 1),
          choice('¿Qué devuelve np.array([1, 2, 3]) * 2?', ['[1, 2, 3, 1, 2, 3]', '[2, 4, 6]', '12', 'Error'], 1, { explanation: 'En NumPy la operación se aplica a cada elemento (en una lista normal de Python, * 2 duplicaría la lista).' }),
          fill('Importa NumPy con su alias habitual', 'import numpy as ___', 'np', ['np', 'num', 'npy', 'n']),
          fill('Media del array', 'notas.___()', 'mean', ['mean', 'promedio', 'media', 'avg']),
        ]
      ),
      lesson(
        'DataFrames',
        [
          card('Una tabla en Python', '**pandas** es la librería estrella del análisis. Su estructura principal es el **DataFrame**: una tabla con filas y columnas, como una hoja de Excel. Cada columna es una **Series**.', `import pandas as pd\n\ndf = pd.read_csv("ventas.csv")\ndf.head()       # primeras 5 filas\ndf.shape        # (filas, columnas)\ndf.info()       # columnas y tipos\ndf.describe()   # estadísticas rápidas`),
          card('Columnas', 'Accede a una columna con corchetes. Crea columnas nuevas operando con otras.', `df["precio"]                  # una columna (Series)\ndf[["producto", "precio"]]    # varias columnas\ndf["total"] = df["precio"] * df["unidades"]`),
        ],
        [
          fill('Carga un CSV', 'df = pd.___("datos.csv")', 'read_csv', ['read_csv', 'open_csv', 'load', 'csv']),
          choice('¿Qué muestra df.head()?', ['La última fila', 'Las primeras 5 filas', 'Los nombres de las columnas', 'Un gráfico'], 1),
          choice('¿Qué devuelve df.shape para 100 filas y 4 columnas?', ['(4, 100)', '(100, 4)', '400', '[100, 4]'], 1),
          match('Une cada método con lo que hace', [['head()', 'Primeras filas'], ['info()', 'Columnas y tipos'], ['describe()', 'Estadísticas rápidas'], ['shape', 'Número de filas y columnas']]),
          choice('¿Cómo creas una columna "iva" con el 21 % del precio?', ['df.iva = 21', 'df["iva"] = df["precio"] * 0.21', 'df.add("iva")', 'iva(df)'], 1),
        ]
      ),
      lesson(
        'Filtrar y ordenar',
        [
          card('Filtrar filas', 'Escribe una condición sobre una columna dentro de corchetes. Para combinar condiciones usa `&` (y) y `|` (o), con **paréntesis**.', `df[df["precio"] > 100]\ndf[(df["ciudad"] == "Madrid") & (df["precio"] > 100)]\ndf[df["categoria"].isin(["libros", "juegos"])]`),
          card('Ordenar y seleccionar', '`sort_values` ordena; `loc` selecciona por etiquetas (filas y columnas).', `df.sort_values("precio", ascending=False)\ndf.loc[df["precio"] > 100, ["producto", "precio"]]\ndf["ciudad"].value_counts()  # cuántas filas por ciudad`),
        ],
        [
          choice('¿Cómo filtras ventas mayores de 50?', ['df.filter(50)', 'df[df["venta"] > 50]', 'df["venta" > 50]', 'df.where(50)'], 1),
          fill('Combina condiciones con "y"', 'df[(df["edad"] > 18) ___ (df["pais"] == "ES")]', '&', ['&', 'and', '&&', '+']),
          fill('Ordena de mayor a menor', 'df.sort_values("total", ascending=___)', 'False', ['False', 'True', 'desc', '0']),
          choice('¿Qué hace value_counts()?', ['Suma valores', 'Cuenta cuántas veces aparece cada valor', 'Borra duplicados', 'Ordena'], 1),
          choice('¿Por qué hacen falta paréntesis en (a > 1) & (b < 2)?', ['Por estilo', 'Porque & tiene más prioridad que > y <', 'No hacen falta', 'Para que sea más rápido'], 1),
        ]
      ),
    ]),
    unit('Transformar datos', 'Limpieza, agrupaciones, uniones y tablas dinámicas.', [
      lesson(
        'Limpieza de datos',
        [
          card('Datos sucios', 'Los datos reales vienen con **huecos** (`NaN`), **duplicados**, tipos incorrectos y errores de escritura.', `df.isna().sum()                 # nulos por columna\ndf = df.dropna(subset=["email"]) # quita filas sin email\ndf["edad"] = df["edad"].fillna(df["edad"].median())\ndf = df.drop_duplicates()`),
          card('Tipos y textos', 'Convierte columnas al tipo correcto y normaliza los textos.', `df["fecha"] = pd.to_datetime(df["fecha"])\ndf["precio"] = df["precio"].astype(float)\ndf["ciudad"] = df["ciudad"].str.strip().str.title()`),
        ],
        [
          choice('¿Qué representa NaN en pandas?', ['Un número muy grande', 'Un valor que falta', 'Un error de Python', 'Cero'], 1),
          match('Une cada método con su efecto', [['dropna()', 'Quitar filas con nulos'], ['fillna(x)', 'Rellenar nulos con x'], ['drop_duplicates()', 'Quitar filas repetidas'], ['isna()', 'Detectar nulos']]),
          fill('Convierte a fecha', 'df["dia"] = pd.___(df["dia"])', 'to_datetime', ['to_datetime', 'to_date', 'date', 'parse_date']),
          choice('" madrid " y "Madrid" cuentan como ciudades distintas. ¿Cómo lo arreglas?', ['Borrando la columna', 'Con .str.strip().str.title()', 'Con dropna()', 'No se puede'], 1),
          choice('Para rellenar edades vacías sin que influyan los valores extremos, es mejor la…', ['Media', 'Mediana', 'Suma', 'Moda siempre'], 1),
        ]
      ),
      lesson(
        'Agrupar y resumir',
        [
          card('groupby', '`groupby` agrupa filas por una columna y **resume** cada grupo. Es el equivalente a `GROUP BY` de SQL.', `df.groupby("ciudad")["total"].sum()\ndf.groupby("categoria")["precio"].mean()\ndf.groupby("ciudad").agg(ventas=("total", "sum"), pedidos=("id", "count"))`),
          card('Funciones de agregado', '`sum`, `mean`, `median`, `count`, `min`, `max`, `nunique` (valores distintos)… Puedes agrupar por **varias** columnas a la vez.', `df.groupby(["año", "ciudad"])["total"].sum()`),
        ],
        [
          fill('Ventas por ciudad', 'df.___("ciudad")["ventas"].sum()', 'groupby', ['groupby', 'group', 'aggregate', 'by']),
          choice('¿Qué hace df.groupby("tienda")["total"].mean()?', ['Total de cada fila', 'Media del total por cada tienda', 'Cuenta tiendas', 'Ordena tiendas'], 1),
          choice('¿Equivalente SQL de groupby?', ['WHERE', 'GROUP BY', 'ORDER BY', 'JOIN'], 1),
          match('Une cada agregado', [['sum', 'Suma'], ['mean', 'Media'], ['count', 'Cuántos hay'], ['nunique', 'Cuántos valores distintos']]),
          choice('Para saber cuántos clientes DISTINTOS compró cada mes, usarías…', ['count', 'nunique', 'sum', 'max'], 1),
        ]
      ),
      lesson(
        'Unir y pivotar',
        [
          card('merge', '`merge` une dos DataFrames por una columna común, como un `JOIN` de SQL. `how` indica el tipo: `inner`, `left`, `right`, `outer`.', `pedidos.merge(clientes, on="cliente_id", how="left")`),
          card('Tablas dinámicas', '`pivot_table` crea una tabla resumen con filas, columnas y valores, como las tablas dinámicas de Excel.', `df.pivot_table(\n  index="ciudad",\n  columns="mes",\n  values="total",\n  aggfunc="sum",\n)`),
        ],
        [
          fill('Une con clientes', 'pedidos.___(clientes, on="cliente_id")', 'merge', ['merge', 'combine', 'concat', 'append']),
          choice('how="left" en un merge conserva…', ['Solo las filas que coinciden', 'Todas las filas de la tabla izquierda', 'Todas las de la derecha', 'Ninguna'], 1),
          choice('¿Qué herramienta de Excel equivale a pivot_table?', ['BUSCARV', 'Tablas dinámicas', 'Formato condicional', 'Macros'], 1),
          order('Ordena un análisis típico', ['pd.read_csv("ventas.csv")', 'Limpiar nulos y duplicados', 'merge con la tabla de productos', 'groupby y sum', 'Hacer un gráfico']),
          choice('Para apilar dos DataFrames con las mismas columnas (uno debajo del otro) usas…', ['merge', 'pd.concat', 'groupby', 'pivot_table'], 1),
        ]
      ),
    ]),
  ],
};

export default {
  id: 'git',
  title: 'Git y GitHub',
  icon: '🌿',
  color: '#d9480f',
  level: 'Desde cero',
  description: 'Guarda el historial de tu código y trabaja en equipo.',
  units: [
    {
      title: 'Control de versiones',
      description: 'Commits, ramas y trabajo con GitHub.',
      lessons: [
        {
          title: '¿Qué es Git?',
          theory: [
            {
              title: 'Puntos de guardado',
              body: 'Git guarda el **historial** de tu código. Cada cambio importante es un **commit**, como un punto de guardado en un videojuego: puedes volver atrás cuando quieras.\n\n**GitHub** es una web para alojar repositorios Git en la nube.',
            },
            {
              title: 'Los comandos básicos',
              body: 'El flujo diario es: cambias archivos → `git add` → `git commit`.',
              code: `git init                  # crea un repositorio\ngit status                # ¿qué ha cambiado?\ngit add .                 # prepara todos los cambios\ngit commit -m "Mensaje"   # guarda el punto`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué es un commit?',
              options: ['Un archivo nuevo', 'Un punto de guardado en el historial', 'Un error', 'Una carpeta'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: 'Git y GitHub son…',
              options: ['Lo mismo', 'Git es la herramienta; GitHub una web que aloja repositorios', 'Dos lenguajes de programación', 'Git solo funciona online'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Crea un repositorio y guarda tus cambios',
              lines: ['git init', 'git add .', 'git commit -m "Primer commit"'],
            },
            {
              type: 'fill',
              prompt: 'Guarda los cambios con un mensaje',
              code: 'git ___ -m "Arreglo el menú"',
              answer: 'commit',
              options: ['commit', 'save', 'push', 'add'],
            },
            {
              type: 'choice',
              prompt: '¿Qué comando muestra qué archivos han cambiado?',
              options: ['git log', 'git status', 'git show', 'git init'],
              answer: 1,
            },
          ],
        },
        {
          title: 'Ramas',
          theory: [
            {
              title: 'Líneas de trabajo paralelas',
              body: 'Una **rama** es una línea de trabajo paralela. Así pruebas cosas nuevas sin romper la versión principal (`main`). Cuando funciona, la **fusionas** (merge).',
              code: `git branch nueva-funcion    # crea la rama\ngit switch nueva-funcion    # cámbiate a ella\n# …trabajas y haces commits…\ngit switch main\ngit merge nueva-funcion     # une los cambios`,
            },
            {
              title: 'Conflictos',
              body: 'Si dos ramas cambian la misma línea, Git no sabe cuál elegir: es un **conflicto**. Lo resuelves editando el archivo, eligiendo la versión buena y haciendo commit.',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Para qué sirve una rama?',
              options: ['Borrar el historial', 'Trabajar en algo nuevo sin tocar la versión principal', 'Subir archivos a internet', 'Comprimir el proyecto'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Cámbiate a la rama nueva-funcion',
              code: 'git ___ nueva-funcion',
              answer: ['switch', 'checkout'],
              options: ['switch', 'move', 'go', 'enter'],
            },
            {
              type: 'choice',
              prompt: '¿Qué comando une una rama con la actual?',
              options: ['git join', 'git merge', 'git add', 'git union'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Cuándo ocurre un conflicto?',
              options: ['Cuando no hay internet', 'Cuando dos ramas cambian las mismas líneas', 'Cuando haces muchos commits', 'Al crear una rama'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada comando con lo que hace',
              pairs: [
                ['git branch', 'Crear una rama'],
                ['git switch', 'Cambiar de rama'],
                ['git merge', 'Unir ramas'],
                ['git log', 'Ver el historial'],
              ],
            },
          ],
        },
        {
          title: 'Trabajar con GitHub',
          theory: [
            {
              title: 'Repositorios remotos',
              body: 'Un **remoto** es una copia del repositorio en otro sitio, normalmente GitHub.',
              code: `git clone https://github.com/usuario/repo.git\ngit push    # sube tus commits\ngit pull    # descarga los cambios de otros`,
            },
            {
              title: '.gitignore y pull requests',
              body: 'El archivo `.gitignore` indica qué **no** subir: por ejemplo `node_modules` o archivos con contraseñas.\n\nUna **pull request** es una propuesta para unir tu rama, que otras personas pueden revisar antes de aceptarla.',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué comando sube tus commits a GitHub?',
              options: ['git pull', 'git push', 'git upload', 'git send'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué hace git pull?',
              options: ['Borra la rama', 'Descarga e integra los cambios del remoto', 'Crea un commit', 'Sube tus cambios'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Descarga un repositorio de GitHub',
              code: 'git ___ https://github.com/usuario/repo.git',
              answer: 'clone',
              options: ['clone', 'copy', 'download', 'fork'],
            },
            {
              type: 'choice',
              prompt: '¿Para qué sirve .gitignore?',
              options: ['Ignorar errores', 'Indicar archivos que Git no debe guardar', 'Ocultar ramas', 'Borrar commits'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué es una pull request?',
              options: ['Descargar código', 'Una propuesta para unir cambios que otros revisan', 'Un tipo de commit', 'Un error de Git'],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      title: 'Git en el día a día',
      description: 'Deshacer cambios, buenos commits y trabajo en equipo.',
      lessons: [
        {
          title: 'Deshacer cambios',
          theory: [
            {
              title: 'Volver atrás',
              body: '- `git restore archivo`: descarta cambios **sin guardar** de un archivo\n- `git restore --staged archivo`: lo quita del `add`\n- `git revert <commit>`: crea un commit nuevo que **deshace** otro (seguro en ramas compartidas)',
              code: `git restore index.html\ngit revert a1b2c3d`,
            },
            {
              title: 'Ver el historial',
              body: '`git log --oneline` muestra los commits en una línea cada uno. `git diff` muestra qué ha cambiado y aún no has guardado.',
              code: `git log --oneline\n# a1b2c3d Añade menú\n# 9f8e7d6 Primer commit`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué comando descarta los cambios sin guardar de un archivo?',
              options: ['git restore', 'git delete', 'git undo', 'git clean'],
              answer: 0,
            },
            {
              type: 'choice',
              prompt: '¿Qué hace git revert?',
              options: ['Borra el historial', 'Crea un commit nuevo que deshace otro', 'Cambia de rama', 'Sube cambios'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Muestra el historial resumido',
              code: 'git log ___',
              answer: '--oneline',
              options: ['--oneline', '--short', '--mini', '--list'],
            },
            {
              type: 'choice',
              prompt: '¿Qué comando muestra los cambios que aún no has guardado?',
              options: ['git log', 'git diff', 'git show', 'git branch'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada comando con su uso',
              pairs: [
                ['git restore', 'Descartar cambios'],
                ['git revert', 'Deshacer un commit'],
                ['git diff', 'Ver cambios'],
                ['git log', 'Ver historial'],
              ],
            },
          ],
        },
        {
          title: 'Buenos commits',
          theory: [
            {
              title: 'Commits pequeños y claros',
              body: 'Un buen commit hace **una sola cosa** y su mensaje explica **qué** cambia. Así es fácil revisar, entender y deshacer.\n\n❌ `cambios`\n✅ `Añade validación al formulario de registro`',
            },
            {
              title: 'Conventional Commits',
              body: 'Muchos equipos usan prefijos para ordenar el historial:\n\n- `feat:` nueva funcionalidad\n- `fix:` corrección de un error\n- `docs:` documentación\n- `refactor:` mejorar código sin cambiar lo que hace',
              code: `git commit -m "feat: añade modo oscuro"\ngit commit -m "fix: corrige el cálculo del total"`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Cuál es el mejor mensaje de commit?',
              options: ['cosas', 'arreglos varios', 'Corrige el error al guardar la contraseña', 'asdf'],
              answer: 2,
            },
            {
              type: 'match',
              prompt: 'Une cada prefijo con su significado',
              pairs: [
                ['feat:', 'Nueva funcionalidad'],
                ['fix:', 'Corrección de error'],
                ['docs:', 'Documentación'],
                ['refactor:', 'Mejorar sin cambiar el comportamiento'],
              ],
            },
            {
              type: 'fill',
              prompt: 'Commit de una corrección',
              code: 'git commit -m "___: el botón ya no se duplica"',
              answer: 'fix',
              options: ['fix', 'feat', 'docs', 'style'],
            },
            {
              type: 'choice',
              prompt: '¿Por qué es mejor hacer commits pequeños?',
              options: ['Ocupan menos', 'Son más fáciles de revisar y deshacer', 'Git va más rápido', 'Es obligatorio'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué NO debes subir nunca a un commit?',
              options: ['Código fuente', 'Un README', 'Contraseñas y claves secretas', 'Archivos CSS'],
              answer: 2,
            },
          ],
        },
        {
          title: 'Trabajo en equipo',
          theory: [
            {
              title: 'El flujo con pull requests',
              body: 'El flujo más común en equipos:\n\n- Crea una rama para tu tarea\n- Haz commits\n- Sube la rama con `git push`\n- Abre una **pull request** en GitHub\n- Un compañero la revisa y se fusiona en `main`',
            },
            {
              title: 'git stash',
              body: '¿Tienes cambios a medias y necesitas cambiar de rama? `git stash` los guarda temporalmente y `git stash pop` los recupera.',
              code: `git stash        # guarda los cambios a medias\ngit switch main\n# …\ngit switch mi-rama\ngit stash pop    # los recupera`,
            },
          ],
          exercises: [
            {
              type: 'order',
              prompt: 'Ordena el flujo de trabajo',
              lines: ['git switch -c nueva-tarea', 'git add .', 'git commit -m "feat: nueva tarea"', 'git push'],
            },
            {
              type: 'choice',
              prompt: '¿Qué hace git stash?',
              options: ['Borra los cambios', 'Guarda temporalmente los cambios a medias', 'Crea una rama', 'Sube los cambios'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Recupera los cambios guardados',
              code: 'git stash ___',
              answer: 'pop',
              options: ['pop', 'get', 'back', 'load'],
            },
            {
              type: 'choice',
              prompt: '¿Para qué sirve la revisión de una pull request?',
              options: ['Para borrarla', 'Para que otra persona detecte errores antes de fusionar', 'Para subir más rápido', 'Para crear ramas'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué hace git switch -c nombre?',
              options: ['Borra la rama', 'Crea la rama y se cambia a ella', 'Fusiona la rama', 'Renombra la rama'],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
};

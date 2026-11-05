import { card, choice, lesson, unit } from './_helpers.js';

const englishLesson = (title, objective, examples, questions) =>
  lesson(
    title,
    [
      card('Objetivo', objective),
      card('Modelos útiles', examples),
    ],
    questions.map(([prompt, options, answer, explanation]) =>
      choice(prompt, options, answer, { explanation: explanation ?? `La opción correcta es «${options[answer]}».` })
    )
  );

export default {
  id: 'english-a1-c1',
  title: 'Inglés A1–C1',
  icon: '🇬🇧',
  color: '#4263eb',
  level: 'A1 a C1',
  description: 'Inglés práctico desde los fundamentos hasta la comunicación profesional avanzada.',
  units: [
    unit('A1 · Fundamentos', 'Presentarte, comprender frases frecuentes y hablar de rutinas.', [
      englishLesson(
        'Presentaciones y vocabulario esencial',
        'Aprende a saludar, presentarte y usar **to be** con pronombres personales. En inglés, el sujeto suele ser obligatorio: `I am`, `she is`, `they are`.',
        '`Hello, I am Ana.` · `She is from Spain.` · `They are students.`',
        [
          ['Choose the correct greeting.', ['Goodbye, nice to meet you.', 'Hello, nice to meet you.', 'Yesterday, nice to meet you.', 'Never, nice to meet you.'], 1],
          ['Complete: “I ___ from Madrid.”', ['is', 'are', 'am', 'be'], 2, '`I` se combina con `am`.'],
          ['Choose the correct sentence.', ['She are a student.', 'She is a student.', 'She am a student.', 'She be a student.'], 1],
          ['What does “How are you?” ask?', ['Tu nombre', 'Tu edad', 'Cómo estás', 'Dónde vives'], 2],
          ['Complete: “They ___ my friends.”', ['am', 'is', 'are', 'has'], 2, '`They` se combina con `are`.'],
        ]
      ),
      englishLesson(
        'Rutinas y presente simple',
        'Usa el **present simple** para hábitos y hechos. Con `he`, `she` o `it`, el verbo afirmativo suele añadir `-s`. Para negar: `do not` o `does not`.',
        '`I work every day.` · `He works at home.` · `She does not drink coffee.`',
        [
          ['Complete: “He ___ to work at eight.”', ['go', 'goes', 'going', 'gone'], 1],
          ['Choose the correct negative sentence.', ['She not likes tea.', 'She does not like tea.', 'She do not likes tea.', 'She is not like tea.'], 1],
          ['Which word signals a routine?', ['Yesterday', 'Every day', 'Right now', 'Last year'], 1],
          ['Complete: “___ you play football?”', ['Does', 'Are', 'Do', 'Is'], 2],
          ['Choose the correct sentence.', ['I usually read at night.', 'I read usually at night.', 'Usually I at night read.', 'I am usually read at night.'], 0],
        ]
      ),
    ]),
    unit('A2 · Situaciones cotidianas', 'Hablar del pasado, hacer planes y comparar opciones.', [
      englishLesson(
        'Pasado simple',
        'El **past simple** describe acciones terminadas. Los verbos regulares añaden `-ed`; los irregulares cambian de forma. En preguntas y negativas se usa `did` más el infinitivo.',
        '`We visited London.` · `I went home.` · `Did you see it?` · `She did not call.`',
        [
          ['Complete: “Yesterday I ___ to the cinema.”', ['go', 'went', 'gone', 'going'], 1],
          ['Choose the correct question.', ['Did you watched it?', 'Do you watched it?', 'Did you watch it?', 'Were you watch it?'], 2],
          ['Complete: “We ___ dinner at home last night.”', ['have', 'had', 'has', 'having'], 1],
          ['Choose the correct negative.', ['He did not come.', 'He did not came.', 'He not came.', 'He does not came.'], 0],
          ['Which expression refers to finished past time?', ['Tomorrow', 'At the moment', 'Last week', 'Every Monday'], 2],
        ]
      ),
      englishLesson(
        'Planes y comparaciones',
        'Usa `going to` para planes y comparativos para contrastar: `bigger`, `more useful`, `better`. `Will` es habitual en decisiones instantáneas y predicciones.',
        '`I am going to study.` · `This option is cheaper.` · `I think it will rain.`',
        [
          ['Complete: “We are ___ visit Rome.”', ['go to', 'going to', 'will to', 'going'], 1],
          ['Choose the comparative of “good”.', ['gooder', 'more good', 'best', 'better'], 3],
          ['Complete: “This laptop is ___ than that one.”', ['expensive', 'more expensive', 'most expensive', 'expensiver'], 1],
          ['Choose an instant decision.', ['I bought it yesterday.', 'I will answer the phone.', 'I answer every day.', 'I am answering before.'], 1],
          ['Complete: “My room is ___ than yours.”', ['small', 'smallest', 'smaller', 'more small'], 2],
        ]
      ),
    ]),
    unit('B1 · Comunicación independiente', 'Narrar con claridad y expresar posibilidades, consejos y condiciones.', [
      englishLesson(
        'Narración y tiempos verbales',
        'Combina **past continuous** para el contexto y **past simple** para el evento que lo interrumpe. El present perfect conecta una experiencia pasada con el presente.',
        '`I was working when she called.` · `I have visited Paris twice.` · `She has just arrived.`',
        [
          ['Complete: “I ___ when the alarm rang.”', ['slept', 'was sleeping', 'have slept', 'am sleeping'], 1],
          ['Choose the correct sentence.', ['I have seen him yesterday.', 'I saw him yesterday.', 'I see him yesterday.', 'I was see him yesterday.'], 1],
          ['Complete: “She has ___ finished the report.”', ['yet', 'ever', 'just', 'last'], 2],
          ['Which sentence describes life experience?', ['I went to Berlin in 2024.', 'I have been to Berlin.', 'I was going to Berlin yesterday.', 'I go to Berlin last year.'], 1],
          ['Complete: “While we ___, it started to rain.”', ['walked', 'were walking', 'have walked', 'walk'], 1],
        ]
      ),
      englishLesson(
        'Condicionales y verbos modales',
        'El primer condicional expresa una posibilidad real: `if + present, will`. El segundo imagina: `if + past, would`. Los modales expresan consejo, obligación o posibilidad.',
        '`If it rains, we will stay home.` · `If I had time, I would travel.` · `You should rest.`',
        [
          ['Complete: “If you study, you ___ the exam.”', ['pass', 'will pass', 'would passed', 'passed'], 1],
          ['Choose the best advice.', ['You should see a doctor.', 'You must to see a doctor.', 'You should to seeing a doctor.', 'You will seeing a doctor.'], 0],
          ['Complete: “If I were you, I ___ accept.”', ['will', 'would', 'am', 'have'], 1],
          ['Which modal expresses possibility?', ['might', 'must not', 'used to', 'did'], 0],
          ['Complete: “Employees ___ wear an ID badge.”', ['can to', 'must', 'would to', 'might to'], 1],
        ]
      ),
    ]),
    unit('B2 · Inglés profesional', 'Participar con fluidez, comprender matices y escribir en contextos profesionales.', [
      englishLesson(
        'Comunicación profesional',
        'En correos y reuniones profesionales conviene ser directo y cortés. Las formas indirectas (`Could you…?`, `Would you mind…?`) suavizan peticiones sin volverlas ambiguas.',
        '`Could you send the figures by Friday?` · `I would like to clarify one point.` · `Please find the report attached.`',
        [
          ['Choose the most professional request.', ['Send me the file now.', 'Could you send me the file by noon?', 'You send file.', 'Why no file?'], 1],
          ['Complete: “Please find the document ___.”', ['attach', 'attaching', 'attached', 'attachment'], 2],
          ['Choose a phrase for polite disagreement.', ['You are wrong.', 'I see your point, but I have a concern.', 'That makes no sense.', 'No.'], 1],
          ['What does “Could we move the deadline?” mean?', ['Cancelar el proyecto', 'Cambiar la fecha límite', 'Enviar una factura', 'Contratar a alguien'], 1],
          ['Complete: “I am writing to ___ our meeting.”', ['confirm', 'confirmation', 'confirmed', 'confirming of'], 0],
        ]
      ),
      englishLesson(
        'Gramática compleja y precisión',
        'La voz pasiva centra el resultado; las relativas añaden información; los conectores organizan argumentos. Elige estas estructuras por claridad, no solo por complejidad.',
        '`The issue was resolved.` · `The tool that we use is secure.` · `Although costs rose, revenue increased.`',
        [
          ['Choose the correct passive.', ['The team completed the task.', 'The task was completed by the team.', 'The task completed the team.', 'The team was the task.'], 1],
          ['Complete: “The person ___ called you is my manager.”', ['which', 'where', 'who', 'whose is'], 2],
          ['Choose the best contrast connector.', ['Therefore', 'Although', 'Because of', 'In addition'], 1],
          ['Complete: “By next month, we ___ the migration.”', ['finish', 'will have finished', 'have finish', 'were finished'], 1],
          ['Choose the correct sentence.', ['Despite the delay, we delivered on time.', 'Despite of the delay, we delivered.', 'Although the delay, we delivered.', 'Despite we delayed, on time.'], 0],
        ]
      ),
    ]),
    unit('C1 · Dominio avanzado', 'Comunicar ideas complejas con precisión, registro y capacidad crítica.', [
      englishLesson(
        'Matiz, registro y lenguaje natural',
        'En C1 importa la intención: distinguir certeza, cautela, énfasis e implicación. Los **hedges** como `arguably`, `appears to` o `to some extent` evitan afirmaciones excesivas.',
        '`The evidence appears to suggest…` · `This is by no means a simple issue.` · `The policy is broadly effective.`',
        [
          ['Choose the most cautious claim.', ['This proves the policy works.', 'The findings appear to support the policy.', 'The policy always works.', 'There is no doubt whatsoever.'], 1],
          ['What does “by no means” express?', ['Causa', 'Negación enfática', 'Una fecha', 'Una comparación'], 1],
          ['Choose the most formal option.', ['A lot of people think…', 'It is widely acknowledged that…', 'Loads of people say…', 'Everyone knows…'], 1],
          ['Complete: “The proposal is sound, ___ somewhat costly.”', ['albeit', 'because', 'unless', 'whereas of'], 0],
          ['Choose the natural collocation.', ['make a decision', 'do a decision', 'create a decision', 'perform a decision'], 0],
        ]
      ),
      englishLesson(
        'Argumentación y comprensión avanzada',
        'Una argumentación sólida presenta tesis, evidencia, límites y contraargumentos. Resume sin copiar la forma del original y separa lo que una fuente afirma de tu interpretación.',
        '`While the proposal offers clear benefits, its assumptions require scrutiny.` · `A plausible counterargument is…`',
        [
          ['Choose the strongest thesis.', ['Technology is good.', 'This essay examines how automation improves output while creating accountability risks.', 'I will talk about things.', 'There are many opinions.'], 1],
          ['Which phrase introduces a counterargument?', ['For instance', 'On the other hand', 'As a result', 'In summary only'], 1],
          ['Complete: “The conclusion is valid ___ the data is representative.”', ['provided that', 'despite', 'whereas', 'in spite'], 0],
          ['Choose the best synthesis.', ['Source A says X. Source B says Y.', 'Taken together, both sources support X, although they differ on its causes.', 'I copied both sources.', 'The sources are long.'], 1],
          ['What should an advanced summary preserve?', ['Every original word', 'Main claim, evidence and relevant limitations', 'Only personal opinion', 'Examples without context'], 1],
        ]
      ),
    ]),
  ],
};

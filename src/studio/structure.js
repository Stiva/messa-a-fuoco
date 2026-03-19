export const structure = (S) =>
  S.list()
    .title('Contenuti')
    .items([
      S.listItem()
        .title('Step 1 — Introduzione')
        .child(S.documentTypeList('step1Intro').title('Introduzione')),
      S.listItem()
        .title('Step 2 — Quiz')
        .child(
          S.list()
            .title('Step 2')
            .items([
              S.documentTypeListItem('step2QuizConfig').title('Configurazione Quiz'),
              S.documentTypeListItem('quizQuestion').title('Domande'),
              S.documentTypeListItem('quizProfile').title('Profili A/B/C'),
            ])
        ),
      S.listItem()
        .title('Step 3 — Scheda Focus e Progettazione')
        .child(
          S.list()
            .title('Step 3')
            .items([
              S.documentTypeListItem('step3DesignConfig').title('Configurazione Progettazione'),
              S.documentTypeListItem('gameInstructions').title('Istruzioni Mappa della Pace'),
              S.documentTypeListItem('step3Focus').title('Schede Focus (A, B, C)'),
            ])
        ),
      S.listItem()
        .title('Step 4 — Restituzione')
        .child(
          S.list()
            .title('Step 4')
            .items([
              S.documentTypeListItem('step4Output').title('Restituzione'),
              S.documentTypeListItem('mappaPacePhoto').title('Foto caricate'),
            ])
        ),
    ])

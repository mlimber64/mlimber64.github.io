/*
 * Diccionario de traducciones del portafolio.
 * Idioma principal: italiano ("it"). Los otros dos: inglés ("en") y español ("es").
 *
 * Cómo se usa (ver main.js):
 *  - data-i18n="clave"            -> reemplaza el texto del elemento
 *  - data-i18n-attr="attr:clave"  -> reemplaza un atributo (alt, aria-label...)
 *  - "hero.roles" es una lista separada por "|" que alimenta el efecto de escritura
 *
 * Para añadir un idioma: copia un bloque, cambia el código y añade un botón
 * con data-lang en index.html.
 */
const DEFAULT_LANG = 'it';

const translations = {
  /* ---------------------------------------------------------------- ITALIANO */
  it: {
    'meta.title': 'Limber Mendoza Tolentino · Sviluppatore Full Stack',
    'meta.description': 'Portfolio di Limber Mendoza Tolentino, sviluppatore full stack a Salerno: microservizi con Java e .NET, applicazioni Angular e app mobile Flutter.',
    'meta.ogDescription': 'Microservizi, applicazioni web e app mobile. Portfolio con i miei progetti principali.',

    'nav.skip': 'Vai al contenuto',
    'nav.about': 'Chi sono',
    'nav.projects': 'Progetti',
    'nav.skills': 'Competenze',
    'nav.contact': 'Contatti',
    'nav.menu': 'Apri il menu',

    'hero.eyebrow': 'Full Stack Developer · Salerno, Italia',
    'hero.hello': 'Ciao, sono',
    'hero.roles': 'Sviluppatore Full Stack|Architetture a microservizi|Applicazioni web con Angular|App mobile con Flutter',
    'hero.lead': "Progetto e costruisco sistemi a microservizi, applicazioni web e app mobile. Mi occupo di architettura pulita, test automatici e integrazione continua, dal database all'interfaccia.",
    'hero.ctaProjects': 'Vedi i progetti',
    'hero.ctaContact': 'Contattami',

    'about.title': 'Chi sono',
    'about.p1': 'Sono uno sviluppatore full stack di Salerno. Mi piace trasformare un problema complesso in un sistema semplice da capire, da testare e da far crescere.',
    'about.p2': 'Lavoro con Java e Spring Boot, con .NET, con Angular e con Flutter. Nei miei progetti curo ogni dettaglio: architettura a livelli, messaggistica con eventi, pipeline di CI, analisi della qualità del codice e decisioni di progetto documentate.',
    'about.p3': 'Questo sito è disponibile in italiano, inglese e spagnolo: scegli la lingua in alto a destra.',
    'stat.repos': 'Repository su GitHub',
    'stat.featured': 'Progetti in evidenza',
    'stat.stacks': 'Stack principali',
    'stat.langs': 'Lingue del sito',

    'projects.title': 'Progetti in evidenza',
    'projects.subtitle': "Cinque progetti per mostrare come lavoro: dall'architettura a microservizi alle app mobile.",
    'projects.main': 'Progetto principale',
    'projects.code': 'Codice su GitHub',
    'projects.releases': 'Release',
    'projects.private': 'Repository privato',
    'projects.public': 'Codice pubblico',
    'projects.more': 'Tutti i repository su GitHub',

    'p1.tagline': 'Microservizi per ordini, magazzino e notifiche',
    'p1.desc': 'Sistema di gestione degli ordini a microservizi: catalogo, magazzino e ordini con riserva atomica delle giacenze, eventi su Apache Kafka con transactional outbox e notifiche in tempo reale.',
    'p1.f1': 'CI con test, SonarCloud e immagini pubblicate su GHCR',
    'p1.f2': 'Decisioni di architettura documentate in ADR',
    'p1.f3': 'Login con JWT o Keycloak (OIDC) e CDC opzionale con Debezium',
    'p1.alt': 'Cruscotto di Gestione Ordini: ordini per stato, ultimi ordini e scorte basse',
    'p2.tagline': 'Prenotazione e vendita di biglietti con microservizi .NET',
    'p2.desc': "Piattaforma per prenotare e vendere biglietti di eventi, a microservizi con .NET 9, PostgreSQL e RabbitMQ. L'acquisto attraversa quattro servizi con database diversi e si risolve con una saga, Outbox/Inbox e rimborsi compensativi.",
    'p2.f1': 'Saga di acquisto con rimborsi compensativi, coperta da test end-to-end',
    'p2.f2': 'Cinque servizi con database separati e Gateway YARP con rate limiting',
    'p2.f3': 'JWT con refresh token rotanti, CQRS con MediatR e CI su GitHub Actions',
    'eh.tabs': 'Schermate di EventHub',
    'eh.tab1': 'Catalogo',
    'eh.tab2': 'Pagamento',
    'eh.tab3': 'Pagamento rifiutato',
    'eh.tab4': 'Organizzatore',
    'eh.alt1': 'Catalogo di EventHub con filtri per categoria e otto eventi',
    'eh.alt2': 'Pagamento con conto alla rovescia di dieci minuti e carte di prova',
    'eh.alt3': 'Pagamento rifiutato dalla banca, con i tentativi rimasti',
    'eh.alt4': "Pannello dell'organizzatore con l'elenco degli eventi",
    'eh.note': "Interfaccia dell'app in spagnolo. I pagamenti sono simulati.",
    'p3.desc': "App fitness intelligente: scansione dei pasti con l'IA, controllo nutrizionale e del budget. Clean Architecture feature-first: il backend (Supabase) si può sostituire senza toccare l'interfaccia.",
    'p4.desc': "Tutor di lingue con intelligenza artificiale per Android: otto lingue da imparare, tra cui il quechua del sud, interfaccia in italiano, inglese e spagnolo, e conversazione con l'insegnante IA basata su Gemini.",
    'p5.desc': 'App mobile Flutter dedicata alla storia e alla cultura peruviana: sette ere storiche su una linea del tempo, interfaccia trilingue (IT/ES/EN) e modello freemium.',

    'skills.title': 'Competenze',
    'skills.subtitle': 'Gli strumenti che uso ogni giorno e che trovi nei miei progetti.',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.mobile': 'Mobile',
    'skills.data': 'Dati e messaggistica',
    'skills.devops': 'DevOps e qualità',
    'skills.practice': 'Metodo',
    'skills.m1': 'Test end-to-end',
    'skills.m2': 'Saga',
    'skills.m3': 'Code review',

    'contact.title': 'Lavoriamo insieme',
    'contact.lead': "Hai un progetto, un'idea o un'opportunità? Scrivimi: rispondo volentieri.",
    'contact.email': 'Scrivimi una email',

    'footer.built': 'Fatto a mano con HTML, CSS e JavaScript.',
    'footer.top': 'Torna su'
  },

  /* ------------------------------------------------------------------ INGLÉS */
  en: {
    'meta.title': 'Limber Mendoza Tolentino · Full Stack Developer',
    'meta.description': 'Portfolio of Limber Mendoza Tolentino, a full stack developer based in Salerno: microservices with Java and .NET, Angular applications and Flutter mobile apps.',
    'meta.ogDescription': 'Microservices, web applications and mobile apps. A portfolio of my main projects.',

    'nav.skip': 'Skip to content',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.menu': 'Open menu',

    'hero.eyebrow': 'Full Stack Developer · Salerno, Italy',
    'hero.hello': "Hi, I'm",
    'hero.roles': 'Full Stack Developer|Microservice architectures|Web applications with Angular|Mobile apps with Flutter',
    'hero.lead': 'I design and build microservice systems, web applications and mobile apps. I care about clean architecture, automated testing and continuous integration, from the database to the interface.',
    'hero.ctaProjects': 'See my projects',
    'hero.ctaContact': 'Get in touch',

    'about.title': 'About me',
    'about.p1': 'I am a full stack developer based in Salerno. I like turning a complex problem into a system that is easy to understand, test and grow.',
    'about.p2': 'I work with Java and Spring Boot, .NET, Angular and Flutter. In my projects I take care of every detail: layered architecture, event-driven messaging, CI pipelines, code quality analysis and documented design decisions.',
    'about.p3': 'This site is available in Italian, English and Spanish: pick your language at the top right.',
    'stat.repos': 'Repositories on GitHub',
    'stat.featured': 'Featured projects',
    'stat.stacks': 'Main stacks',
    'stat.langs': 'Site languages',

    'projects.title': 'Featured projects',
    'projects.subtitle': 'Five projects that show how I work: from microservice architecture to mobile apps.',
    'projects.main': 'Main project',
    'projects.code': 'Code on GitHub',
    'projects.releases': 'Releases',
    'projects.private': 'Private repository',
    'projects.public': 'Public code',
    'projects.more': 'All repositories on GitHub',

    'p1.tagline': 'Microservices for orders, stock and notifications',
    'p1.desc': 'An order management system built as microservices: catalogue, warehouse and orders with atomic stock reservation, events on Apache Kafka with a transactional outbox, and real-time notifications.',
    'p1.f1': 'CI with tests, SonarCloud and images published to GHCR',
    'p1.f2': 'Architecture decisions documented as ADRs',
    'p1.f3': 'Login with JWT or Keycloak (OIDC) and optional CDC with Debezium',
    'p1.alt': 'Gestione Ordini dashboard: orders by status, latest orders and low stock',
    'p2.tagline': 'Event ticket booking and sales on .NET microservices',
    'p2.desc': 'A platform to book and sell event tickets, built as microservices with .NET 9, PostgreSQL and RabbitMQ. A purchase crosses four services with separate databases and is resolved with a saga, Outbox/Inbox and compensating refunds.',
    'p2.f1': 'Purchase saga with compensating refunds, covered by end-to-end tests',
    'p2.f2': 'Five services with separate databases and a YARP Gateway with rate limiting',
    'p2.f3': 'JWT with rotating refresh tokens, CQRS with MediatR and CI on GitHub Actions',
    'eh.tabs': 'EventHub screens',
    'eh.tab1': 'Catalogue',
    'eh.tab2': 'Payment',
    'eh.tab3': 'Declined payment',
    'eh.tab4': 'Organiser',
    'eh.alt1': 'EventHub catalogue with category filters and eight events',
    'eh.alt2': 'Checkout with a ten-minute countdown and test cards',
    'eh.alt3': 'Payment declined by the bank, showing the attempts left',
    'eh.alt4': 'Organiser dashboard listing the events',
    'eh.note': 'The app interface is in Spanish. Payments are simulated.',
    'p3.desc': 'A smart fitness app: AI meal scanning, nutrition tracking and budget control. Feature-first Clean Architecture: the backend (Supabase) can be swapped without touching the UI.',
    'p4.desc': 'An AI-powered language tutor for Android: eight languages to learn, including Southern Quechua, an interface in Italian, English and Spanish, and conversation with an AI teacher built on Gemini.',
    'p5.desc': 'A Flutter mobile app about Peruvian history and culture: seven historical eras on a timeline, a trilingual interface (IT/ES/EN) and a freemium model.',

    'skills.title': 'Skills',
    'skills.subtitle': 'The tools I use every day and that you will find in my projects.',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.mobile': 'Mobile',
    'skills.data': 'Data & messaging',
    'skills.devops': 'DevOps & quality',
    'skills.practice': 'Practices',
    'skills.m1': 'End-to-end testing',
    'skills.m2': 'Saga',
    'skills.m3': 'Code review',

    'contact.title': "Let's work together",
    'contact.lead': 'Do you have a project, an idea or an opportunity? Write to me: I will be glad to reply.',
    'contact.email': 'Send me an email',

    'footer.built': 'Handcrafted with HTML, CSS and JavaScript.',
    'footer.top': 'Back to top'
  },

  /* ----------------------------------------------------------------- ESPAÑOL */
  es: {
    'meta.title': 'Limber Mendoza Tolentino · Desarrollador Full Stack',
    'meta.description': 'Portafolio de Limber Mendoza Tolentino, desarrollador full stack en Salerno: microservicios con Java y .NET, aplicaciones Angular y apps móviles Flutter.',
    'meta.ogDescription': 'Microservicios, aplicaciones web y apps móviles. Portafolio con mis proyectos principales.',

    'nav.skip': 'Saltar al contenido',
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',
    'nav.menu': 'Abrir el menú',

    'hero.eyebrow': 'Full Stack Developer · Salerno, Italia',
    'hero.hello': 'Hola, soy',
    'hero.roles': 'Desarrollador Full Stack|Arquitecturas de microservicios|Aplicaciones web con Angular|Apps móviles con Flutter',
    'hero.lead': 'Diseño y construyo sistemas de microservicios, aplicaciones web y apps móviles. Me ocupo de la arquitectura limpia, las pruebas automáticas y la integración continua, desde la base de datos hasta la interfaz.',
    'hero.ctaProjects': 'Ver proyectos',
    'hero.ctaContact': 'Contáctame',

    'about.title': 'Sobre mí',
    'about.p1': 'Soy desarrollador full stack y vivo en Salerno. Me gusta convertir un problema complejo en un sistema fácil de entender, de probar y de hacer crecer.',
    'about.p2': 'Trabajo con Java y Spring Boot, con .NET, con Angular y con Flutter. En mis proyectos cuido cada detalle: arquitectura por capas, mensajería con eventos, pipelines de CI, análisis de calidad del código y decisiones de diseño documentadas.',
    'about.p3': 'Este sitio está disponible en italiano, inglés y español: elige el idioma arriba a la derecha.',
    'stat.repos': 'Repositorios en GitHub',
    'stat.featured': 'Proyectos destacados',
    'stat.stacks': 'Stacks principales',
    'stat.langs': 'Idiomas del sitio',

    'projects.title': 'Proyectos destacados',
    'projects.subtitle': 'Cinco proyectos para mostrar cómo trabajo: desde la arquitectura de microservicios hasta las apps móviles.',
    'projects.main': 'Proyecto principal',
    'projects.code': 'Código en GitHub',
    'projects.releases': 'Releases',
    'projects.private': 'Repositorio privado',
    'projects.public': 'Código público',
    'projects.more': 'Todos los repositorios en GitHub',

    'p1.tagline': 'Microservicios de pedidos, almacén y notificaciones',
    'p1.desc': 'Sistema de gestión de pedidos con microservicios: catálogo, almacén y pedidos con reserva atómica del stock, eventos en Apache Kafka con transactional outbox y notificaciones en tiempo real.',
    'p1.f1': 'CI con pruebas, SonarCloud e imágenes publicadas en GHCR',
    'p1.f2': 'Decisiones de arquitectura documentadas en ADR',
    'p1.f3': 'Login con JWT o Keycloak (OIDC) y CDC opcional con Debezium',
    'p1.alt': 'Panel de Gestione Ordini: pedidos por estado, últimos pedidos y stock bajo',
    'p2.tagline': 'Reserva y venta de entradas con microservicios .NET',
    'p2.desc': 'Plataforma para reservar y vender entradas de eventos, con microservicios en .NET 9, PostgreSQL y RabbitMQ. La compra recorre cuatro servicios con bases de datos distintas y se resuelve con una saga, Outbox/Inbox y reembolsos compensatorios.',
    'p2.f1': 'Saga de compra con reembolsos compensatorios, cubierta por pruebas end-to-end',
    'p2.f2': 'Cinco servicios con bases de datos separadas y Gateway YARP con rate limiting',
    'p2.f3': 'JWT con refresh tokens rotativos, CQRS con MediatR y CI en GitHub Actions',
    'eh.tabs': 'Pantallas de EventHub',
    'eh.tab1': 'Catálogo',
    'eh.tab2': 'Pago',
    'eh.tab3': 'Pago rechazado',
    'eh.tab4': 'Organizador',
    'eh.alt1': 'Catálogo de EventHub con filtros por categoría y ocho eventos',
    'eh.alt2': 'Pago con cuenta atrás de diez minutos y tarjetas de prueba',
    'eh.alt3': 'Pago rechazado por el banco, con los intentos que quedan',
    'eh.alt4': 'Panel del organizador con la lista de eventos',
    'eh.note': 'La interfaz de la app está en español. Los pagos son simulados.',
    'p3.desc': 'App fitness inteligente: escaneo de comidas con IA, control nutricional y de presupuesto. Clean Architecture feature-first: el backend (Supabase) se puede sustituir sin tocar la interfaz.',
    'p4.desc': 'Tutor de idiomas con inteligencia artificial para Android: ocho idiomas para aprender, entre ellos el quechua sureño, interfaz en italiano, inglés y español, y conversación con el profesor IA basado en Gemini.',
    'p5.desc': 'App móvil Flutter dedicada a la historia y la cultura peruanas: siete eras históricas en una línea de tiempo, interfaz trilingüe (IT/ES/EN) y modelo freemium.',

    'skills.title': 'Habilidades',
    'skills.subtitle': 'Las herramientas que uso a diario y que encontrarás en mis proyectos.',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.mobile': 'Móvil',
    'skills.data': 'Datos y mensajería',
    'skills.devops': 'DevOps y calidad',
    'skills.practice': 'Método',
    'skills.m1': 'Pruebas end-to-end',
    'skills.m2': 'Saga',
    'skills.m3': 'Code review',

    'contact.title': 'Trabajemos juntos',
    'contact.lead': '¿Tienes un proyecto, una idea o una oportunidad? Escríbeme: te responderé con gusto.',
    'contact.email': 'Escríbeme un correo',

    'footer.built': 'Hecho a mano con HTML, CSS y JavaScript.',
    'footer.top': 'Volver arriba'
  }
};

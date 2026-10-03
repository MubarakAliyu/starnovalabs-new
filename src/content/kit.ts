/** Kids in Tech — the flagship programme page. */
export const kit = {
  hero: {
    label: 'Flagship programme',
    title: 'KIDS IN TECH',
    coBrand: 'A StarNova Labs programme',
    lead: 'Practical technology skills for children, delivered through intensive, project-based bootcamps with partner schools.',
    stickers: [
      { text: '<build/>', fill: 'gold' as const, rotate: -3 },
      { text: '{ create }', fill: 'blue' as const, rotate: 2 },
      { text: '[ innovate ]', fill: 'white' as const, rotate: -2 },
    ],
    primaryCta: { label: 'Enrol at kidsintech.school', href: 'https://www.kidsintech.school' },
    secondaryCta: { label: 'Bring KIT to your school', href: '/partner#schools' },
  },

  problem: {
    label: 'The problem',
    heading: 'Most children meet technology as consumers.',
    body: 'Children across Northern Nigeria grow up surrounded by phones and screens, and almost never get to see how any of it is made. Schools want to teach practical technology but rarely have the specialist people, the curriculum or the equipment. The result is a generation fluent in using software and unfamiliar with building it. Kids in Tech exists to close that gap, one cohort at a time.',
  },

  cohort: {
    label: 'How a cohort works',
    heading: 'Four steps, every cohort.',
    steps: [
      {
        index: '01',
        title: 'Placement',
        body: 'New and returning students are grouped by level.',
        image: '/images/classroom/class-in-session.jpg',
      },
      {
        index: '02',
        title: 'Build from day one',
        body: 'A project starts in the first session; concepts arrive through the work.',
        image: '/images/coding/pair-coding.jpg',
      },
      {
        index: '03',
        title: 'Peer support',
        body: 'Faster learners sit with those who need help, lifting the whole class.',
        image: '/images/classroom/instructor-helping.jpg',
      },
      {
        index: '04',
        title: 'Showcase',
        body: 'Every student finishes with something they can demonstrate and explain.',
        image: '/images/classroom/demo-day.jpg',
      },
    ],
  },

  tracks: {
    heading: 'Three tracks. One pathway.',
    items: [
      {
        index: '01',
        name: 'Scratch Programming',
        subtitle: 'Foundation · logic & thinking',
        body: 'Computational thinking, programming logic, sprites, events and interactions. Students build games and animated stories, structuring ideas before syntax.',
        image: '/images/projects/scratch-game.jpg',
        video: {
          src: '/video/scratch-game-loop.mp4',
          poster: '/video/scratch-game-poster.jpg',
          label: 'A student-built Scratch game running on screen.',
        },
      },
      {
        index: '02',
        name: 'Web Development',
        subtitle: 'Structure · building for the web',
        body: 'From structure and styling into interaction. Students build real pages they can publish and show.',
        image: '/images/coding/code-editor.jpg',
        video: null,
      },
      {
        index: '03',
        name: 'Robotics & Embedded Systems',
        subtitle: 'Integration · hardware & control',
        body: 'Sensors, pin mapping, wiring and physical computing, progressing to working demonstrations. Students learn to modify code deliberately, not copy it.',
        image: '/images/projects/robotics-arduino.jpg',
        video: null,
      },
    ],
    pathway: {
      /** Read out in place of the diagram. */
      label:
        'Every student starts on the Scratch foundation, then specialises in either Web Development or Robotics, and stays in that specialisation until mastery.',
      steps: [
        'Scratch foundation',
        'Specialise: Web Development or Robotics',
        'Stay in a specialisation until mastery',
      ],
    },
  },

  teaching: {
    label: 'How we teach',
    heading: 'Five things that shape every session.',
    principles: [
      {
        index: '01',
        title: 'Practical before theoretical',
        body: 'Students build first and name the concept afterwards.',
      },
      {
        index: '02',
        title: 'Differentiated instruction',
        body: 'Groups are set by level, so nobody is bored and nobody is lost.',
      },
      {
        index: '03',
        title: 'Understanding as the measure',
        body: 'We move on when students can explain it, not when the week ends.',
      },
      {
        index: '04',
        title: 'Peer support structures',
        body: 'Students who grasp something first are asked to teach it.',
      },
      {
        index: '05',
        title: 'Continuity beyond the classroom',
        body: 'KITOS keeps the work going between cohorts.',
      },
    ],
  },

  impact: {
    label: 'Impact',
    heading: 'What the programme has produced.',
  },

  audiences: {
    schools: {
      heading: 'For schools',
      body: 'We bring the curriculum, the trained tutors and an equipment plan; the school brings the students and the room. Partner schools share in programme revenue, and parents see outcomes they can point at.',
      cta: { label: 'Partner with us', href: '/partner#schools' },
    },
    parents: {
      heading: 'For parents',
      body: 'Enrolment, schedules and fees live on kidsintech.school.',
      cta: { label: 'Enrol your child', href: 'https://www.kidsintech.school' },
      safeguarding: { label: 'How we keep children safe', href: '/safeguarding' },
      followHeading: 'Follow Kids in Tech',
    },
  },

  gallery: [
    '/images/classroom/demo-day.jpg',
    '/images/community/chess-with-mentor.jpg',
    '/images/coding/girls-coding.jpg',
    '/images/groups/cohort-kebbi-outdoor.jpg',
    '/images/projects/bootcamp-handbooks.jpg',
    '/images/community/foosball.jpg',
    '/images/classroom/instructor-helping.jpg',
    '/images/coding/three-at-laptops.jpg',
    '/images/community/jenga.jpg',
  ],

  cta: {
    headline: 'THE NEXT INNOVATOR MIGHT BE IN YOUR CLASSROOM.',
    actions: [
      { label: 'Bring KIT to your school', href: '/partner#schools', variant: 'accent' as const },
      { label: 'Talk to us', href: '/contact?topic=school', variant: 'secondary' as const },
    ],
  },
} as const;

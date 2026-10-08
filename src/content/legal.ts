/**
 * Legal and safeguarding copy.
 *
 * `reviewed` is the gate. Until a solicitor has signed a page off it stays
 * false, and production shows a short holding notice instead of draft text
 * presented as policy. Development always shows the draft, marked as a draft,
 * so it can be read and edited.
 */
export interface LegalSection {
  id: string;
  heading: string;
  /** Paragraphs and bullet lists, in order. */
  body: (string | { list: string[] })[];
}

export interface LegalPage {
  slug: 'safeguarding' | 'privacy' | 'terms';
  title: string;
  description: string;
  lastUpdated: string;
  reviewed: boolean;
  intro: string;
  sections: LegalSection[];
}

/** Shown in production while a page is still unreviewed. */
export const UNREVIEWED_NOTICE =
  'This policy is being finalised. Contact info@starnovalabs.com with questions.';

export const DRAFT_NOTICE = 'Draft — requires legal review';

export const legalPages: LegalPage[] = [
  {
    slug: 'safeguarding',
    title: 'Safeguarding',
    description:
      'How StarNova Labs protects the children in its programmes, and what we ask of the adults around them.',
    lastUpdated: '2026-10-03',
    reviewed: false,
    intro:
      'Kids in Tech works with children. That brings an obligation that sits above everything else we do, and this page sets out how we meet it.',
    sections: [
      {
        id: 'commitment',
        heading: 'Our commitment',
        body: [
          'Every child in a StarNova Labs programme has the right to learn in a place where they are safe, respected and spoken to well. We expect that of our staff, our tutors, our partner schools and ourselves.',
          'We speak about every child positively. We do not rank children against each other in public, and we do not describe any child as a problem.',
        ],
      },
      {
        id: 'photography',
        heading: 'Photographs and recordings',
        body: [
          'Photographs and video of children are only taken and published where a parent or guardian has given written consent, and consent can be withdrawn at any time by emailing us.',
          'We do not publish a child’s full name, their school, their class or any contact detail alongside their image. Where a child’s work is shown, anything identifying is removed first.',
          { list: [
            'No full names, schools or classes in captions or alt text.',
            'No images where a name, address, phone number or email is legible on a screen, a book or a wall.',
            'Preference for over-the-shoulder, hands-on-hardware and back-of-head compositions.',
          ] },
        ],
      },
      {
        id: 'staff',
        heading: 'Staff and tutors',
        body: [
          'Everyone who teaches on a StarNova Labs programme is known to us and works under the supervision of a named programme lead.',
          'A formal vetting procedure is being documented. Until it is published here, placements are made only from people already known to the founding team or recommended by a partner school.',
        ],
      },
      {
        id: 'concerns',
        heading: 'Raising a concern',
        body: [
          'If you are worried about a child in one of our programmes, or about the conduct of anyone delivering them, contact us at info@starnovalabs.com. Concerns about a child’s immediate safety should also go to the relevant local authority.',
          'We will acknowledge any concern raised with us within two working days.',
        ],
      },
    ],
  },

  {
    slug: 'privacy',
    title: 'Privacy',
    description:
      'What StarNova Labs collects through this website, why, how long we keep it and how to reach us about it.',
    lastUpdated: '2026-10-03',
    reviewed: false,
    intro:
      'This website collects as little as it can. There is no advertising, there are no tracking cookies, and nothing here is sold or shared for marketing.',
    sections: [
      {
        id: 'what-we-collect',
        heading: 'What we collect',
        body: [
          'The contact form is the only place this site asks for anything. It collects:',
          { list: [
            'Your name.',
            'Your email address.',
            'Your school or organisation, if you give one.',
            'The message you write.',
          ] },
          'We use it to reply to you and, if it leads somewhere, to carry on that conversation. Nothing more.',
        ],
      },
      {
        id: 'processors',
        heading: 'Who processes it',
        body: [
          'Messages are delivered by Resend, which handles the email in transit. This site is hosted by Vercel, which keeps standard server logs.',
          'Audience measurement is Vercel Analytics, which is cookieless and aggregate: it records page views and performance, not individuals, and sets nothing on your device.',
        ],
      },
      {
        id: 'retention',
        heading: 'How long we keep it',
        body: [
          'Enquiries are kept in our email for as long as the conversation is live and for up to twenty-four months afterwards, so we can pick up a thread a school or partner started. After that they are deleted.',
        ],
      },
      {
        id: 'rights',
        heading: 'Your rights',
        body: [
          'Under the Nigeria Data Protection Act 2023 you may ask what we hold about you, ask us to correct it, or ask us to delete it. Email info@starnovalabs.com and we will act within one month.',
        ],
      },
      {
        id: 'children',
        heading: 'Children',
        body: [
          'This website is written for adults. Enrolment happens on kidsintech.school, and we do not knowingly collect information about a child through this site. Anything about a child in our programmes is governed by our safeguarding policy.',
        ],
      },
    ],
  },

  {
    slug: 'terms',
    title: 'Terms',
    description:
      'The terms that apply to the StarNova Labs website and the services offered through it.',
    lastUpdated: '2026-10-03',
    reviewed: false,
    intro:
      'These terms cover your use of this website. Work we do for a client is governed by the agreement signed for that work, not by this page.',
    sections: [
      {
        id: 'use',
        heading: 'Using this site',
        body: [
          'You may read, link to and share anything published here. You may not use the site in a way that disrupts it, attempts to gain access to anything not published, or breaks the law.',
        ],
      },
      {
        id: 'ip',
        heading: 'Intellectual property',
        body: [
          'The StarNova Labs name, the Kids in Tech name, the marks, the written content and the photography on this site belong to StarNova Labs Ltd unless stated otherwise. Mango Grotesque is used under its own licence and is not ours to sublicense.',
          'Ask before reproducing anything commercially.',
        ],
      },
      {
        id: 'external',
        heading: 'Links out',
        body: [
          'We link to sites we do not control, including kidsintech.school and product demonstrations. We are not responsible for their content or their handling of your information.',
        ],
      },
      {
        id: 'liability',
        heading: 'Liability',
        body: [
          'The site is published in good faith and as it is. Figures quoted on it are accurate as at the date given beside them. We do not accept liability for loss arising from reliance on the site, so far as the law allows.',
        ],
      },
      {
        id: 'law',
        heading: 'Governing law',
        body: [
          'These terms are governed by the laws of the Federal Republic of Nigeria.',
        ],
      },
    ],
  },
];

export function legalPageBySlug(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}

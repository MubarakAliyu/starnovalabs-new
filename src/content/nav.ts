export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/** Header links on ≥1024px. */
export const primaryNav: NavItem[] = [
  { label: 'Kids in Tech', href: '/kids-in-tech' },
  { label: 'Products', href: '/products' },
  { label: 'Studio', href: '/studio' },
  { label: 'About', href: '/about' },
];

/** The full-screen overlay, numbered 01–07. */
export const menuNav: NavItem[] = [
  { label: 'Kids in Tech', href: '/kids-in-tech' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'KITOS', href: '/products/kitos' },
      { label: 'EduStack', href: '/products/edustack' },
      { label: 'NurAla Learning', href: '/products/nurala-learning' },
      { label: 'SkillStack', href: '/products/skillstack' },
    ],
  },
  { label: 'Studio', href: '/studio' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Partner with us', href: '/partner' },
  { label: 'Contact', href: '/contact' },
];

export interface FooterColumn {
  title: string;
  items: NavItem[];
}

export const footerNav: FooterColumn[] = [
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Partner with us', href: '/partner' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Products',
    items: [
      { label: 'Kids in Tech', href: '/kids-in-tech' },
      { label: 'KITOS', href: '/products/kitos' },
      { label: 'EduStack', href: '/products/edustack' },
      { label: 'NurAla Learning', href: '/products/nurala-learning' },
      { label: 'SkillStack', href: '/products/skillstack' },
    ],
  },
  {
    title: 'Studio',
    items: [
      { label: 'Studio', href: '/studio' },
      { label: 'Work', href: '/work' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Safeguarding', href: '/safeguarding' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

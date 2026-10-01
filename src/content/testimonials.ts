export interface Testimonial {
  quote: string;
  /** Never a child's name, and never a school. */
  attribution: string;
  /** Written consent on file. Without it this never reaches production. */
  consent: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "My son was always reserved, but after the Kids in Tech Bootcamp I noticed a surge in his confidence and eagerness to learn. Now he can't wait to join the next bootcamp.",
    attribution: 'Parent, Kids in Tech',
    consent: false,
  },
];

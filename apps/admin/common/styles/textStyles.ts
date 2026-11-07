/**
 * Named text styles. Components take text styling only from here:
 *   <h1 :class="TextStyles.heading">...</h1>
 * Layout classes can be added next to a style:
 *   :class="[TextStyles.heading, 'mb-4']"
 *
 * Font: Inter everywhere. Headings 700, navigation 500, body 400, buttons 600.
 */
export const TextStyles = {
  displayTitle:
    'font-heading text-3xl md:text-[2.5rem] font-bold leading-tight tracking-tight text-textPrimary',
  heading:
    'font-heading text-2xl md:text-3xl font-bold leading-snug tracking-tight text-textPrimary',
  headingHighlight: 'text-primary',
  subheading: 'font-heading text-xl md:text-2xl font-bold leading-snug text-textPrimary',
  sectionTitle: 'font-heading text-lg md:text-xl font-bold text-textPrimary',
  cardTitle: 'font-body text-lg font-bold text-textPrimary',
  body: 'font-body text-base font-normal leading-relaxed text-textSecondary',
  bodySmall: 'font-body text-sm font-normal leading-relaxed text-textSecondary',
  caption: 'font-body text-xs font-normal text-textMuted',
  label: 'font-body text-sm font-medium text-textPrimary',
  listTitle: 'font-body text-base font-semibold text-textPrimary',
  listSubtitle: 'font-body text-sm font-normal text-textSecondary',
  button: 'font-body text-sm md:text-base font-semibold',
  buttonSmall: 'font-body text-sm font-semibold',
  price: 'font-body text-lg font-bold text-primary',
  link: 'font-body text-base font-semibold text-primary underline-offset-4 hover:underline',
  linkSmall: 'font-body text-sm font-semibold text-primary underline-offset-4 hover:underline',
  errorText: 'font-body text-sm text-error',
  requiredMark: 'text-error',
  ratingStars: 'font-body text-base text-secondary',
  cardTitleLink: 'font-body text-lg font-bold text-textPrimary hover:text-primary',

  // Admin panel
  input: 'font-body text-sm text-textPrimary placeholder:text-textMuted',
  tableHeader: 'font-body text-xs font-semibold uppercase tracking-wider text-textSecondary',
  tableCell: 'font-body text-sm text-textPrimary',
  badge: 'font-body text-xs font-semibold',
  navLink: 'font-body text-[15px] font-medium',
  navGroupTitle: 'font-body text-xs font-semibold uppercase tracking-wider text-textOnPrimary/70',
  brandTitle: 'font-heading text-lg font-bold text-textOnPrimary',
  userName: 'font-body text-sm font-semibold text-textPrimary',
  avatarInitials: 'font-body text-sm font-bold text-textOnPrimary',
  statLabel: 'font-body text-sm font-medium text-textPrimary',
  statValue: 'font-heading text-3xl font-bold text-textPrimary',
  quickActionLabel: 'font-body text-sm md:text-base font-semibold text-textPrimary',
  calendarMonthTitle: 'font-heading text-xl font-bold text-textPrimary',
  calendarWeekday: 'font-body text-xs font-semibold uppercase tracking-wider',
  calendarDay: 'font-body text-sm font-semibold text-textPrimary',
  calendarChip: 'font-body text-xs font-medium text-textOnPrimary',
  toastText: 'font-body text-sm font-medium text-textOnPrimary',
  seoPreviewTitle: 'font-body text-sm font-medium text-info',
} as const;

export type TextStyleName = keyof typeof TextStyles;

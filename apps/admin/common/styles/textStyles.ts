/**
 * Named text styles. Components take text styling only from here:
 *   <h1 :class="TextStyles.heading">...</h1>
 * Layout classes can be added next to a style:
 *   :class="[TextStyles.heading, 'mb-4']"
 *
 * Font: Inter everywhere. Headings 700, navigation 500, body 400, buttons 600.
 * On the user site (`.theme-user-site`) `font-heading` switches to Playfair Display.
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

  // User site (DESIGN.md type scale). font-heading = Playfair Display, font-body = Plus Jakarta Sans
  // inside `.theme-user-site`.
  siteDisplay:
    'font-heading text-[38px] leading-[46px] md:text-[56px] md:leading-[64px] font-semibold tracking-[-0.02em] text-textPrimary',
  siteHeadline:
    'font-heading text-[30px] leading-[38px] md:text-[40px] md:leading-[48px] font-semibold tracking-[-0.015em] text-textPrimary',
  siteHeadlineMd: 'font-heading text-[28px] leading-[36px] font-medium text-textPrimary',
  siteBrandShowcaseName:
    'font-heading text-[30px] leading-[38px] md:text-[36px] md:leading-[44px] font-semibold tracking-[-0.01em] text-textPrimary',
  siteBrandShowcaseNameOnDark:
    'font-heading text-[30px] leading-[38px] md:text-[36px] md:leading-[44px] font-semibold tracking-[-0.01em] text-textOnPrimary',
  siteBodyLgOnDark: 'font-body text-base leading-[26px] font-normal text-textOnPrimary/75',
  siteLabelOnDark: 'font-body text-sm leading-5 font-semibold tracking-[0.01em] text-textOnPrimary',
  siteHeadlineSm: 'font-heading text-[22px] leading-[30px] font-medium text-textPrimary',
  siteDishName: 'font-heading text-lg leading-snug font-medium text-textPrimary',
  /** Italic sapphire line inside a headline, for emotional words ("revered through generations"). */
  siteAccent: 'font-heading italic font-medium text-primary',
  siteAccentOnDark: 'font-heading italic font-medium text-secondary',
  siteSubheading: 'font-body text-[18px] leading-[28px] font-normal text-textSecondary',
  siteBodyLg: 'font-body text-base leading-[26px] font-normal text-textSecondary',
  siteBody: 'font-body text-sm leading-[22px] font-normal text-textSecondary',
  siteBodySm: 'font-body text-xs leading-[18px] font-normal text-textSecondary',
  siteEyebrow:
    'font-body text-[11px] leading-4 font-semibold uppercase tracking-[0.14em] text-secondary',
  /** Eyebrow over a photo: darker gold so it stays readable on the frosted pill. */
  siteEyebrowOnPhoto:
    'font-body text-[11px] leading-4 font-semibold uppercase tracking-[0.14em] text-secondaryDark',
  siteEyebrowMuted:
    'font-body text-[10px] leading-4 font-semibold uppercase tracking-[0.14em] text-textMuted',
  siteLabel: 'font-body text-sm leading-5 font-semibold tracking-[0.01em] text-textPrimary',
  siteButton: 'font-body text-[13px] leading-5 font-semibold uppercase tracking-[0.06em]',
  siteArrowLink:
    'font-body text-xs leading-5 font-semibold uppercase tracking-[0.1em] text-primary',
  siteHeroTitle:
    'font-heading text-[38px] leading-[46px] md:text-[56px] md:leading-[64px] font-semibold tracking-[-0.02em] text-textOnPrimary',
  siteHeroSubtitle:
    'font-body text-base md:text-lg font-normal leading-relaxed text-textOnPrimary/85',
  siteHeroEyebrow:
    'font-body text-[11px] leading-4 font-semibold uppercase tracking-[0.14em] text-secondary',
  siteBrandName: 'font-heading text-xl font-semibold leading-none text-primary',
  siteBrandTagline: 'font-body text-[9px] font-semibold uppercase tracking-[0.16em] text-secondary',
  siteNavLink: 'font-body text-[13px] font-medium',
  siteFooterTitle: 'font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary',
  siteFooterBrand: 'font-heading text-2xl font-semibold text-textOnPrimary',
  siteFooterText: 'font-body text-sm leading-relaxed text-textOnPrimary/70',
  siteFooterLink: 'font-body text-sm text-textOnPrimary/75 transition hover:text-secondary',
  siteFooterCaption: 'font-body text-xs text-textOnPrimary/55',
  siteQuote: 'font-heading text-[17px] italic leading-relaxed text-textPrimary',
  siteStatValue: 'font-heading text-4xl font-semibold text-primary',
  siteStatValueOnDark: 'font-heading text-4xl font-semibold text-secondary',
  siteMalayalamName: 'font-body text-xs font-normal text-textMuted',
  siteChip: 'font-body text-[11px] font-semibold tracking-[0.02em]',
  sitePrice: 'font-body text-sm font-semibold text-secondaryDark',
  siteBigPrice: 'font-heading text-3xl font-semibold text-primary',
  siteInfoTitle: 'font-body text-sm font-semibold text-textOnPrimary',
  siteInfoText: 'font-body text-[13px] leading-5 text-textOnPrimary/70',
} as const;

export type TextStyleName = keyof typeof TextStyles;

import { AppStrings } from '~/common/constants/appStrings';
import { usePublicSiteState } from '~/common/controllers/usePublicSiteState';
import type { PublicBusiness } from '~/common/types/userSite';
import { buildWhatsAppUrl } from '~/common/utils/buildWhatsAppUrl';
import type { ContactMethod } from '../model/contact.model';

const businessContactMethods = (business: PublicBusiness): ContactMethod[] => [
  {
    key: `${business.id}-whatsapp`,
    icon: 'whatsapp',
    title: `${business.name} · WhatsApp`,
    value: business.whatsApp,
    href: buildWhatsAppUrl(business.whatsApp, `Hi ${business.name}, I have a question.`),
    isExternal: true,
  },
  ...(business.phone
    ? [
        {
          key: `${business.id}-phone`,
          icon: 'phone' as const,
          title: `${business.name} · ${AppStrings.site.callUs}`,
          value: business.phone,
          href: `tel:${business.phone}`,
          isExternal: false,
        },
      ]
    : []),
];

/** Contact page: phone, WhatsApp and email for each business, the address and the map. */
export const useContactController = () => {
  const { settings, hotel, hallAndRooms, primaryPhone, isLoading, hasError, reloadSiteState } =
    usePublicSiteState();

  const businesses = computed(() =>
    [hotel.value, hallAndRooms.value].filter((business): business is PublicBusiness =>
      Boolean(business),
    ),
  );

  const contactMethods = computed<ContactMethod[]>(() => {
    const methods = businesses.value.flatMap(businessContactMethods);
    if (settings.value.contactEmail) {
      methods.push({
        key: 'email',
        icon: 'mail',
        title: 'Email',
        value: settings.value.contactEmail,
        href: `mailto:${settings.value.contactEmail}`,
        isExternal: false,
      });
    }
    if (!methods.length && primaryPhone.value) {
      methods.push({
        key: 'phone',
        icon: 'phone',
        title: AppStrings.site.callUs,
        value: primaryPhone.value,
        href: `tel:${primaryPhone.value}`,
        isExternal: false,
      });
    }
    return methods;
  });

  /** Only a Google Maps embed link is put into the iframe. */
  const mapEmbedUrl = computed(() => {
    const url = settings.value.mapEmbedUrl;
    return url && url.startsWith('https://www.google.com/maps/embed') ? url : null;
  });

  const isEmpty = computed(
    () => !isLoading.value && !hasError.value && contactMethods.value.length === 0,
  );

  return {
    settings,
    businesses,
    contactMethods,
    mapEmbedUrl,
    isLoading,
    hasError,
    isEmpty,
    reloadSiteState,
  };
};

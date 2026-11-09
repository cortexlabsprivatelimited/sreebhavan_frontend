export type { PublicImage as RoomImage, PublicRoom as Room } from '~/common/types/userSite';

/** Message pre-filled when a guest taps WhatsApp on a room page. */
export const buildRoomWhatsAppMessage = (roomName: string): string =>
  `Hi Sreebhavanam, I'd like to know about availability of the ${roomName}.`;

import { ApiConstants } from '~/common/constants/apiConstants';
import { useApiClient } from '~/common/services/apiClient';
import type { HallSlot } from '~/common/types/booking';
import { getErrorStatus } from '~/common/utils/getErrorMessage';
import {
  mapHall,
  mapHallPackages,
  type EventHallContent,
  type HallApiResponse,
  type HallAvailabilityEntry,
  type HallDayAvailability,
  type HallPackageApiResponse,
  type HallSlotState,
} from '../model/eventHall.model';

export const useEventHallRepository = () => {
  const apiClient = useApiClient();

  /** Hall details and packages. The hall is null until the admin sets it up (404). */
  const getEventHallContent = async (): Promise<EventHallContent> => {
    const [hall, packages] = await Promise.all([
      apiClient.get<HallApiResponse>(ApiConstants.public.hall).then(mapHall, (error: unknown) => {
        if (getErrorStatus(error) === 404) return null;
        throw error;
      }),
      apiClient.get<HallPackageApiResponse[]>(ApiConstants.public.hallPackages),
    ]);
    return { hall, packages: mapHallPackages(packages) };
  };

  /** Taken slots in a month ('YYYY-MM'). */
  const getAvailability = (monthKey: string) =>
    apiClient.get<HallAvailabilityEntry[]>(ApiConstants.public.hallAvailability, {
      month: monthKey,
    });

  return { getEventHallContent, getAvailability };
};

const stateOf = (entries: HallAvailabilityEntry[], slot: HallSlot): HallSlotState =>
  entries.find((entry) => entry.slot === slot)?.status ?? 'available';

/**
 * Slot states for one day, with the hall's double-booking rule: a full-day booking takes
 * morning and evening too, and a morning or evening booking makes the full day unavailable.
 */
export const getDayAvailability = (
  entries: HallAvailabilityEntry[],
  isoDate: string,
  todayIsoDate: string,
): HallDayAvailability => {
  if (isoDate < todayIsoDate) return { morning: 'past', evening: 'past', full: 'past' };

  const dayEntries = entries.filter((entry) => entry.date === isoDate);
  const full = stateOf(dayEntries, 'full');
  const morning = full !== 'available' ? full : stateOf(dayEntries, 'morning');
  const evening = full !== 'available' ? full : stateOf(dayEntries, 'evening');
  const partTaken = [morning, evening].find((state) => state !== 'available');
  return { morning, evening, full: full !== 'available' ? full : (partTaken ?? 'available') };
};

export const isSlotBookable = (state: HallSlotState): boolean => state === 'available';

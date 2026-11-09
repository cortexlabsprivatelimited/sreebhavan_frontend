import { ApiConstants } from '~/common/constants/apiConstants';
import { useApiClient } from '~/common/services/apiClient';
import { toMonthKey } from '~/common/utils/formatDate';
import {
  mapDashboardStats,
  type DashboardStats,
  type DashboardStatsApiResponse,
} from '../model/dashboard.model';

export const useDashboardRepository = () => {
  const apiClient = useApiClient();

  const getStats = async (month: Date): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStatsApiResponse>(
      ApiConstants.admin.dashboardStats,
      { month: toMonthKey(month) },
    );
    return mapDashboardStats(response);
  };

  return { getStats };
};

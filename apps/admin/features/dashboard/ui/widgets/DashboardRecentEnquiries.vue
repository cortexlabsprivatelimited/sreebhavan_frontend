<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import { formatDateTime } from '~/common/utils/formatDate';
import { getEnquiryStatusTone } from '~/common/utils/statusTones';
import AppCard from '~/common/widgets/AppCard.vue';
import AppEmptyState from '~/common/widgets/AppEmptyState.vue';
import AppIcon from '~/common/widgets/AppIcon.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { DashboardEnquiry } from '../../model/dashboard.model';

defineProps<{ enquiries: DashboardEnquiry[] }>();
</script>

<template>
  <AppCard title="Latest enquiries" icon="enquiries">
    <template #actions>
      <NuxtLink to="/enquiries" :class="[TextStyles.linkSmall, 'flex items-center gap-1']">
        View all <AppIcon name="arrowRight" class="h-4 w-4" />
      </NuxtLink>
    </template>
    <AppEmptyState v-if="enquiries.length === 0" message="No enquiries yet." />
    <ul v-else class="divide-y divide-border">
      <li
        v-for="enquiry in enquiries"
        :key="enquiry.id"
        class="flex items-center justify-between gap-3 py-3"
      >
        <div>
          <p :class="TextStyles.listTitle">
            {{ enquiry.name }} · {{ AppStrings.enquiryType[enquiry.type] }}
          </p>
          <p :class="TextStyles.listSubtitle">
            {{ enquiry.phone }} · {{ formatDateTime(enquiry.createdAt) }}
          </p>
        </div>
        <AppStatusBadge
          :label="AppStrings.enquiryStatus[enquiry.status]"
          :tone="getEnquiryStatusTone(enquiry.status)"
        />
      </li>
    </ul>
  </AppCard>
</template>

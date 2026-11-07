<script setup lang="ts">
import { AppStrings } from '~/common/constants/appStrings';
import { TextStyles } from '~/common/styles/textStyles';
import type { TableColumn } from '~/common/types/table';
import { formatDateTime } from '~/common/utils/formatDate';
import AppButton from '~/common/widgets/AppButton.vue';
import AppDataTable from '~/common/widgets/AppDataTable.vue';
import AppRowActions from '~/common/widgets/AppRowActions.vue';
import AppStatusBadge from '~/common/widgets/AppStatusBadge.vue';
import type { AdminUser } from '../../model/adminUsers.model';

defineProps<{
  users: AdminUser[];
  canChangeUser: (user: AdminUser) => boolean;
  resettingUserId: string | null;
}>();
const emit = defineEmits<{
  'edit-user': [user: AdminUser];
  'delete-user': [user: AdminUser];
  'reset-password': [user: AdminUser];
}>();

const columns: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role', widthClass: 'w-28' },
  { key: 'isActive', label: 'Status', widthClass: 'w-28' },
  { key: 'lastSignInAt', label: 'Last sign-in' },
  { key: 'actions', label: '', align: 'right', widthClass: 'w-72' },
];
</script>

<template>
  <AppDataTable :columns="columns" :rows="users">
    <template #cell-name="{ row }">
      <p :class="TextStyles.label">
        {{ row.name }}<span v-if="!canChangeUser(row)" :class="TextStyles.caption"> (you)</span>
      </p>
      <p :class="TextStyles.caption">{{ row.email }}</p>
    </template>
    <template #cell-role="{ row }">
      <AppStatusBadge
        :label="AppStrings.adminRole[row.role]"
        :tone="row.role === 'owner' ? 'info' : 'neutral'"
      />
    </template>
    <template #cell-isActive="{ row }">
      <AppStatusBadge
        :label="row.isActive ? 'Active' : 'Disabled'"
        :tone="row.isActive ? 'success' : 'error'"
      />
    </template>
    <template #cell-lastSignInAt="{ row }">
      <span :class="TextStyles.caption">{{
        row.lastSignInAt ? formatDateTime(row.lastSignInAt) : 'Never'
      }}</span>
    </template>
    <template #cell-actions="{ row }">
      <AppRowActions
        :can-delete="canChangeUser(row)"
        @edit="emit('edit-user', row)"
        @delete="emit('delete-user', row)"
      >
        <AppButton
          variant="ghost"
          size="sm"
          :is-loading="resettingUserId === row.id"
          @click="emit('reset-password', row)"
        >
          Reset password
        </AppButton>
      </AppRowActions>
    </template>
  </AppDataTable>
</template>

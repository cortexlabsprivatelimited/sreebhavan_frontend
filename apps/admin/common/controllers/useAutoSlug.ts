import type { Ref } from 'vue';
import { slugify } from '~/common/utils/slugify';

/**
 * While adding a new item, keeps `slug` in step with `name` until the admin edits the slug.
 * Existing items keep their slug, since changing it changes the public URL.
 */
export const useAutoSlug = <TForm extends { name?: string; title?: string; slug: string }>(
  form: Ref<TForm>,
  isEditing: Ref<boolean>,
  sourceField: 'name' | 'title' = 'name',
) => {
  watch(
    () => form.value[sourceField] ?? '',
    (newSource, oldSource) => {
      if (isEditing.value) return;
      const isSlugUntouched =
        form.value.slug === '' || form.value.slug === slugify(oldSource ?? '');
      if (isSlugUntouched) form.value.slug = slugify(newSource);
    },
  );
};

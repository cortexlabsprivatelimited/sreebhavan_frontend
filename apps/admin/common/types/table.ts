export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  /** Tailwind width class, e.g. 'w-24'. */
  widthClass?: string;
}

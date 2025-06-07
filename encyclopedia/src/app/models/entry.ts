export interface Entry {
  id?: string;
  title: string;
  type: string;
  /** ID of the category this entry belongs to */
  categoryId?: string;
  tags?: string[];
  content: string;
  relatedIds?: string[];
}

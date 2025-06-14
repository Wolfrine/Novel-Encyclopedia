export interface Entry {
  id?: string;
  /** Canonical slug used for the article URL */
  slug: string;
  title: string;
  type: string;
  /** ID of the category this entry belongs to */
  categoryId?: string;
  tags?: string[];
  content: string;
  relatedIds?: string[];
}

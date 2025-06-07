export interface Entry {
  id?: string;
  title: string;
  type: string;
  tags?: string[];
  content: string;
  relatedIds?: string[];
}

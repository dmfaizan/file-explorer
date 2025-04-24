export interface ItemInterface {
  id: number;
  name: string;
  type: string;
  size: number | null;
  path: string;
  created: Date;
  childIds: number[];
}

import { IOption } from '../interface/item.interface';

export class Option implements IOption {
  name: string;
  choices?: string[];
  extra: number;
}

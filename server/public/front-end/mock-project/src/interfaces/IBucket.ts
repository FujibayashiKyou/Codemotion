import { IProduct } from './IProduct';

export interface IBucket {
  product: IProduct;
  quantity: number;
  total: number;
}

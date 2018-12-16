export class Invoice {
  static readonly fieldSet: string[] = ['id', 'customer_id', 'discount', 'total', 'createdAt', 'updatedAt'];

  id: number;
  customer_id: number;
  discount: number;
  total: number;
  createdAt: any;
  updatedAt: any;

}

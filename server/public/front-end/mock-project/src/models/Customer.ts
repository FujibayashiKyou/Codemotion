export class Customer {

  static readonly fieldSet: string[] = ['id', 'name' , 'address', 'phone', 'createdAt', 'updatedAt'];

  id: number;
  name: string;
  address: string;
  phone: string;
  createdAt: any;
  updatedAt: any;
}

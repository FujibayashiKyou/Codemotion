export class StaticVaruables {
  // Navigation bar LinksID //
  static readonly Nav_MenuBar_ProductsId = 'products';
  static readonly Nav_MenuBar_CustomersId = 'customers';
  static readonly Nav_MenuBar_InvoicesId = 'invoices';

  // Table columns
  static readonly Customers_Table_Title: string = 'Customers';
  static readonly Customers_Field_Set: string[] = ['id', 'name' , 'address', 'phone'];

  static readonly Invoice_Table_Title: string = 'Invoice';
  static readonly Invoice_Field_Set: string[] = ['id', 'customer_id', 'discount', 'total'];

  static readonly Product_Table_Title: string = 'Products';
  static readonly Product_Field_Set: string[] = ['id', 'name', 'price'];
}

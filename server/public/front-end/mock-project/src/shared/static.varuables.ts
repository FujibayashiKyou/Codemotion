export class StaticVaruables {

  // Basic Api Routes
  static readonly Get_Customers_Api: string =  'http://localhost:8000/api/customers';
  static readonly Get_Invoices_Api: string =   'http://localhost:8000/api/invoices';
  static readonly Get_Products_Api: string =   'http://localhost:8000/api/products';

  // TEST
  static readonly Get_Last_InvoiceID = 1;

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
  static readonly Product_FIXED_QUANTITY_ZERO = 0;

  // Product table for DialogForm. When <new Invoice> created
  static readonly Customer_Choose_Products: string[] = ['select', 'id', 'name', 'price'];
}

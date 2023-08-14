export type VotesType = {
  count: number;
  value: number;
};

export type CollectionTypeList = {
  title: string;
  image_url?: string;
  handle?: string;
  totalCount?: number;
};

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[];
};

export type ReviewType = {
  name: string;
  avatar: string;
  description: string;
  punctuation: number;
};

export type ProductType = {
  id: string;
  title: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  product_type?: string;
  size: string;
  images: string[];
  discount?: string;
  description?: string;
  currentPrice: number;
  punctuation: PunctuationType;
  reviews: ReviewType[];
  Product_Images: string[];
  item: any;
  handle?: any;
  Product_Options?: any;
  Product_Variants?: any;
  Product_Extra?: any;
  Product_Meta?: [];
};

export type ProductTypeList = {
  id: string;
  title?: string;
  name?: string;
  color?: string;
  priceHtml: string;
  images: string;
  discount: number;
  specialPriceHtml?: string;
  handle?: string;
  Inventory_Item?: any;
  item?: any;
  quantity?: any;
  totalQuantity?: any;
  vendor?: any;
  listType?: any;
  collectionVendor?: any;
  trackQuantity?: boolean;
};

export type ProductStoreType = {
  product_id: string;
  variant_id?: string;
  item_id: string;
  quantity: number;
  product_name: string;
  discount_code?: string;
  discount_total?: number;
  discount_total_html?: string;
  thumb: string;
  price: number;
  variant_name?: string;
  handle?: string;
  priceHtml?: string;
  special_price?: number;
  specialPriceHtml?: string;
  totalHtml?: string;
  regularSubTotalHtml?: string;
  weight: number;
  discount?: number;
  subTotal?: number;
  regularSubTotal?: number;
};

export type GtagEventType = {
  action: string;
  category: string;
  label: string;
  value: string;
};
export type ProfileDetailType = {
  first_name: string;
  last_name: string;
};

export type UpdatePasswordType = {
  password: string;
  newPassword: string;
};

export type CustomerOrderListType = {
  id: number;
  title: string;
  financial_status: string;
  fulfillment_status: string;
  total: number;
  date_created_gmt: Date;
  totalHtml?: string;
  createdAtLocal: string;
};

export type CustomerAddressType = {
  id?: number;
  address_1: string;
  address_2: string;
  billing_first_name?: string;
  billing_last_name?: string;
  city?: string;
  billing_phone?: string;
  company: string;
  country?: string;
  postcode?: string;
  state?: string;
  selected_location: any;
  isEdit?: boolean;
  isDefault?: boolean;
};

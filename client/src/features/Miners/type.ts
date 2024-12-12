/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { User } from '../Auth/type';

export type Miner = {
  id: number;
  description: string;
  price: number;
  expense: number;
  modell_id: number;
  brand_id: number;
  subbrand_id: number;
  img: Array<string>;
  algorithm_id: number;
  currency_id: Array<number>;
  hashrate_id: number;
  algorithms_id: number;
  service_id: number;
  about: string;
  volt: number;
  cooling: string;
  temp: string;
  size: string;
  loud: number;
  };

export type Brand = {
  id: number;
  name: string;
};

export type Currency ={
  id: number;
  name: string;
};
export type Hashrate = {
  id: number;
  rate: string;
};
export type Modell = {
  id: number;
  name: string;
  subbrand_id: number;
  brand_id: number;
};

export type SubBrand = {
  id: number;
  name: string;
  brand_id: number;
  img: string;
};

export type Algorithm = {
  id: number;
  algo: string;
};

export type Comment = {
  id:number;
  user_id:number;
  title: string;
  miner_id: number;
  date:string;
  User:User;
};

export type CommentFetch = {
  title: string;
  miner_id: number;
};


export type CommentsState = {
  comment: Comment[],
  message: string | undefined
};

export type MinerState = {
  miners: Miner[];
  message: string | undefined;
};

export type BrandState = {
  brands: Brand[];
  message: string | undefined;
};

export type CurrencyState = {
  currencies: Currency[];
  message: string | undefined;
};

export type HashrateState = {
  hashrates: Hashrate[];
  message: string | undefined;
};

export type ModellState = {
  modells: Modell[];
  message: string | undefined;
};

export type SubBrandState = {
  subbrands: SubBrand[];
  message: string | undefined;
};

export type AlgorithmState = {
  algorithms: Algorithm[];
  message: string | undefined;
};
export type Order = {
  id: number;
  order_id: number;
  miner_id: number;
  total_price: number;
  service_id: number | undefined;
  count: number;
  Miner: Miner;
  Order: Order;
};
export type OrderItemOrder = {
  id: number;
  status: string;
  total_price: number;
  user_id: number;
};
export type OrderItemm = {
  id: number;
  order_id: number;
  miner_id: number;
  total_price: number;
  service_id: number | undefined;
  price: number;
  count: number;
  Miner: Miner;
  Order: OrderItemOrder;
};
export type Favorite = {
  id: number;
  user_id: number;
  miner_id: number;
  Miner: Miner;
};
export type FavoriteId = {
  id: number;
};
export type StateOrder = {
  orders: OrderItemm[];
  message: string | undefined;
  loading: boolean;
};

export type StateFavorite = {
  favorite: Favorite[];
  message: string | undefined;
};

export type OrderItemId = OrderItemm['id'];

export type Delivery = {
  first_name: string;
  middle_name: string;
  last_name: string;
  address: string;
  phone: string;
  passport: string;
  city: string;
  inn: string | undefined;
  company_name: string | undefined;
  order_id: number | undefined;
  delivery_method: string;
};

export type DeliveryWithoutOrederId = Omit<Delivery, 'order_id'>;

export type Deliverryy = {
  id: number;
  user_id: number;
  total_price: number;
  status: string;
  Deliveries: Delivery[];
};
export type StateDelivery = {
  deliveries: OrderClose[];
  message: string | undefined;
};
export type Service = {
  id: number;
  price: number;  
}
export type StateService = {
  services: Service[];
  message: string | undefined;
}

export type Post = {
  id: number;
  title: string;
  text: string;
  img: Array<string>;
  video: Array<string>;
  preview: string;
  createdAt: string;
}
export type StatePost = {
  posts: Post[];
  message: string | undefined;
}

export type OrderClose = {
  id: number;
  status: string;
  total_price: number;
  createdAt: string;
  Deliveries: Delivery[];
  OrderItems: OrderItemm[];
};


export type MinerItemId = Miner['id'];

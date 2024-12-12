/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Currency, Miner, Brand, Algorithm, Hashrate, SubBrand, Modell, Favorite,
  OrderItemId, Order, OrderItemm, Delivery, OrderClose, FavoriteId,
  Service, Post, } from "./type";

export const minersLoadFetch = async (): Promise<Miner[]> => {
  const res = await fetch('/api/miners');
  const data = await res.json();
  return data.miners;
};

export const minerAddFetch = async (obj: FormData): Promise<Miner> => {
    const res = await fetch('/api/miners', {
      method: 'post',
      body: obj
    });
    const data = await res.json();
    return data.miner;
  };

  export const minerDelFetch = async (id: number): Promise<Miner> => {
    const res = await fetch(`/api/miners/${id}`, {
      method: 'delete',
    });
    const data = await res.json();
    return data.miner;
  };
  export const minerUpdateFetch = async (obj: { id: number | undefined; obj: FormData }): Promise<Miner> => {
    const res = await fetch(`/api/miners/${obj.id}`, {
      method: 'put',
      body: obj.obj,
    });
    const data = await res.json();
    return data.miner;
  }

  export const brandsLoadFetch = async (): Promise<Brand[]> => {
    const res = await fetch('/api/brands');
    const data = await res.json();
    return data.brands;
  };

  export const brandAddFetch = async (obj: object): Promise<Brand> =>{
   const res = await fetch('api/brands/brands', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify(obj),
  });
   const data = await res.json();
   return data.brand
  };
  export const brandIdFetch = async (id: string | undefined): Promise<Brand> => {
    const res = await fetch(`/api/brands/${id}`);
    const data = await res.json();
    return data.brand;
  };

  export const algorithmsLoadFetch = async (): Promise<Algorithm[]> => {
    const res = await fetch('/api/algorithms');
    const data = await res.json();
    return data.algorithms;
  };
  export const algorithmAddFetch = async (obj: object): Promise<Algorithm> =>{
    const res = await fetch('api/algorithms/algorithms', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data.algorithm
   };
  export const algorithmIdFetch = async (id: string | undefined): Promise<Algorithm> => {
    const res = await fetch(`/api/algorithms/${id}`);
    const data = await res.json();
    return data.algorithm;
  };

  export const currenciesLoadFetch = async (): Promise<Currency[]> => {
    const res = await fetch('/api/currencies');
    const data = await res.json();
    return data.currencies;
  };
  export const currencyAddFetch = async (obj: object): Promise<Currency> => {
    const res = await fetch('/api/currencies/currencies', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data.currency;
  };
  export const currencyIdFetch = async (id: string | undefined): Promise<Currency> => {
    const res = await fetch(`/api/currencies/${id}`);
    const data = await res.json();
    return data.currency;
  };

  export const hashratesLoadFetch = async (): Promise<Hashrate[]> => {
    const res = await fetch('/api/hashrates');
    const data = await res.json();
    return data.hashrates;
  };

  export const hashratesAddFetch = async(obj: object): Promise<Hashrate> => {
    const res = await fetch('api/hashrates/hashrates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(obj),
    });
    const data = await res.json()
    return data.hashrates
  }
  export const hashrateIdFetch = async (id: string | undefined): Promise<Hashrate> => {
    const res = await fetch(`/api/hashrates/${id}`);
    const data = await res.json();
    return data.hashrate;
  };

  export const modellsLoadFetch = async (): Promise<Modell[]> => {
    const res = await fetch('/api/modells');
    const data = await res.json();
    return data.modells;
  };
  export const modellAddFetch = async(obj: object): Promise<Modell> => {
    const res = await fetch ('/api/modells/modells', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data.modell;
  }
  export const modellIdFetch = async (id: string | undefined): Promise<Modell> => {
    const res = await fetch(`/api/modells/${id}`);
    const data = await res.json();
    return data.modell;
  };

  export const subbrandsLoadFetch = async (): Promise<SubBrand[]> => {
    const res = await fetch('/api/subbrands');
    const data = await res.json();
    return data.subbrands;
  };
  export const subbrandsAddFetch = async (obj: FormData): Promise<SubBrand> => {
    const res = await fetch('api/subbrands/subbrands', {
      method: 'POST',
      body: obj,
    });
    const data = await res.json();
    return data.subbrand
  };
  export const subbrandIdFetch = async (id: string | undefined): Promise<SubBrand> => {
    const res = await fetch(`/api/subbrands/${id}`);
    const data = await res.json();
    return data.subbrand;
  };
  export const fetchOrderAdd = async (obj: {
    id: number | undefined;
    status: string;
    service_id: number;
  }): Promise<OrderItemm[]> => {
    const res = await fetch(`/api/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
  
    return data;
  };
  export const fetchOrdersLoad = async (): Promise<{ orders: OrderItemm[]; message: string }> => {
    const res = await fetch('/api/order/order');
    const data = await res.json();
  
    return data;
  };
  export const fetchOrderDel = async (
    id: OrderItemId,
  ): Promise<{ id: OrderItemId; order: Order }> => {
    const res = await fetch(`/api/order/${id}`, { method: 'DELETE' });
    const data = await res.json();
  
    return data;
  };
  // Увеличение количества товара
export const fetchOrderIncreaseQuantity = async (id: number): Promise<void> => {
  const response = await fetch(`/api/order/increase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при увеличении количества товара');
  }

  return response.json(); // Возвращаем данные ответа
};

// Уменьшение количества товара
export const fetchOrderDecreaseQuantity = async (id: number): Promise<void> => {
  const response = await fetch(`/api/order/decrease`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при уменьшении количества товара');
  }

  return response.json(); // Возвращаем данные ответа
};
  export const fetchFavotireAdd = async (id: number): Promise<Favorite> => {
    const res = await fetch(`/api/favorite/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
  
    return data;
  };
  export const fetchFavoriteLoad = async (): Promise<Favorite[]> => {
    const res = await fetch('/api/favorite');
    const data = await res.json();
  
    return data;
  };
  
  export const fetchFavoriteDelete = async (id: number): Promise<FavoriteId> => {
    const res = await fetch(`/api/favorite/item/${id}`, { method: 'DELETE' });
    const data = await res.json();
  
    return data;
  };
  export const fetchDeliveryAdd = async (obj: Delivery): Promise<OrderClose> => {
    const res = await fetch(`/api/delivery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
  
    return data;
  };
  
  export const fetchDeliveryLoad = async (): Promise<OrderClose[]> => {
    const res = await fetch(`/api/delivery`);
    const data = await res.json();    
    return data.orders;
  };

  export const fetchServiceLoad = async (): Promise<Service[]> => {
    const res = await fetch(`/api/service`)
    const data = await res.json();
    return data.services;
  };

  export const fetchServiceAdd = async (obj: object): Promise<Service> => {
    const res = await fetch(`/api/service/service`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data.service;
  };

  export const fetchServiceUpdate = async (obj: Service): Promise<Service> => {
    const res = await fetch(`/api/service/service`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
  
    return data;
  };

  export const fetchPostsLoad = async (): Promise<Post[]> => {
    const res = await fetch(`/api/posts`)
    const data = await res.json();
    return data.posts;
  };

  export const fetchPostAdd = async(obj: FormData): Promise<Post> => {
    const res = await fetch(`/api/posts/posts`, {
      method: `POST`,
      body: obj,
    });
    const data = await res.json();
    return data.post;
  };

  export const fetchPostDelete = async(id: number): Promise<Post> => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    return data.post;
  };
  
  export const fetchPostUpdate = async(obj:{id: number | undefined; obj: FormData}): Promise<Post> => {
    const res = await fetch(`/api/posts/${obj.id}`, {
      method: 'PUT',
      body: obj.obj
    });
    const data = await res.json()
    return data.post
  }
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import type { OrderItemId, OrderItemm } from '../../Miners/type';
import { type RootState, useAppDispatch } from '../../../store/store';
import { orderDelete, orderDecreaseQuantity, orderIncreaseQuantity, orderLoad } from '../../Miners/ordersSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


function OrderItem({ order }: { order: OrderItemm }): JSX.Element {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(order.count);
  const [totalPrice, setTotalPrice] = useState(order.price);

  const service = useSelector((store: RootState) => store.services.services.find((service) => service.id === order.service_id));
  const subbrand = useSelector((store: RootState) => store.subbrands.subbrands.find((subbrand) => subbrand.id === order.Miner.subbrand_id));
  const model = useSelector((store: RootState) => store.modells.modells.find((model) => model.id === order.Miner.modell_id));



      
  

  const handleDecreaseQuantity = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await dispatch(orderDecreaseQuantity(order.Miner.id)).unwrap().catch(console.log);
      await dispatch(orderLoad()).unwrap().catch(console.log);
      setTotalPrice(order.price);
    }
  };

  const handleIncreaseQuantity = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await dispatch(orderIncreaseQuantity(order.Miner.id)).unwrap().catch(console.log);
    await dispatch(orderLoad()).unwrap().catch(console.log);
      setTotalPrice(order.price);
  };

  const handleDelete = async (id: OrderItemId): Promise<void> => {
    await dispatch(orderDelete(id)).unwrap()
      .then(() => {
        toast.warning('Товар удален из корзины');
      })
      .catch(console.log);
  };
 
  return (
    <div>
      <div>
        <div className="product-item">
          <div className="product-list">
            <h3>{subbrand?.name}</h3>
            <p>{model?.name}</p>
            <img src={order.Miner.img[0]} alt="" />
            <p>{`Кол-во: ${quantity}`}</p>
            <div>
        <button 
        type="button" 
        onClick={(e) => {
          e.stopPropagation(); 
          handleIncreaseQuantity()}
        }
        className="btn+">
          + 
        </button>
        <button 
          type="button" 
          onClick={(e) => {
            e.stopPropagation(); 
            handleDecreaseQuantity()}
          }
          className="btn+"
          disabled={quantity <= 1}>
          -
        </button>
      </div>
      {service && (
          <p>{`Спец-сервис: ${service?.price.toLocaleString()} ₽`}</p>
      )}
            <span className="price">{` Майнер: ${totalPrice.toLocaleString()} ₽`}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(order.Miner.id);
              }}
              className="button1"
            >
              Удалить из корзины
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;

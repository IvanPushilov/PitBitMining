import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal, { Styles } from 'react-modal';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import OrderItem from './OrderItem';
import '../styles/order.css';
import { clear } from '../../Miners/ordersSlice';
import { deliveryAdd } from '../../Miners/deliverySlice';
import type { Delivery, DeliveryWithoutOrederId, OrderItemm } from '../../Miners/type';
import ProductModal from '../../Miners/components/ProductModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useMinerData from '../../Miners/components/MinerData';


const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '20px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxHeight: '70%', 
    overflowY: 'auto', 
  },
};


const checkField = object().shape({
  first_name: string().required('Необходимо указать имя'),
  last_name: string().required('Необходимо указать фамилию'),
  middle_name: string().required('Необходимо указать отчество'),
  phone: string().required('Необходимо указать номер телефона'),
  passport: string().required('Необходимо указать паспортные данные'),
  city: string().required('Необходимо указать город'),
  address: string().required('Необходимо указать адрес'),
  inn: string().when('isLegalEntity', {
    is: true,
    then: schema => schema.required('Необходимо указать ИНН компании'),
  }),
  company_name: string().when('isLegalEntity', {
    is: true,
    then: schema => schema.required('Необходимо указать наименование компании'),
  }),
});

function Order(): JSX.Element {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLegalEntity, setIsLegalEntity] = useState(false); // Флаг для определения типа лица
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // По умолчанию доставка


  const openProductModal = (product: any): void => {
    setSelectedProduct(product);
    setProductModalIsOpen(true);
  };

  const closeProductModal = (): void => {
    setProductModalIsOpen(false);
    setSelectedProduct(null);
  };

  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(checkField) });

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const orders = useSelector((store: RootState) => store.order.orders);
  const user = useSelector((store: RootState) => store.auth.user);
  const miners = useSelector((store: RootState) => store.miners.miners);
  const { subbrands, modells } = useMinerData();
  const dispatch = useAppDispatch();
  // const user = useSelector((store: RootState) => store.auth.user);


  const getMiner = (orders: OrderItemm[]) => {
    const minersInfo = orders.map((order) => {
      const foundMiner = miners.find((miner) => miner.id === order.miner_id);
      if (foundMiner) {
        const subbrandName = subbrands.find((subbrand) => subbrand.id === foundMiner?.subbrand_id)?.name || 'неизвестный суббренд';
        const modelName = modells.find((modell) => modell.id === foundMiner?.modell_id)?.name || 'неизвестная модель';
        const service = order.service_id;
        if(service) return `${subbrandName} ${modelName} + прошивка`;
        return `${subbrandName} ${modelName}`;
      }
      return 'неизвестный майнер';
    });
    return minersInfo.join(', ');
  };

  const id = orders[0]?.Order.id;

  async function sendMessageToTelegram(order: Delivery, orders: OrderItemm[]): Promise<void> {
   
    const token: string = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chat_id: string = import.meta.env.VITE_TELEGRAM_CHAT_ID; 
    const message =  `Пользователь ${order?.last_name} ${order?.first_name} ${order?.middle_name} оставил заявку на покупку товара, ${getMiner(orders)}
    способ доставки: ${order?.delivery_method}, город: ${order?.city}, адрес: ${order?.address}
    паспортные данные: ${order?.passport}, инн: ${order?.inn}
    наименование компании: ${order?.company_name}, телефон: ${user?.phone}, email: ${user?.email}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;
  
    try {
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      if (data.ok) {
       toast.success('Заявка отправлена');
      }
    } catch (error) {
      console.error(error);
    }
  
}

console.log('proverka', getMiner(orders));

  const addDelivery = (formData: Partial<DeliveryWithoutOrederId>): void => {
    const dataWithOrderId: Delivery = { ...formData, order_id: id, delivery_method: deliveryMethod } as Delivery;
    dispatch(deliveryAdd(dataWithOrderId)).catch(console.log);
    dispatch(clear());
    sendMessageToTelegram(dataWithOrderId, orders).catch((error) => {
      console.error('Error sending message to Telegram:', error);;
    // closeModal();
    // setTimeout(() => navigate('/profile'), 3000);
  });
}




  return (
    <div className="container-order">
      {orders.length > 0 ? (
        <>
          <div className="container-order-card">
            {orders.map((order) => (
              <div key={order.id} onClick={() => openProductModal(orders[0]?.Miner.id)}> 
              <OrderItem key={order.id} order={order} />
              </div>
            ))}
          </div>
          <p>Итого: {`${orders[0]?.Order.total_price.toLocaleString()} ₽`}</p>
          <button className='button2' type="button" onClick={openModal}>
            Оплатить заказ
          </button>
        </>
      ) : (
        <div className='center'>
          <div className="order-text">Корзина пустая</div>
        </div>
      )}

      
      <ProductModal 
        isOpen={productModalIsOpen} 
        onRequestClose={closeProductModal} 
        miner={selectedProduct} 
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Оплата заказа</h2>
        <form onSubmit={handleSubmit(addDelivery)}>
          <div className="modal-container-input">
            <label>
              <input
                type="radio"
                value="individual"
                checked={!isLegalEntity}
                onChange={() => setIsLegalEntity(false)}
              />
              Физическое лицо
            </label>
            <label>
              <input
                type="radio"
                value="legal"
                checked={isLegalEntity}
                onChange={() => setIsLegalEntity(true)}
              />
              Юридическое лицо
            </label>

            <input
              className="input-order"
              {...register('first_name')}
              type="text"
              placeholder="Имя"
            />
            {errors.first_name && <p>{errors.first_name.message}</p>}
            <input
              className="input-order"
              {...register('middle_name')}
              type="text"
              placeholder="Отчество"
            />
            {errors.middle_name && <p>{errors.middle_name.message}</p>}
            <input
              className="input-order"
              {...register('last_name')}
              type="text"
              placeholder="Фамилия"
            />
            {errors.last_name && <p>{errors.last_name.message}</p>}
            <input
              className="input-order"
              {...register('phone')}
              type="text"
              placeholder="Номер телефона"
            />
            {errors.phone && <p>{errors.phone.message}</p>}
            <input
              className="input-order"
              {...register('passport')}
              type="text"
              placeholder="Паспортные данные"
            />
            {errors.passport && <p>{errors.passport.message}</p>}
            <label>
                  <input
                    type="radio"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                  />
                  Самовывоз
                </label>
                <label>
                  <input
                    type="radio"
                    value="delivery"
                    checked={deliveryMethod === 'delivery'}
                    onChange={() => setDeliveryMethod('delivery')}
                  />
                  Доставка
                </label>
                {deliveryMethod === 'delivery' && (
                  <>
            <input
              className="input-order"
              {...register('city')}
              type="text"
              placeholder="Город"
            />
            {errors.city && <p>{errors.city.message}</p>}
            <textarea
              className="input-order"
              {...register('address')}
              rows={3}
              placeholder="Адрес доставки (пвз CDEK, Деловые линии)"
            />
            {errors.address && <p>{errors.address.message}</p>}
            </>
            )}
            {isLegalEntity && (
              <>
                <input
                  className="input-order"
                  {...register('inn')}
                  type="text"
                  placeholder="ИНН компании"
                />
                {errors.inn && <p>{errors.inn.message}</p>}
                <input
                  className="input-order"
                  {...register('company_name')}
                  type="text"
                  placeholder="Наименование компании"
                />
                {errors.company_name && <p>{errors.company_name.message}</p>}
              </>
            )}
            <div className="btn-modal">
              <button
                className="button1"
                type="submit"
              >{`Оплатить: ${orders[0]?.Order.total_price}₽`}</button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Order;

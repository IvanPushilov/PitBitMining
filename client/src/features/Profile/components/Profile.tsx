import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import FormAddBrand from './FormAddBrand';
import FormAddAlgo from './FormAddAlgo';
import FormAddHash from './FormAddHash';
import FormAddSubBrand from './FormAddSub';
import FormAddCurrency from './FormAddCurrency';
import FormAddModel from './FormAddModel';
import FormAddService from './FormAddService';
import useMinerData from '../../Miners/components/MinerData';

function Profile(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  const deliveries = useSelector((store: RootState) => store.deliveries.deliveries);
  const miners = useSelector((store: RootState) => store.miners.miners);

  const getDeliveryMethod = (delivery: any) => {
    const method = delivery?.Deliveries[0]?.delivery_method;
    if (method === 'delivery') return 'доставка';
    if (method === 'pickup') return 'самовывоз';
    return 'неизвестный способ';
  };

  const getLink = (delivery: any) => {
    const link = delivery?.OrderItems[0]?.miner_id;
    if (link) return link;
  };

  const { subbrands, modells } = useMinerData();

  const getMiner = (delivery: any) => {
    const id = delivery.OrderItems[0]?.miner_id;
    if (!id) return 'неизвестный майнер';
  
    const miner = miners.find((miner) => miner.id === id);
    if (miner) {
      const subbrandName = subbrands.find((subbrand) => subbrand.id === miner.subbrand_id)?.name || 'неизвестный суббренд';
      const modelName = modells.find((modell) => modell.id === miner.modell_id)?.name || 'неизвестная модель';
      const service = delivery.OrderItems[0]?.service_id;
      if(service) return [ subbrandName, modelName, ` + прошивка` ];
      return [ subbrandName, modelName ];
    }
    return 'неизвестный майнер';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  


  return (
    <div className="profile">
      {user?.role === 'admin' && (
        <div>
          <FormAddBrand />
          <FormAddSubBrand />
          <FormAddModel />
          <FormAddCurrency />
          <FormAddAlgo />
          <FormAddHash />
          <FormAddService />
        </div>
      )}
        <div className='delivery'>
          <p className='delivery-title'>Ваши заказы</p>
          
            {user && deliveries.length > 0 ? (
              <div className='delivery-card'>
                {deliveries.map((delivery) => (
                    <table className='delivery-table'>
                      
                      <tbody>

                      <tr>
                        <td className='delivery-card-text'>Заказ #{delivery?.Deliveries[0]?.order_id}</td>
                      </tr>
                      <tr>
                        <td className='delivery-card-text'>Дата оформления: {formatDate(delivery?.createdAt)}</td>
                      </tr>
                      <tr>
                        <td className='delivery-card-text'>Статус: {delivery?.status}</td>
                      </tr>
                      <tr>
                        <td className='delivery-card-text'>Товары: <a href={`/miners/${getLink(delivery)}`}>{getMiner(delivery)}</a> {delivery.OrderItems[0]?.count} шт. </td>
                      </tr>
                      <tr>
                        <td className='delivery-card-text'>Сумма: {delivery?.total_price} ₽</td>
                      </tr>
                      <tr>
                      <td className='delivery-card-text'>Способ доставки: {getDeliveryMethod(delivery)}</td>
                      </tr>

                      </tbody>
                        
                    </table>
                    
                ))}
              </div>
            ) : 'Тут пока нет ни одного заказа'}
        </div>
    </div>
  );
}

export default Profile;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal, { type Styles } from 'react-modal';
import type { RootState } from '../../../store/store';
import MinerItem from './MinerItem';
import FormAddMiner from './FormAddMiner';


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

function MinersPage(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  const miners = useSelector((store: RootState) => store.miners.miners);
  const subBrands = useSelector((store: RootState) => store.subbrands.subbrands);
  const currencies = useSelector((store: RootState) => store.currencies.currencies);

  
  const [modalIsOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [filteredMiners, setFilteredMiners] = useState(miners);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  const handleResetFilter = () => {
	window.location.reload()
  };

  useEffect(() => {
    setFilteredMiners(miners);
  }, [miners]);
  const handleFilter = () => {
    const newFilteredMiners = miners.filter((miner) => {
      const withinPriceRange = miner.price >= priceRange[0] && miner.price <= priceRange[1];
      const matchesCurrency = selected !== null ? miner.currency_id.includes(selected) : true;
      const matchesBrand = selectedBrands.length ? selectedBrands.includes(miner.brand_id) : true;
      return withinPriceRange && matchesCurrency && matchesBrand;
    });
    setFilteredMiners(newFilteredMiners);
  };

  const toggleBrandSelection = (brandId: number) => {
    setSelectedBrands((prev) => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId) 
        : [...prev, brandId]
    );
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(prev => !prev);
  };

  return (
      <section className="catalog" id="catalog">
        <div className="container">
          <h1>
            Каталог оборудования <span>товары: {filteredMiners.length} шт.</span>
          </h1>
          <div className="bread q">
            <a href="/">Главная</a>
            <a href="#">Каталог</a>
            {user?.role === 'admin' && (
              <div className="add">
                <button type="button" className="btnchange" onClick={openModal}>
                  Добавить майнер
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Добавить майнер"
                >
                  <h2>Добавить майнер</h2>
                  <FormAddMiner />
                </Modal>
              </div>
            )}
          </div>
          <div className="catalog__box q">
            <div className="catalog__info">
              <div className="accordeon">
                <div className="accordeon-container">
                  <li className="accordeon__item">
                  <div className={`accordeon__button ${isAccordionOpen ? 'active' : ''}`} onClick={toggleAccordion}>
  <img src="img/filter.svg" alt="" /> Фильтр
</div>
                    {isAccordionOpen && (
                      <ul className="accordeon__panel" style={{overflow:'visible', maxHeight: 'initial !important'}}>
                        <li className="panel__text">
                          <div className="catalog__per">
                            <p className="catalog__name">Бренды</p>
                            <div className="catalog__brands q">
                              {subBrands.map((sub) => (
                                <a href="#" key={sub.id} id={`brand-${sub.id}`}
								 onClick={() => toggleBrandSelection(sub.id)}
								 style={{ 
									backgroundColor: selectedBrands.includes(sub.id) ? '#e85b25' : '#f3f3f3',
									color: selectedBrands.includes(sub.id) ? '#e85b25' : '#f3f3f3', 
								  }}
								  >
                                  <div className="catalog__image q">
                                    <img src={sub?.img} alt={sub.name} />
                                  </div>
                                  <p  style={{ 
									
									color: selectedBrands.includes(sub.id) ? 'white' : '#848484', 
								  }}>{sub?.name}</p>
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className="catalog__per catalog__per_2">
                            <p className="catalog__name">Цена</p>
                            <div className="range_container">
                              <div className="sliders_control">
                                <input
                                  id="fromSlider"
                                  type="range"
                                  min={0}
                                  max={1000000}
                                  value={priceRange[0]}
                                  onChange={(e) => {
                                    const newValue = Math.min(Number(e.target.value), priceRange[1]);
                                    setPriceRange([newValue, priceRange[1]]);
                                  }}
                                />
                                <input
                                  className="toSlider"
                                  id="toSlider"
                                  type="range"
                                  min={0}
                                  max={1000000}
                                  value={priceRange[1]}
                                  onChange={(e) => {
                                    const newValue = Math.max(Number(e.target.value), priceRange[0]);
                                    setPriceRange([priceRange[0], newValue]);
                                  }}
                                />
                              </div>
                              <div className="form_control">
                                <div className="form_control_container">
                                  <input
                                    className="form_control_container__time__input"
                                    type="number"
                                    id="fromInput"
                                    value={priceRange[0]}
                                    min={0}
                                    max={1000000}
                                    onChange={(e) => {
                                      const newValue = Math.min(Number(e.target.value), priceRange[1]);
                                      setPriceRange([newValue, priceRange[1]]);
                                    }}
                                  />
                                </div>
                                <div className="form_control_container form_control_container_2">
                                  <input
                                    className="form_control_container__time__input"
                                    type="number"
                                    id="toInput"
                                    value={priceRange[1]}
                                    min={0}
                                    max={1000000}
                                    onChange={(e) => {
                                      const newValue = Math.max(Number(e.target.value), priceRange[0]);
                                      setPriceRange([priceRange[0], newValue]);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="catalog__per">
                            <p className="catalog__name">Добываемая монета</p>
                            <div className="catalog__list">
                              {currencies.map((currency) => (
                                <div className="calc__item" key={currency.id}>
                                  <input
                                    className="form-check-input custom-checkbox"
                                    type="checkbox"
                                    onChange={() => setSelected(currency.id)}
                                    id={currency.name}
                                    value={currency.name}
                                  />
                                  <label className="form-check-label" htmlFor={currency.name}>
                                    {currency.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="catalog__area">
                            <button onClick={handleFilter} className="catalog__btn btn btn_2">
                              Просмотреть
                            </button>
                            <button onClick={handleResetFilter} className="catalog__btn btn btn_2">
                              Сбросить
                            </button>
                          </div>
                        </li>
                      </ul>
                    )}
                  </li>
                </div>
              </div>
            </div>
            <div className="catalog__content q">
              {filteredMiners.map((miner) => (
                <MinerItem key={miner?.id} miner={miner} />
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

export default MinersPage;

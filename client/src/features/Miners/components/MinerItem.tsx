import React, { useState } from 'react';
import Modal,  {type Styles } from 'react-modal';
import type { Miner } from '../type';
import useMinerData from './MinerData';
import FormUpdateMiner from './FormUpdateMiner';


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

  function MinerItem({ miner }: { miner: Miner }): JSX.Element {

    const { subbrands, modells, hashrates } = useMinerData();
    const [modalIsOpen, setIsOpen] = useState(false);


  const subbrandId = miner?.subbrand_id;
  const modelId = miner?.modell_id;
  const hashrateId = miner?.hashrate_id;

  const currentSubBrand = subbrands.find((subbrand) => subbrand.id === subbrandId);
  const currentModell = modells.find((modell) => modell.id === modelId);
  const currentHashrate = hashrates.find((hashrate) => hashrate.id === hashrateId);
  
  const closeModal = (): void => {
    setIsOpen(false);
  };

  return (
   <>
    <a className="main__item " onClick={() => window.scrollTo(0, 0)} href={`/miners/${miner?.id}`}>
							<div>
              {currentHashrate?.rate}
							</div>
							<img src={miner?.img[0]} alt="img"/>
							<p>
              {currentSubBrand?.name}{' '}
              {currentModell?.name} {miner?.expense}w
							</p>
							<span>
              {miner?.price.toLocaleString()} ₽
							</span>
							
            
						</a>
    
  <Modal
isOpen={modalIsOpen}
onRequestClose={closeModal}
style={customStyles}
contentLabel="Example Modal"

>
<FormUpdateMiner miner={miner} />
</Modal>
</>
  );
}

export default MinerItem;

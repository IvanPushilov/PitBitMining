import React from 'react';
import Modal, { Styles } from 'react-modal';
import MinerPage from './MinerPage';

const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '20px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80%', 
    overflowY: 'auto', 
  },
};

interface ProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  miner: number | null;
}
function ProductModal({ isOpen, onRequestClose, miner } : ProductModalProps) {
  if (!miner) return null; 

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Product Modal"
    >
     <MinerPage miner_id={miner} />
    </Modal>
  );
}

export default ProductModal;

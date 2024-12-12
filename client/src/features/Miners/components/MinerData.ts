import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

const useMinerData = () => {
  const { brands, subbrands, modells, hashrates } = useSelector((store: RootState) => ({
    brands: store.brands.brands,
    subbrands: store.subbrands.subbrands,
    modells: store.modells.modells,
    hashrates: store.hashrates.hashrates,
  }));

  return { brands, subbrands, modells, hashrates };
};

export default useMinerData;

import Select from '../../select/select';
import {resorts} from '../../../utils/index';

interface Props {
    onChange: (resortId: number) => void;
    value: number;
}
  

const ResortsSelect: React.FC<Props> = ({onChange, value}) => {
    return (
        <Select
            onChange={resortId => onChange(Number(resortId))} 
            value={value.toString()} 
            options={resorts.map(resort => ({label: resort.name, value: resort.id.toString()}))} 
        />
    )
}

export default ResortsSelect;
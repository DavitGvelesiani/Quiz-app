import { View, Text } from 'react-native'
import React, {useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

const Dropdown = ({placeholder, items, setItems, value, setValue, style}) => {
    const [open, setOpen] = useState(false);
  
    return (
      <DropDownPicker
        placeholder={placeholder}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={style}
      />
    );
}

export default Dropdown
import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, {useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

const Dropdown = ({placeholder, items, setItems, value, setValue, listMode, modalTitle}) => {
    const [open, setOpen] = useState(false);
  
    return (
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          placeholder={placeholder}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          autoScroll={true}
          style={styles.dropdown}
          listMode={listMode}
          modalAnimationType='fade'
          modalTitle={modalTitle}
        />
      </View>
      
    );
}

export default Dropdown

const styles = StyleSheet.create({
  dropdownContainer: {
    maxWidth: 170,
    height: 50,
    marginHorizontal: 10
  },
  dropdown: {
    backgroundColor: '#4895ef',
    borderColor: '#fdc500'
  }
})
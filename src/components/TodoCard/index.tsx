import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Image, Center, NativeBaseProvider } from 'native-base';

import { ITodo } from '../../models/todo';

const WORKICON = 'https://image.flaticon.com/icons/png/512/3281/3281289.png';
const HOMEICON = 'https://image.flaticon.com/icons/png/512/619/619032.png';
const STUDYICON = 'https://image.flaticon.com/icons/png/512/2232/2232688.png';

interface IProps {
  todo: ITodo;
}
const TodoCard: React.FC<IProps> = ({ todo }) => {
  const [currentURLImage, setCurrentURLImage] = useState('')

  useEffect(()=>{
    handleCategory()
  },[todo])
  const handleCategory = ()=>{
    switch (todo.category) {
      case 'home':
        setCurrentURLImage(HOMEICON);
        break;
      case 'work':
        setCurrentURLImage(WORKICON);
        break;
      case 'study':
        setCurrentURLImage(STUDYICON);
        break;
    }
  }
  return (
    <View style={styles.card}>
      <Center>
        <Image
          source={{
            uri: currentURLImage,
          }}
          alt="Alternate Text"
          size={'xl'}
        />
      </Center>
    </View>
  );
};
export default TodoCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    width: 250,
    height: 420,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 12,
    marginHorizontal:10
  },
  icon: {
    height: 100,
    width: 50,
  },
});

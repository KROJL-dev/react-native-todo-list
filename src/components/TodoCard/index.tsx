import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Image, Center, Button, Flex } from 'native-base';

import { ITodo } from '../../models/todo';

import { useStore } from '../../store/store';

const WORKICON = 'https://image.flaticon.com/icons/png/512/3281/3281289.png';
const HOMEICON = 'https://image.flaticon.com/icons/png/512/619/619032.png';
const STUDYICON = 'https://image.flaticon.com/icons/png/512/2232/2232688.png';

const CLOSEICON = 'https://image.flaticon.com/icons/png/512/1828/1828778.png';

interface IProps {
  todo: ITodo;
}

const TodoCard: React.FC<IProps> = ({ todo }) => {
  const [currentURLImage, setCurrentURLImage] = useState('');

  const { todoStore } = useStore() 


  useEffect(() => {
    if (todo.category !== undefined) {
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
  }, [todo]);

  return (
    <View style={styles.card}>
      <Button
        style={styles.deleteIcon}
        onPress={() => {
          todoStore.deleteTodo(todo.id)
        }}
      >
        <Image source={{ uri: CLOSEICON }} alt="x" style={styles.icon} />
      </Button>
      <Center>
        {currentURLImage !== '' && (
          <Image
            source={{
              uri: currentURLImage,
            }}
            alt="Alternate Text"
            size={'xl'}
          />
        )}
        <Text style={styles.icon}>{todo.title}</Text>
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
    marginHorizontal: 10,
  },
  icon: {
    height: 30,
    width: 30,
  },
  deleteIcon: {
    backgroundColor: 'transparent',
    width: 64,
    height: 64,
    position: 'absolute',

    zIndex: 111,
  },
});

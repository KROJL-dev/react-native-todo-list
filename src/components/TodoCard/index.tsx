import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Animated, ScrollView } from 'react-native';
import { Image, Center, Button, Heading, Flex } from 'native-base';

import { ITodo } from '../../models/todo';

import { useStore } from '../../store/store';

import { toggleStartedAnimation } from '../../utils/toggleStartedAnimation';

const WORKICON = 'https://image.flaticon.com/icons/png/512/3281/3281289.png';
const HOMEICON = 'https://image.flaticon.com/icons/png/512/619/619032.png';
const STUDYICON = 'https://image.flaticon.com/icons/png/512/2232/2232688.png';

const CLOSEICON = 'https://image.flaticon.com/icons/png/512/1828/1828778.png';

interface IProps {
  todo: ITodo;
}

const TodoCard: React.FC<IProps> = ({ todo }) => {
  const [currentURLImage, setCurrentURLImage] = useState('');

  const { todoStore } = useStore();

  const animationDelete = useRef(new Animated.Value(1)).current;

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
    <Animated.View
      style={{
        transform: [{ scale: animationDelete }],
      }}
    >
      <View style={styles.card}>
        <Button
          style={styles.deleteIcon}
          onPress={async () => {
            toggleStartedAnimation(0, animationDelete);
            await new Promise((r) => setTimeout(r, 300));
            todoStore.deleteTodo(todo.id);
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
          <Flex direction="column">
            <Heading style={styles.title}>{todo.title}</Heading>
            <Text style={styles.description}>{todo.description}</Text>
            <Text>Created at: {todo.createdAt}</Text>
            {todo.deadline?.length && <Text>Deadline: {todo.deadline}</Text>}
          </Flex>
        </Center>
      </View>
    </Animated.View>
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
    height: 20,
    width: 20,
  },
  title: {
    height: 50,
    width: 130,
    
  },
  description:{
    fontSize:20,
    maxHeight:190,
    overflow:"scroll"
  },
  deleteIcon: {
    backgroundColor: 'transparent',
    width: 64,
    height: 64,
    position: 'absolute',

    zIndex: 111,
  },
});

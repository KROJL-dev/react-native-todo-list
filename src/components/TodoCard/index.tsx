import React, { useEffect, useState, useRef } from 'react';
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Image, Center, Button, Flex, View } from 'native-base';

import { ITodo } from '../../models/todo';

import { useStore } from '../../store/store';

import { toggleStartedAnimation } from '../../utils/toggleStartedAnimation';
import { position } from 'styled-system';

const WORKICON = 'https://image.flaticon.com/icons/png/512/3281/3281289.png';
const HOMEICON = 'https://image.flaticon.com/icons/png/512/619/619032.png';
const STUDYICON = 'https://image.flaticon.com/icons/png/512/2232/2232688.png';

const COMPLITEDICON =
  'https://image.flaticon.com/icons/png/512/4558/4558892.png';

const CLOSEICON = 'https://image.flaticon.com/icons/png/512/1828/1828778.png';

interface IProps {
  todo: ITodo;
}

const TodoCard: React.FC<IProps> = ({ todo }) => {
  const [currentURLImage, setCurrentURLImage] = useState('');
  const [isComplitedScene, setIsComplitedScene] = useState<boolean>(false);
  const [isComplitedSceneRender, setIsComplitedSceneRender] =
    useState<boolean>(false);
  const { todoStore } = useStore();

  const animationDelete = useRef(new Animated.Value(1)).current;
  const animationCompliteBackground = useRef(new Animated.Value(0)).current;
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

  useEffect(() => {
    (async () => {
      if (isComplitedScene) {
       
        const animationInterval = setInterval(async () => {
          toggleStartedAnimation(1, animationCompliteBackground);
          await new Promise((r) => setTimeout(r, 400));
          toggleStartedAnimation(0, animationCompliteBackground);
        }, 800);
        setTimeout(()=>{
          clearInterval(animationInterval);
          setIsComplitedScene(false)
        },4150);
      }
    })();

  }, [isComplitedScene]);
 
  return (
    <Animated.View
      style={{
        transform: [{ scale: animationDelete }],
      }}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setIsComplitedScene(true);
        }}
      >
        {isComplitedScene && (
          <Animated.View
            style={{
              ...styles.complitedScene,
              opacity: animationCompliteBackground,
            }}
            pointerEvents="none"
          >
            <Image source={{ uri: COMPLITEDICON }} alt="KRASAVA" />
          </Animated.View>
        )}
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
          <Flex direction="column" alignItems="center">
            <Text style={styles.title}>{todo.title}</Text>

            <Text style={styles.description}>{todo.description}</Text>

            <Text style={styles.createdAt}>
              Created at:{' '}
              <Text style={styles.createdAtSpan}>{todo.createdAt}</Text>
            </Text>
            {todo.deadline?.length && (
              <Text style={styles.deadline}>
                Deadline:{' '}
                <Text style={styles.deadlineSpan}>{todo.deadline}</Text>
              </Text>
            )}
          </Flex>
        </Center>
      </TouchableOpacity>
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
    textAlign: 'center',
    maxHeight: 250,
    maxWidth: 130,
    fontSize: 30,
    fontWeight: '800',
    color: '#3271a8',
  },

  description: {
    textAlign: 'center',
    fontSize: 24,
    maxHeight: 145,
  },
  deleteIcon: {
    backgroundColor: 'transparent',
    width: 64,
    height: 64,
    position: 'absolute',

    zIndex: 11112222222222222222222222222222222222222222222,
  },
  createdAt: {
    fontSize: 16,
  },
  deadline: {
    fontSize: 16,
  },
  createdAtSpan: {
    color: '#2acf15',
  },
  deadlineSpan: {
    color: '#de1212',
  },
  complitedScene: {
    backgroundColor: 'rgba(88,157,59,0.3)',
    zIndex: 10000002222,
    position: 'absolute',
    width: 250,
    height: 420,
    borderRadius: 12,
  },
});

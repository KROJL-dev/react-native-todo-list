import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Image, Center, Button, Flex, View } from 'native-base';

import { ITodo } from '../../models/todo';

import { useStore } from '../../store/store';

import { toggleStartedAnimation } from '../../utils/toggleStartedAnimation';
import { boxShadow, position } from 'styled-system';

const WORKICON = 'https://image.flaticon.com/icons/png/512/3281/3281289.png';
const HOMEICON = 'https://image.flaticon.com/icons/png/512/619/619032.png';
const STUDYICON = 'https://image.flaticon.com/icons/png/512/2232/2232688.png';

const COMPLITEDICON =
  'https://image.flaticon.com/icons/png/512/4558/4558892.png';
const COMPLITEDICONMINI =
  'https://image.flaticon.com/icons/png/512/4857/4857721.png';

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
  const animationCompliteIcon = useRef(new Animated.Value(1)).current;
  const animationCardWhenComplited = useRef(new Animated.Value(0)).current;
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
  //aniation when user wanna complited woto
  useEffect(() => {
    if(!todo.isComplited){
      (async () => {
        if (isComplitedScene) {
          setIsComplitedSceneRender(true);
          const animationInterval = setInterval(async () => {
            toggleStartedAnimation(1, animationCompliteBackground);
            toggleStartedAnimation(0.7, animationCompliteIcon);
            await new Promise((r) => setTimeout(r, 400));
            toggleStartedAnimation(0, animationCompliteBackground);
            toggleStartedAnimation(1, animationCompliteIcon);
          }, 800);
          setTimeout(async () => {
            clearInterval(animationInterval);
            toggleStartedAnimation(0, animationCompliteIcon);
            await new Promise((r) => setTimeout(r, 400));
            setIsComplitedSceneRender(false);
            setIsComplitedScene(false);

            toggleStartedAnimation(-700, animationCardWhenComplited);
            await new Promise((r) => setTimeout(r, 400));
            todoStore.addToComplitedTodo(todo.id);
          }, 3400);
        }
      })();
    }
  }, [isComplitedScene]);

  return (
    <Animated.View
    
      style={{
        transform: [
          { scale: animationDelete },
          { translateY: animationCardWhenComplited },
        ],
        
      }}
    >
      {todo.isComplited && (
        <Image
          source={{ uri: COMPLITEDICONMINI }}
          alt="KRASAVA"
          style={styles.complitedIconMini}
        />
      )}
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setIsComplitedScene(true);
        }}
      >
        {isComplitedSceneRender && (
          <Animated.View
            style={{
              ...styles.complitedScene,
              opacity: animationCompliteBackground,
            }}
            pointerEvents="none"
          >
            <Image
              source={{ uri: COMPLITEDICON }}
              alt="KRASAVA"
              h="100%"
              w="100%"
            />
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
  complitedIconMini: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: Dimensions.get('window').height / 2-50,
    right: -40,
  },
  card: {
    padding: 10,
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 2,
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
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 2,
    borderRadius: 12,
  },
});

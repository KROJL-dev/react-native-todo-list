import React, { useState } from 'react';

import {
  Input,
  Select,
  CheckIcon,
  Container,
  Stack,
  Button,
} from 'native-base';

import { Categories } from '../../models/todo';

import { useStore } from '../../store/store';

const AddTodoForm: React.FC<{}> = () => {
  const [category, setCategory] = useState<Categories>(Categories.home);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { todoStore } = useStore();

  const handleSetCategories = (categoryString: string) => {
    switch (categoryString) {
      case 'home':
        setCategory(Categories.home);
        break;
      case 'work':
        setCategory(Categories.work);
        break;
      case 'study':
        setCategory(Categories.study);
        break;
    }
  };
  return (
    <Container w="100%">
      <Stack space={4} w="100%">
        <Input
          size="lg"
          w="100%"
          placeholder="Title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          _light={{
            placeholderTextColor: 'blue.400',
          }}
          _dark={{
            placeholderTextColor: 'blue.50',
          }}
          borderColor="blue.600"
        />
        <Input
          size="lg"
          w="100%"
          placeholder="Description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
          _light={{
            placeholderTextColor: 'blue.400',
          }}
          _dark={{
            placeholderTextColor: 'blue.50',
          }}
          borderColor="blue.600"
        />
        <Select
          borderColor="blue.600"
          selectedValue={Categories[category]}
          minWidth={200}
          accessibilityLabel="Select category"
          placeholder="Select category"
          onValueChange={(itemValue) => handleSetCategories(itemValue)}
          _selectedItem={{
            bg: 'cyan.600',
            endIcon: <CheckIcon size={4} />,
          }}
        >
          <Select.Item label="Work" value="work" />
          <Select.Item label="Home" value="home" />
          <Select.Item label="Study" value="study" />
        </Select>
        <Button
          onPress={() =>
            todoStore.addTodo({
              todoTitle: title,
              todoDescription: description,
              todoCategory: category,
            })
          }
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
};
export default AddTodoForm;
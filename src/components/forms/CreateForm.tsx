import React from 'react';
import { Button, Center, Icon, VStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

type CreateFormProps = {
  onSubmit: (data: any) => void;
};

const CreateForm = (props: CreateFormProps) => {
  console.log(props);
  return (
    <VStack flex="1">
      <Center flex="1" h="20" />
      <Center safeAreaBottom>
        <Center w="full" p="2">
          <Button w="full" leftIcon={<Icon name="pluscircle" as={AntDesign} color="white" />}>
            CREATE
          </Button>
        </Center>
      </Center>
    </VStack>
  );
};

export default CreateForm;

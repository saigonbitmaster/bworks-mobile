import React from 'react';
import { Fab, Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
};

const FloatCreateButton = ({ onPress }: Props) => {
  return (
    <Fab
      onPress={onPress}
      renderInPortal={false}
      shadow={2}
      size="sm"
      icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
    />
  );
};

export default FloatCreateButton;

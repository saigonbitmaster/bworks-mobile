import React from 'react';
import { Box, Heading, VStack, FormControl, Input, Link, Button, Center } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth } from '../../dataProvider/authProvider';

const LoginScreen = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (data) => auth.login(data),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    mutateAsync(data)
      .then(() => queryClient.invalidateQueries({ queryKey: ['login'] }))
      .catch(() => Toast.show('Login failed', { position: Toast.positions.CENTER }));
  };
  return (
    <Center w="100%">
      <Box safeArea p="4" py="8" w="90%">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome BWorks
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={6} mt="5">
          <FormControl isRequired isInvalid={'username' in errors}>
            <FormControl.Label>Email / Username</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  autoCapitalize="none"
                  autoComplete="off"
                  placeholder=""
                  onChangeText={(val) => onChange(val)}
                  value={value}
                />
              )}
              name="username"
              rules={{ required: 'Field is required', minLength: 3 }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>{errors.username?.message}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={'password' in errors}>
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="password"
                  onBlur={onBlur}
                  placeholder=""
                  onChangeText={(val) => onChange(val)}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: 'Field is required', minLength: 3 }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>{errors.password?.message}</FormControl.ErrorMessage>
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'blue.500',
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="blue" onPress={handleSubmit(onSubmit)}>
            Sign in
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;

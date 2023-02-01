import React from 'react';
import Toast from 'react-native-root-toast';
import CreateForm from '../../components/forms/CreateForm';
import dataProvider from '../../dataProvider';

const JobPostCreateScreen = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (data) => dataProvider.create('jobposts', { data }),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    mutateAsync(data)
      .then(() => queryClient.invalidateQueries({ queryKey: ['login'] }))
      .catch(() => Toast.show('Create failed', { position: Toast.positions.CENTER }));
  };
  return (
    <CreateForm onSubmit={onSubmit} />
  )
}

export default JobPostCreateScreen
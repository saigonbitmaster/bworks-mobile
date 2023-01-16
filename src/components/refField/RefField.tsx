import { useQuery } from '@tanstack/react-query';
import { Text } from 'native-base';
import React, { useMemo } from 'react';
import dataProvider from '../../dataProvider';

const RefField = ({ id, resource, field, title, filter, select }) => {
  const { data, isLoading } = useQuery({
    queryKey: [resource, id],
    queryFn: () => dataProvider.getList(resource, { filter: filter ? filter : { id: [id] } }),
  });
  const name = useMemo(() => {
    if (data?.data) return select ? select(data) : data?.data?.[0]?.[field];
  }, [data]);
  return (
    <Text
      color="coolGray.600"
      _dark={{
        color: 'warmGray.200',
      }}
    >
      {title} {!isLoading && name}
    </Text>
  );
};

export default RefField;

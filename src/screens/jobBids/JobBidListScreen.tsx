import React from 'react';
import dataProvider from '../../dataProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingView from '../../components/loading/LoadingView';
import { Box, FlatList, HStack, Spacer, Text, VStack } from 'native-base';
import dayjs from 'dayjs';
import RefField from '../../components/refField/RefField';

const JobBidListScreen = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['postjobs'],
    queryFn: () =>
      dataProvider.getList('jobbids', {
        filter: { queryType: 'employer' },
        sort: { field: 'date', order: 'desc' },
        pagination: { perPage: 24 },
      }),
  });
  if (isLoading) return <LoadingView />;
  if (!data?.data) return <LoadingView text="No Data" />;
  return (
    <Box px="4">
      <FlatList
        data={data?.data}
        refreshing={isLoading}
        onRefresh={() => queryClient.invalidateQueries({ queryKey: ['jobbids'] })}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'muted.50',
            }}
            borderColor="muted.300"
            pl={['0', '4']}
            pr={['0', '5']}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.name}
                </Text>
                <RefField title="Job:" field="name" resource="postjobs" id={item.jobId} />
                <RefField title="Employer:" field="fullName" resource="users" id={item.employerId} />
                <RefField title="Job seeker:" field="fullName" resource="users" id={item.jobSeekerId} />
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  Bid value: {item.bidValue}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  Rate: {item.rate}/5
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                Due: {dayjs(item.completeDate).format('MM/DD/YYYY HH:mm')}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default JobBidListScreen;

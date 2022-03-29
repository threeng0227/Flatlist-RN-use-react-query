import axios from 'axios';
import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { styles } from './styles';

import Header from './widget/Header';
import ItemMovie from './widget/ItemMovie';
const MoviesScreen = () => {
  const pageIndex = useRef(1);
  const { isLoading, data, isFetchingNextPage, isFetching, refetch, fetchNextPage } =
    useInfiniteQuery('movies', moviessApi.fetchAllMovies, {
      getNextPageParam: (lastPage) => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }
        return lastPage;
      }
    });

  const _loadMore = () => {
    if (isFetchingNextPage) return;
    pageIndex.current++;
    fetchNextPage({
      pageParam: pageIndex.current
    });
  };

  const _onRefresh = () => {
    refetch();
  };

  const movies = data?.pages?.map(page => page.results).flat() as any;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.horizontal]}>
        <Header />
        <Text style={styles.txtTitle}>{'Popular list'}</Text>
        <FlatList
          data={movies ?? []}
          renderItem={({ item, index }) => <ItemMovie item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
          refreshing={isFetching}
          onRefresh={_onRefresh}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          onEndReached={_loadMore}
          onEndReachedThreshold={0.7}
          ListFooterComponent={() => {
            if (isLoading || isFetchingNextPage)
              return <ActivityIndicator size={'small'} color={'red'} />
            else if (movies && movies.length == 0)
              return <Text style={styles.txtNoData}>{'Không tìm thấy dữ liệu'}</Text>
            return null;
          }
          }
        />
      </View>
    </SafeAreaView>

  );
};

export const moviessApi = {
  fetchAllMovies: ({ pageParam = 1 }) => {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=26763d7bf2e94098192e629eb975dab0&page=${pageParam}`).then((res) => res.data)
  }
};

export default MoviesScreen;

import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalcontext } from '../../context/GlobalProvider'
const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalcontext()
  const [refreshing, setRefreshing] = useState(false)
  const {data:posts,isLoading,refetch } = useAppwrite(getAllPosts)
  const {data:latestPosts} = useAppwrite(getLatestPosts)


  const onRefresh = async ( )=>{
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  return (
    <SafeAreaView className="bg-primary   h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-gray-100 text-sm">Welcome Back, </Text>
                <Text className="text-2xl text-gray-100 font-psemibold">{user?.username}</Text>

              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  resizeMode='contain'
                  className="w-9 h-10"

                />
              </View>
            </View>
            <SearchInput/>
            <View className="w-full flex-1 pt-5">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
              <Trending posts={latestPosts}/>
            </View>
          </View>
        )}

        ListEmptyComponent={()=>(
          <EmptyState 
            title="No Videos Found"
            subtitle = "Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />

    </SafeAreaView>
  )
}

export default Home
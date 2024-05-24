import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React,{useState} from 'react'
import {icons, images} from '../constants'
import { router, usePathname } from 'expo-router'
const SearchInput = ({initialQuery}) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery||'')
    console.log(pathname)
  return (
   
      <View className=" border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput 
            className="text-base mt-0.5 text-white flex-1 font-pregular"
            value={query}
            placeholder="Search for a video topic"
            onChangeText={(e)=>setQuery(e)}
            placeholderTextColor='#cdcde0'
        />
        <TouchableOpacity
            onPress={()=>{
                if(!query) return Alert.alert('Missing query','Please input something to search')
                if(pathname.startsWith('/search')) router.setParams({query})
                else router.push(`/search/${query}`)
            }}
        >

            <Image
                source={icons.search}
                resizeMode='contain'
                className='w-5 h-5'
            />
        </TouchableOpacity>
      </View>

  )
}

export default SearchInput
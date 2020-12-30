import axios from 'axios';
import * as React from 'react';
import {ActivityIndicator,Button,View,Text,StyleSheet,FlatList,TouchableOpacity,Ionicons,AsyncStorage,} from 'react-native';
import { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import 'react-native-vector-icons';
import { Icon } from 'react-native-elements';

const Favorite = () => {
  const [data, setData] = useState([]);
  const [getCovid, setCovid] = useState([]);


  const covid = () => {
    const options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/country',
      params: { name: 'pakistan' },
      headers: {
        'x-rapidapi-key': 'b08563c349mshaec78a2ccd1bd17p13d6ecjsn763e6e36e525',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setCovid(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      setData(keys)
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (item) => {
    await AsyncStorage.removeItem(item)
    alert('removed')
  }

  useEffect(() => {
    getItems();
    covid()
  }, []);

  return (
    <View style={{ paddingTop: 30 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              paddingTop: 24,
              paddingBottom: 30,
              marginLeft: 55,
            }}>
            Favourites
          </Text>
          <FlatList
            keyExtractor={(item, index) => index}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                >
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderColor: 'grey',
                    borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      paddingLeft: 5,
                      paddingRight: 10,
                      flexDirection: 'row',
                    }}>
                    <Text>{JSON.stringify(item).slice(1, -1)}</Text>
                  </View>
                  <TouchableOpacity >
                    <Icon
                      reverse
                      name='star'
                      color="red"
                      type="ionicon"
                      onPress={() => remove(item)}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
  );
};

export default Favorite;

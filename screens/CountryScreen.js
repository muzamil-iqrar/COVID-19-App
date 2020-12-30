import axios from 'axios';
import * as React from 'react';
import {
  ActivityIndicator,
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Ionicons,
  AsyncStorage,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import 'react-native-vector-icons';
import { Icon } from 'react-native-elements';

const Country = () => {
  const [loading, isLoading] = useState(true);
  const [dataWorld, setDataWorld] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [displayScreen, setScreen] = useState(false);
  const [getCovid, setCovid] = useState([]);
  const [detail, setDetail] = useState(null);
  const [fill, setFill] = useState(false);

  const addToFav = async (country) => {
    try {
      await AsyncStorage.setItem(country, country);
      var i = await AsyncStorage.getAllKeys();
      console.log(i);
    } catch (error) {
      console.error(error);
    }
  };
  const invokingFill = () => {
    setFill(!fill);
  };

  useEffect(() => {
    world();
    covid();
  }, []);

  const world = () => {
    const options = {
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/allcountriesname',
      headers: {
        'x-rapidapi-key': 'b08563c349mshaec78a2ccd1bd17p13d6ecjsn763e6e36e525',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        isLoading(false);
        setDataWorld(response.data.body.countries);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

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

  const displaySearch = () => {
    return (
      <View style={{ paddingTop: 30 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            paddingTop: 24,
            paddingBottom: 30,
            marginLeft: 65,
          }}>
          Search List Screen
        </Text>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeText}
          value={searchValue}
          onCancel={() => setScreen(false)}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setDetail(searchValue)}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderBottomWidth: 1,
              borderColor: 'grey',
            }}>
            <View style={{ paddingLeft: 5, paddingRight: 10 }}>
              <Text>{searchValue}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onChangeText = (query) => {
    setSearchValue(query);
    console.log(query);
    for (let i = 0; i < dataWorld.length; i++) {
      if (query == dataWorld[i]) {
        setScreen(true);
      }
    }
  };

  const detailScreen = (item) => {
    return (
      <View style={{ justifyContent: 'center', margin: 20, marginTop: 40 }}>
        <Text style={{ fontWeight: 'bold', fontSize: '20' }}>{item}</Text>
        <Text>Confirmed: {JSON.stringify(getCovid[0].confirmed)}</Text>
        <Text>Recovered: {JSON.stringify(getCovid[0].recovered)}</Text>
        <Text>Critical: {JSON.stringify(getCovid[0].critical)}</Text>
        <Text>Deaths: {JSON.stringify(getCovid[0].deaths)}</Text>
        <Text>Last Updated: {JSON.stringify(getCovid[0].lastUpdate)}</Text>
      </View>
    );
  };

  {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading Data from JSON Placeholder API ...</Text>
        </View>
      );
    }
    if (!loading && !displayScreen && !detail) {
      return (
        <View style={{ paddingTop: 30 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              paddingTop: 24,
              paddingBottom: 30,
              marginLeft: 65,
            }}>
            Country List Screen
          </Text>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeText}
            value={searchValue}
          />
          <FlatList
            keyExtractor={(item, index) => index}
            data={dataWorld}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setDetail(item)}>
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
                  <TouchableOpacity onPress={() => invokingFill()}>
                    <Icon
                      reverse
                      name={fill ? 'star' : 'star-outline'}
                      color="royalblue"
                      type="ionicon"
                      onPress={() => addToFav(item)}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    if (displayScreen && !detail) {
      return displaySearch();
    }
    if (detail) {
      return detailScreen(detail);
    }
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default Country;

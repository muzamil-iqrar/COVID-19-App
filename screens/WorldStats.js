import axios from 'axios';
import * as React from 'react';
import {ActivityIndicator,Button,View,Text,ScrollView,Image,StyleSheet,FlatList,} from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};

const World = ({ navigation }) => {
  const [loading, isLoading] = useState(true);
  const [dataCovid, setDataCovid] = useState([]);
  const [dataWorld, setDataWorld] = useState([]);

  useEffect(() => {
    covid();
    world();
  }, []);

  const world = () => {
    const options = {
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/worldpopulation',
      headers: {
        'x-rapidapi-key': 'b08563c349mshaec78a2ccd1bd17p13d6ecjsn763e6e36e525',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        isLoading(false);
        setDataWorld(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const covid = () => {
    const options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/totals',
      headers: {
        'x-rapidapi-key': 'b08563c349mshaec78a2ccd1bd17p13d6ecjsn763e6e36e525',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        isLoading(false);
        setDataCovid(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
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
  }
  {
    if (!loading) {
      return (
        <View style={styles.container}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              paddingTop: 24,
              paddingBottom: 50,
            }}>
            World Statistics
          </Text>
          <Text>
            Total confirmed: {getNestedObject(dataCovid, ['0', 'confirmed'])}
          </Text>
          <Text>
            Total population:{' '}
            {getNestedObject(dataWorld, ['body', 'world_population'])}
          </Text>
          <Text>
            {' '}
            Confirmed Percentage:{' '}
            {(getNestedObject(dataCovid, ['0', 'confirmed']) /
              getNestedObject(dataWorld, ['body', 'world_population'])) *
              100}
          </Text>
          <Text>
            {' '}
            Critical Percentage:{' '}
            {(getNestedObject(dataCovid, ['0', 'critical']) /
              getNestedObject(dataCovid, ['0', 'confirmed'])) *
              100}
          </Text>
          <Text>
            {' '}
            Recovered Percentage:{' '}
            {(getNestedObject(dataCovid, ['0', 'recovered']) /
              getNestedObject(dataCovid, ['0', 'confirmed'])) *
              100}
          </Text>
          <Text>
            {' '}
            Death Percentage:{' '}
            {(getNestedObject(dataCovid, ['0', 'deaths']) /
              getNestedObject(dataCovid, ['0', 'confirmed'])) *
              100}
          </Text>
        </View>
      );
    }
  }
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default World;

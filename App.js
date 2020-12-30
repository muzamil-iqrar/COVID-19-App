import axios from 'axios';
import * as React from 'react';
import {ActivityIndicator,Button,View,Text,ScrollView,Image,StyleSheet,FlatList,} from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

             // Screens//
import World from './screens/WorldStats';
import Country from './screens/CountryScreen';
import Favorite from './screens/FavouriteCountries';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

            //Slide Drawer left side//
function MyDrawer() {
  return (
    <Drawer.Navigator
      //openByDefault={true}      
      drawerType="slide"
      drawerStyle={{
        backgroundColor: '#00FFFF',
        width: 220,
      }}>
         
      <Drawer.Screen
        name="World"
        component={World}
        options={{
          drawerIcon: () => (
            <Ionicons
              name="earth"
              size={30}
              color="red">
              </Ionicons>
          ),
          drawerLabel: 'World Stats',
        }}
      />
      <Drawer.Screen
        name="Country"
        component={Country}
        options={{
          drawerIcon: () => (
            <Ionicons
              name="flag"
              size={30}
              color="red">
              </Ionicons>
          ),
          drawerLabel: 'Country Stats',
        }}
      />
      <Drawer.Screen
        name="Favorite"
        component={Favorite}
        options={{
          drawerIcon: () => (
            <Ionicons 
            name="star" 
            size={30} 
            color="red">
            </Ionicons>
          ),
          drawerLabel: 'Favourites',
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

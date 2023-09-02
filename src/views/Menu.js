import React from "react"
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { DrawerItems } from "react-navigation-drawer"
import { Gravatar } from "react-native-gravatar"

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from "react-native-vector-icons/FontAwesome"

import commonStyles from "../commonStyles"



export default props => {

  const logout = () => {
    delete axios.defaults.headers.common['Authorization']
    AsyncStorage.removeItem('userData')
    props.navigation.navigate('AuthOrApp')
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <View style={styles.titleButton}>
          <Text style={styles.title}>Tasks</Text>
          <TouchableOpacity onPress={logout}>
            <View style={styles.logoutIcon}>
              <Icon name='sign-out' size={30} color='#800' />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <Gravatar style={styles.avatar}
            options={{
              email: props.navigation.getParam('email'),
              secure: true
            }}
          />
          <View style={styles.userNameMail}>
            <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
            <Text style={styles.email}>{props.navigation.getParam('email')}</Text>
          </View>
        </View>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  titleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#000',
    fontFamily: commonStyles.fontFamily,
    fontSize: 30,
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 70 : 30,
  },
  logoutIcon: {
    marginRight: 10,
    paddingTop: Platform.OS === 'ios' ? 70 : 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    margin: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userNameMail: {
    fontFamily: commonStyles.fontFamily,
    marginLeft: 10,
    
  },
  name: {
    fontSize:20,
    marginBottom: 5,
    color: commonStyles.colors.mainText
  },
  email: {
    fontSize: 15,
    color: commonStyles.colors.subText,
    marginBottom: 5,
  },
})
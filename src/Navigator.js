import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Auth from './views/Auth'
import TaskList from './views/TaskList'

import Menu from './views/Menu'
import commonStyles from './commonStyles'
import AuthOrApp from './views/AuthOrApp'

const menuConfig = {
  initialRouteName: 'Today',
  contentComponent: Menu,
  contentOptions: {
    labelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: 20
    },
    activeLabelStyle: {
      color: '#070',
      fontWeight: 'bold'
    }
  }
}

const menuRoutes = {
  Today: {
    name: 'Today',
    screen: props => <TaskList title='Hoje' daysAhead={0} {...props} />,
    navigationOptions: {
      title: 'Hoje'
    }
  },
  Tomorrow: {
    name: 'Tomorrow',
    screen: props => <TaskList title='Amanhã' daysAhead={1} {...props} />,
    navigationOptions: {
      title: 'Amanhã'
    }
  },
  Week: {
    name: 'Week',
    screen: props => <TaskList title='Semana' daysAhead={7} {...props} />,
    navigationOptions: {
      title: 'Semana'
    }
  },
  Month: {
    name: 'Month',
    screen: props => <TaskList title='Mês' daysAhead={30} {...props} />,
    navigationOptions: {
      title: 'Mês'
    }
  },
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

const mainRoutes = {
  AuthOrApp: {
    name: 'AuthOrApp',
    screen: AuthOrApp
  },
  Auth: {
    name: 'Auth',
    screen: Auth
  },
  Home: {
    name: 'Home',
    screen: menuNavigator
  }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'AuthOrApp'
})

export default createAppContainer(mainNavigator)
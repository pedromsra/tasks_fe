import React from "react"
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'

import Icon from "react-native-vector-icons/FontAwesome"

import Swipeable from "react-native-gesture-handler/Swipeable"

import commonStyles from "../commonStyles"

import moment from "moment"
import 'moment/locale/pt-br'

export default props => {

  const doneOrNotStyle = props.done_at != null ?
    { textDecorationLine: 'line-through' } : {}

  const date = props.done_at ? props.done_at : props.estimate_at
  const formattedDate = moment(props.estimate_at).locale('pt-br').format('ddd, D [de] MMMM')

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right}
        onPress={() => props.onDelete && props.onDelete(props.id)}
      >
        <Icon name='trash' size={30} color='#FFF' />
      </TouchableOpacity>
    )
  }

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name='trash' size={30} color='#FFF' style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => props.toggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.done_at)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, doneOrNotStyle]}>{props.description}</Text>
          <Text style={[styles.date]}>{formattedDate}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

function getCheckView(doneAt) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <Icon name='check' size={20} color='#FFF'></Icon>
      </View>
    )
  } else {
    return (
      <View style={styles.pending} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF'
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4D7031',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  excludeIcon: {
    marginLeft: 10,
  },
  excludeText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    margin: 10,
  }
})
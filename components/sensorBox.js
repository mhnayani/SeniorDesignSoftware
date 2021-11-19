import { StyleSheet, Text } from 'react-native';

const sensorBox = (props) => {
    return (
        <View style={styles.container}>
          <Text style={styles.textNonHeader}>{props.desc}</Text>
          <Text style={styles.textHeader}>{props.type}</Text>
          <Text style={styles.textNonHeader}>{props.measurement}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "row",
      borderTopWidth: 2,
      borderTopColor: "white",
      borderBottomWidth: 2,
      borderBottomColor: "white"
  },
  textHeader: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 24,
      color: 'white'
  },
  textNonHeader: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      color: 'white'
  }
});

export default sensorBox
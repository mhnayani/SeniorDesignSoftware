import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Tooltip from 'react-native-walkthrough-tooltip';

const Sensor = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const unitText = <Text style={styles.sideText}>{props.unit}</Text>;
  const dotColor = props.dotColor || '#FFFFFF';
  const dotTooltip = props.dotTooltip || 'N/A';

  return (
    <View style={styles.container}>
      <Text style={styles.sideText}>{props.descriptor}</Text>
      <View style={styles.center}>
        <Text style={styles.middleText}>{props.measurement}</Text>
        {(props.measurement !== '') && (
          <Tooltip
            isVisible={tooltipOpen}
            content={<Text>{dotTooltip}</Text>}
            placement="bottom"
            onClose={() => setTooltipOpen(false)}
          >
            <TouchableOpacity style={{ ...styles.middleDot, backgroundColor: dotColor }} onPress={() => setTooltipOpen(!tooltipOpen)} />
          </Tooltip>
        )}
      </View>
      {props.onPressUnit ? <TouchableOpacity onPress={props.onPressUnit}>{unitText}</TouchableOpacity> : unitText}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: 'white'
  },
  center: {
    display: 'flex',
    alignItems: 'center',
  },
  sideText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: 'white',
  },
  middleText: {
    marginTop: 16,
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    color: 'white',
  },
  middleDot: {
    marginTop: 16,
    width: 16,
    height: 16,
    borderRadius: 12,
  },
});

export default Sensor
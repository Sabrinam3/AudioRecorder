import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import { Icon } from "react-native-elements";

export default function mainButtons(props) {
  return (
    <View style={styles.buttonView}>
      <TouchableOpacity
        style={styles.audioButton}
        onPress={props.startRecording}
      >
        <Icon name="album" size={25} color="red" />
        <Text style={styles.recordButtonText}>Record</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.audioButton}
        onPress={props.stopRecording}
      >
        <Icon name="stop-circle" type="font-awesome" size={25} color="black" />
        <Text style={[styles.stopButtonText, { marginHorizontal: 20 }]}>
          Stop
        </Text>
      </TouchableOpacity>
    </View>
  );
}

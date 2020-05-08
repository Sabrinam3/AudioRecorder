import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import { Icon } from "react-native-elements";

export default function mainButtons(props) {
  return (
    <View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={props.playRecordedAudio}>
          <View style={styles.playbackBtn}>
            <Icon
              name="play-circle"
              type="font-awesome"
              size={40}
              color="black"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.pauseRecordedAudio}>
          <View style={styles.playbackBtn}>
            <Icon
              name="pause-circle"
              type="font-awesome"
              size={40}
              color="black"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.stopPlayingRecordedAudio}>
          <View style={styles.playbackBtn}>
            <Icon
              name="stop-circle"
              type="font-awesome"
              size={40}
              color="black"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.replayRecordedAudio}>
          <View style={styles.playbackBtn}>
            <Icon name="undo" type="font-awesome" size={40} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <Text style={styles.stopButtonText}>Play</Text>
        <Text style={styles.stopButtonText}>Pause</Text>
        <Text style={styles.stopButtonText}>Stop</Text>
        <Text style={styles.stopButtonText}>Restart</Text>
      </View>
      <View style={styles.clearButtonRow}>
        <TouchableOpacity
          onPress={props.muteAudio}
          style={{ marginVertical: 25 }}
        >
          <Icon name="volume-off" size={25} color="grey" />
          <Text>{props.muteButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.clearRecording}>
          <Text style={styles.clearButton}>Clear Recording</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

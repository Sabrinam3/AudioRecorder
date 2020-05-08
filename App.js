import React, { useState } from "react";
import { Text, View } from "react-native";
import * as Font from "expo-font";
import { styles } from "./styles/styles";
import { AppLoading } from "expo";
import MainButtons from "./components/mainButtons";
import PlaybackButtons from "./components/playbackButtons";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";
let recording = null;
let soundObject = null;

const fetchFonts = () => {
  return Font.loadAsync({
    "ConcertOne-Regular": require("./assets/fonts/ConcertOne-Regular.ttf"),
    "AmaticSC-Bold": require("./assets/fonts/AmaticSC-Bold.ttf"),
  });
};
export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [recordButtonText, setRecordButtonText] = useState(
    "Press record to start recording."
  );
  const [muteButtonText, setMuteButtonText] = useState("Mute");
  const [audioMuted, setAudioMuted] = useState(false);
  const [recordingFinished, setRecordingFinished] = useState(false);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant audio recording permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }

    return true;
  };
  const startRecording = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return false;
    } else {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
      //change text on label
      setRecordButtonText("Recording Started!");

      recording = new Audio.Recording();

      try {
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
      } catch (error) {
        console.log("An error occurred on starting record:");
        console.log(error);
      }
    }
  };

  stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      //change text on label
      setRecordButtonText("Recording Stopped");
      //change the boolean so that the playback buttons will appear
      setRecordingFinished(true);
    } catch (error) {
      console.log("An error occurred on stopping record:");
      console.log(error);
    }
  };

  playRecordedAudio = async () => {
    if (soundObject == null) {
      await Audio.setAudioModeAsync({
        // set to false to play through speaker (instead of headset)
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
      soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync({ uri: recording.getURI() });
        await soundObject.setStatusAsync({ isLooping: true });
        await soundObject.playAsync();
      } catch (error) {
        console.log("An error occurred on playback:");
        console.log(error);
      }
    } else {
      try {
        await soundObject.playAsync();
      } catch (error) {
        console.log("An error occurred on playback:");
        console.log(error);
      }
    }
  };

  pauseRecordedAudio = async () => {
    try {
      await soundObject.pauseAsync();
    } catch (error) {
      console.log("An error occurred while pausing playback");
      console.log(error);
    }
  };

  replayRecordedAudio = async () => {
    try {
      soundObject.playFromPositionAsync(0);
    } catch (error) {
      console.log("An error occurred while restarting playback");
      console.log(error);
    }
  };

  stopPlayingRecordedAudio = async () => {
    try {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = null;
    } catch (error) {
      console.log("An error occurred while stopping playback:");
      console.log(error);
    }
  };

  clearRecording = async () => {
    //unload the current audio asset
    try {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();

      //change text on label
      setRecordButtonText("Press Record to start recording");
      //change the boolean so that the main buttons will appear
      setRecordingFinished(false);
      //reset recording object and sound object
      soundObject = null;
      recording = null;
      //reset the audio muted flags
      setMuteButtonText("Mute");
      setAudioMuted(false);
    } catch (error) {
      console.log("An error occurred while stopping playback:");
      console.log(error);
    }
  };

  muteAudio = async () => {
    try {
      if (!audioMuted) {
        soundObject.setIsMutedAsync(true);
        setMuteButtonText("Unmute");
        setAudioMuted(true);
      } else {
        soundObject.setIsMutedAsync(false);
        setMuteButtonText("Mute");
        setAudioMuted(false);
      }
    } catch (error) {
      console.log("An error occurred while muting playback:");
      console.log(error);
    }
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }
  if (!recordingFinished) {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerLabel}> Audio Recorder</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.recordingLabel}>{recordButtonText}</Text>
          <MainButtons
            startRecording={startRecording}
            stopRecording={stopRecording}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerLabel}>Audio Recorder</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.recordingLabel}>{recordButtonText}</Text>
          <PlaybackButtons
            playRecordedAudio={playRecordedAudio}
            pauseRecordedAudio={pauseRecordedAudio}
            stopPlayingRecordedAudio={stopPlayingRecordedAudio}
            replayRecordedAudio={replayRecordedAudio}
            clearRecording={clearRecording}
            muteAudio={muteAudio}
            muteButtonText={muteButtonText}
          />
        </View>
      </View>
    );
  }
}

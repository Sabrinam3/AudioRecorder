import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 50,
    marginHorizontal: 30
  },
  headerView: {
    flex: 0.8,
    alignContent: "center"
  },
  label: {
    fontSize: 14,
    textAlign: "center"
  },
  headerLabel: {
    fontFamily: "ConcertOne-Regular",
    textAlign: "center",
    marginTop: 5,
    fontSize: 36
  },
  mainView: {
    flex: 3.5,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 20
  },
  recordingLabel: {
    padding: 20,
    backgroundColor: "#ecc0bb",
    color: "#7c2c23",
    textAlign: "center",
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 18
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center"
  },
  audioButton: {
    backgroundColor: "#dddcdb",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 10
  },
  recordButtonText: {
    color: "#7c2c23",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10
  },
  stopButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginStart: 12
  },
  playbackBtn: {
    padding: 10,
    backgroundColor: "#dddcdb"
  },
  clearButton: {
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 25,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#f7ba48",
    color: "white",
    fontSize: 16
  },
  clearButtonRow: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  }
});

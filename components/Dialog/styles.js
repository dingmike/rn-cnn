import { Dimensions, StyleSheet } from 'react-native';
import { pTd } from './size';

const winH = Dimensions.get('window').height;
const winW = Dimensions.get('window').width;
let width = 300;
let height = 224;

export const styles = StyleSheet.create({
  popViewWrapper: {
    zIndex: 200,
    elevation: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  popViewBackDrop: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute"
  },
  popViewBackDropView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  main: {
    width: pTd(360),
    minHeight: pTd(124),
    borderRadius: pTd(4),
    backgroundColor: "#ffffff",
    padding: 15,
  },
  topMain: {
    flexDirection: "row",
    height: pTd(48),
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  left: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1
  },
  message: {
    color: "#666666",
    fontSize: pTd(16),
    textAlign: "center",
    paddingLeft: pTd(10),
    paddingRight: pTd(10)
  },
  bottom: {
    height: pTd(40),
      marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  submitBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  submitText: {
    color: "#177dc7",
    fontSize: pTd(16)
  },
  cancleText: {
    color: "#343434",
    fontSize: pTd(16)
  },
  viewLine: {
    height: pTd(1),
    width: "100%",
    backgroundColor: "#FFF4F4F4"
  },
  viewLine2: {
    width: pTd(1),
    height: "100%",
    backgroundColor: "#FFF4F4F4"
  }
});

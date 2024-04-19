import Colors from '@/constants/Colors';
import TeamColors from '@/constants/TeamColors';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TeamColors.default.light.primaryColor,
    // paddingHorizontal: 10,
  },
  userAuthContainer: {
    flex: 1,
    backgroundColor: TeamColors.default.light.primaryColor,
    padding: 20
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: TeamColors.default.light.text,
  },
  inputField: {
    color: TeamColors.default.light.text,
    height: 44,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    padding: 10,
  },
  btn: {
    backgroundColor: TeamColors.default.light.secondaryColor,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  text: {
    color: TeamColors.default.light.text,
  },
});
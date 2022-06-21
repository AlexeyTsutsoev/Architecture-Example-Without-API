import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: 140,
  },
  singleImage: {
    height: 190,
    width: 140,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    position: 'relative',
    marginLeft: 15,
  },
  topImage: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    zIndex: 1,
  },
  oneImage: {
    flex: 1,
  },
});

export default styles;

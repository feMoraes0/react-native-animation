import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  FlatList,
  Animated,
  Image,
} from 'react-native';

const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
}));
const {width, height} = Dimensions.get('screen');

const Indicator = () => {
  return <View style={styles.indicator} />;
};

const Tab = ({item}) => {
  return (
    <View>
      <Text style={[styles.tabItem, {fontSize: 84 / data.length}]}>
        {item.title}
      </Text>
    </View>
  );
};

const Tabs = ({scrollX}) => {
  return (
    <View style={styles.tabs}>
      <View style={styles.tabsBox}>
        {data.map((item) => {
          return <Tab key={item.key} item={item} />;
        })}
      </View>
      <Indicator />
    </View>
  );
};

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => item.key}
          horizontal
          showsVerticalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false}, // native driver won't works with width resize
          )}
          bounces={false}
          renderItem={(item) => (
            <View style={styles.imageWrapper}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.imageMask} />
            </View>
          )}
        />
        <Tabs scrollX={scrollX} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: width,
    height: height,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageMask: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  tabs: {
    position: 'absolute',
    top: 100,
    width: width,
  },
  tabsBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabItem: {
    fontWeight: '800',
    color: 'white',
    textTransform: 'uppercase',
  },
  indicator: {
    position: 'absolute',
    height: 4,
    width: 100,
    backgroundColor: 'white',
    bottom: -10,
  },
});

export default App;

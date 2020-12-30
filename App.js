import React from 'react';
import {
  findNodeHandle,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  FlatList,
  Animated,
  Image,
  TouchableOpacity,
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
  ref: React.createRef(),
}));
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const Indicator = ({measures, scrollX}) => {
  const inputRange = data.map((_, i) => i * screenWidth);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={[
        styles.indicator,
        {
          width: indicatorWidth,
          transform: [
            {
              translateX: translateX,
            },
          ],
        },
      ]}
    />
  );
};

const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={[styles.tabItem, {fontSize: 84 / data.length}]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Tabs = ({scrollX, onItemPress}) => {
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef();
  React.useEffect(() => {
    const localMeasures = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          localMeasures.push({x, y, width, height});

          if (localMeasures.length === data.length) {
            setMeasures(localMeasures);
          }
        },
      );
    });
  }, []);

  return (
    <View style={styles.tabs} ref={containerRef}>
      <View style={styles.tabsBox}>
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const App = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef();
  const onItemPress = React.useCallback((itemIndex) => {
    flatListRef?.current?.scrollToOffset({
      offset: itemIndex * screenWidth,
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Animated.FlatList
          ref={flatListRef}
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
        <Tabs scrollX={scrollX} onItemPress={onItemPress} />
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
    width: screenWidth,
    height: screenHeight,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageMask: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  tabs: {
    position: 'absolute',
    top: 100,
    width: screenWidth,
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
    width: 0,
    backgroundColor: 'white',
    bottom: -10,
    left: 0,
  },
});

export default App;

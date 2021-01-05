import React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: 'https://image.flaticon.com/icons/png/256/3571/3571572.png',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571747.png',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571680.png',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571603.png',
  },
];

const Indicator = ({scrollX}) => {
  return (
    <View style={styles.indicatorBox}>
      {DATA.map((_, i) => {
        return <View key={`indicator-${i}`} style={styles.indicator} />;
      })}
    </View>
  );
};

const App = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Animated.FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <View style={styles.slide}>
            <View style={styles.slideImageBox}>
              <Image source={{uri: item.image}} style={styles.slideImage} />
            </View>
            <View>
              <Text style={styles.slideTextTitle}>{item.title}</Text>
              <Text style={styles.slideTextDescription}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
      <Indicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: width,
    alignItems: 'center',
    padding: 20.0,
  },
  slideImageBox: {
    flex: 0.7,
    justifyContent: 'center',
  },
  slideImage: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain',
  },
  slideTextTitle: {
    fontWeight: '800',
    fontSize: 24.0,
    marginBottom: 10.0,
  },
  slideTextDescription: {
    fontWeight: '300',
  },
  // Indicator Component
  indicatorBox: {
    position: 'absolute',
    bottom: 100.0,
    flexDirection: 'row',
  },
  indicator: {
    height: 10.0,
    width: 10.0,
    borderRadius: 5,
    backgroundColor: '#333',
    margin: 10.0,
  },
});

export default App;

import { View, Text, Button, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef, } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch, } from 'react-redux';
import { increment, decrement, incrementByAmount, reset, setToAmount } from '../../features/counter/activeImgSlice';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const GalleryScreen = () => {

  const activeImg = useSelector((state) => state.activeImg.value);
  const dispatch = useDispatch();
  const imagesRef = useRef(null);

  const navigation = useNavigation();
  const route = useRoute();
  const GalleryisFocused = useIsFocused();

  const { images } = route.params;

  useEffect(() => {
    imagesRef.current?.scrollTo({x: WIDTH * activeImg, animated: false});
  }, [GalleryisFocused]);

  onchange = ({nativeEvent}) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != activeImg) {
        dispatch(setToAmount(slide));
      }
    }
  };

  onended2 = () => {
    navigation.goBack();
};

  return (
    <View style={styles.pagecontainer}>
      <View style={styles.wrap}>
        <ScrollView onScroll={({nativeEvent}) => onchange({nativeEvent})}
          onTouchEnd={({nativeEvent}) => onended2({nativeEvent})}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          ref={imagesRef}
          style={styles.wrap}
        >
          {
            images.map((e, index) => 
              <Image source={{uri: e}} 
                style={styles.wrap}
                key={e}
                resizeMode='contain'  
                />
            )
          }
        </ScrollView>
        <View style={styles.wrapDot}>
          {
            images.map((e, index) =>
              <Text key={e}
              style={activeImg == index ? styles.dotActive : styles.dotInactive}>
                ●
              </Text>  
            )
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    pagecontainer: {
      flex: 1, 
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: 'black',
    },
    card: {
      borderRadius: 10,
      overflow: 'hidden',
      flex: 1, 
      height: '100%',
      width: '100%',
    },
    wrap: {
      height: HEIGHT,
      width: WIDTH,
    },
    wrapDot: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      alignSelf: 'center',
      zIndex: 10,
    },
    dotActive: {
      margin: 3,
      color: 'black',
    },
    dotInactive: {
      margin: 3,
      color: 'white',
    }
});

export default GalleryScreen;
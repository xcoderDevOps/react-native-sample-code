import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import useStyles from './CustomSegmentedControlStyle';
import {useTheme} from '@react-navigation/native';
import {dimens, fontsizes} from '../constants/dimens';
import CommonStyles from '../features/CommonStyles';
import font from '../constants/font';
const CustomSegmentedControl = ({
  segments,
  selectedIndex,
  onSegmentPress,
  renderTabContent,
  isShowCount = false,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const commonStyles = CommonStyles();
  return (
    <View style={{}}>
      <View style={styles.container}>
        {segments.map((segment, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.segmentButton,
              {
                backgroundColor:
                  index === selectedIndex
                    ? colors.infoblue
                    : colors.backgroundblue,
                opacity: 1,
              },
            ]}
            onPress={() => onSegmentPress(index)}>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: fontsizes.FONT_16_PX,
                  fontFamily: font.Body1_Inter_Regular,
                  color:
                    index === selectedIndex ? colors.white : colors.black40,
                }}>
                {segment}
              </Text>
              {isShowCount && (
                <View
                  style={{
                    backgroundColor: index === 0 ? colors.white : colors.red,
                    borderRadius: dimens.h1_5,
                    width: dimens.h3,
                    height: dimens.h3,
                    marginStart: dimens.h1_5,
                    // padding: dimens.ho5,
                    // alignItems: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      commonStyles.PlaceholderNOverline,
                      {
                        color: index === 0 ? colors.infoblue : colors.white,
                        textAlign: 'center',
                        lineHeight: undefined,
                        letterSpacing: undefined,
                      },

                      ,
                    ]}>
                    {20}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {renderTabContent && renderTabContent[selectedIndex]}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     borderRadius: 50,
//     overflow: 'hidden',
//     marginTop: 15,
//     backgroundColor: '#F1F9FF',
//     height: 46,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 4,
//     marginRight: 15,
//     marginLeft: 15,
//   },
//   segmentButton: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     borderRadius: 50,
//     height: 40,
//   },
// });

export default CustomSegmentedControl;

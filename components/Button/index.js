import React from 'react';

import { TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import loadingJson from 'assets/images/loading.json';
import theme from 'helpers/theme';
import styles from './styles';

const ButtonFill = ({
  title = '',
  icon,
  color = theme.secondary,
  fontColor = theme.text,
  onPress = () => {},
  disabled = false,
  style = {},
  textStyle = {},
  loading = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.buttonContainer,
      { backgroundColor: color, borderColor: color },
      style,
    ]}
  >
    <>
      {title && !loading ? (
        <Text
          style={[
            styles.buttonText,
            fontColor ? { color: fontColor } : null,
            textStyle,
          ]}
        >
          {title}
        </Text>
      ) : (
        icon
      )}
      {title && loading && (
        <LottieView
          source={loadingJson}
          autoPlay
          loop
          style={{
            width: 20,
            height: 20,
          }}
        />
      )}
    </>
  </TouchableOpacity>
);

export default ButtonFill;

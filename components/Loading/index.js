import React from 'react';
import LottieView from 'lottie-react-native';
import loadingJson from 'assets/images/loading.json';

const Loading = ({ loading }) =>
  loading ? (
    <LottieView
      source={loadingJson}
      autoPlay
      loop
      style={{
        width: 20,
        height: 20,
      }}
    />
  ) : null;

export default Loading;

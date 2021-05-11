import metrics from 'helpers/metrics';
import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';

const Input = React.forwardRef(
  (
    {
      focused,
      style,
      blurSubmit,
      returnKeyType,
      textStyle,
      disabled,
      autoCapitalize,
      nextField,
      placeholder,
      onChangeText,
      value,
      handleFocus,
      keyboardType,
      secureTextEntry,
      label,
      labelStyle,
      msg,
      ...rest
    },
    ref
  ) => (
    <View style={{ marginTop: metrics.baseMargin }}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          style,
          focused ? { borderColor: '#FDB913' } : null,
          disabled ? { borderColor: '#ffffffaa' } : null,
        ]}
      >
        <TextInput
          {...rest}
          blurOnSubmit={blurSubmit}
          returnKeyType={returnKeyType}
          editable={!disabled}
          style={[styles.input, textStyle]}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          ref={ref}
          onSubmitEditing={nextField}
          placeholder={placeholder}
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          placeholderTextColor="rgba(255,255,255,0.6)"
          onChangeText={onChangeText}
          value={value}
          onBlur={handleFocus}
          onFocus={handleFocus}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
        <Text style={styles.text}>{msg}</Text>
      </View>
    </View>
  )
);

Input.defaultProps = {
  focused: false,
  style: {},
  textStyle: {},
  blurSubmit: false,
  returnKeyType: 'done',
  disabled: false,
  autoCapitalize: 'none',
  nextField: () => {},
  placeholder: '',
  onChangeText: () => {},
  value: null,
  handleFocus: () => {},
  keyboardType: 'default',
  secureTextEntry: false,
  label: '',
  labelStyle: {},
  msg: '',
};

export default Input;

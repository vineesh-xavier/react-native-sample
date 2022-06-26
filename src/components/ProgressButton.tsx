import React, { FC } from "react";
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, TextProps, StyleSheet } from "react-native";
import Colors from "../assets/Colors";

interface ProgressButtonProps extends TouchableOpacityProps {
  isLoading?: Boolean,
  title: string,
  onClick: () => void,
  textStyle?: TextProps,
}

const ProgressButton: FC<ProgressButtonProps> = ({ isLoading = false, title, onClick , textStyle = {} , ...buttonStyle }) => {
  return isLoading ?
    <ActivityIndicator
      size="large"
      color={Colors.primary} />
    :
    <TouchableOpacity
      onPress={onClick}
      {...buttonStyle}
      style={[style.buttonStyle, buttonStyle.style]}>
      <Text style={[style.textStyle, textStyle.style]}>{title}</Text>
    </TouchableOpacity>
}

export default ProgressButton;

const style = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',    
    backgroundColor: Colors.primary,
    width: '100%',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    paddingVertical: 5
  }
})
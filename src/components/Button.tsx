import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

function Button({ title, style, ...rest }: ButtonProps): JSX.Element {
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderBottomWidth: 0,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
});

export default Button;

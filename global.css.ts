import {TextStyle, ViewStyle} from 'react-native';

const globalStyles: {
  colors: {
    primary: string;
    secondary: string;
  };
  pagePadding: ViewStyle;
  text: {
    title: TextStyle;
    subtitle: TextStyle;
  };
} = {
  colors: {
    primary: 'rgba(35, 90, 255, 1)',
    secondary: 'rgb(151, 151, 151)',
  },
  pagePadding: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  },
};

export default globalStyles;

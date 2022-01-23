import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      clear: 'hsla(120, 40%, 80%, 1)'
    },
    fontSizes: {
      body: 14,
      subheading: 16,
      heading: 20,
    },
    fonts: {
      main: Platform.select({
        ios: 'Arial',
        android: 'Roboto',
        default: 'System'
      })
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    backgrounds: {
        appBar: '#24292e'
    }
  };
  
  export default theme;
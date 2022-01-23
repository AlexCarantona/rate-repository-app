import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Main from './src/components/Main';

import Constants from 'expo-constants'

import createApolloClient from './src/utils/apolloClient';
const apolloClient = createApolloClient();

export default function App() {
  console.log(Constants.manifest)
  return (
  <>
  <NativeRouter>
    <ApolloProvider client = {apolloClient} >
      <Main />
    </ApolloProvider>
  </NativeRouter>
  </>)
}
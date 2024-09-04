
import { NativeBaseProvider, StatusBar } from "native-base";
import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from "@expo-google-fonts/roboto"

import { AuthContextProvider } from "./src/contexts/AuthContext";
import {ClerkProvider, useOAuth} from "@clerk/clerk-expo"
import {THEME} from "./src/styles/themes"

import {Loading} from "./src/components/Loading"
import {SignIn} from "./src/screens/SignIn"


export default function App() {
const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})
  return (
    <NativeBaseProvider theme={THEME}>
      <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <AuthContextProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
            
          />
          {
              fontsLoaded ? <SignIn/>: <Loading/> 
          }
        </AuthContextProvider>
      </ClerkProvider>
     
      
    </NativeBaseProvider>
  
  );
}


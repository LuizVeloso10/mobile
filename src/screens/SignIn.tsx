
import { NativeBaseProvider, Text,Icon, Center } from "native-base";
import {Fontisto} from '@expo/vector-icons'
import Logo from '../assets/logo.svg';
import {Button} from '../components/Button'
import {useAuth} from '../hooks/useAuth'
import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from "@expo-google-fonts/roboto"
import { color } from "native-base/lib/typescript/theme/styled-system";



export function SignIn() {
  const {signIn, userLogin} = useAuth();
  console.log(userLogin)
  return (
    <NativeBaseProvider>
      <Center flex={1} bgColor={"gray.900"} p={7}>   
        <Logo width={212} height={40}></Logo>
        <Button
          title="ENTRAR COM GOOGLE" 
          leftIcon={<Icon as={Fontisto} name="google" color={"white"} size="md"/>}
          type="SECONDARY"
          mt={12}
          onPress={signIn}
         />
         <Text color="white" textAlign="center" mt={4}>
              Não utilizamos nenhuma informação além {'\n'}
               do seu email para criação de sua conta
         </Text>
      </Center>
    </NativeBaseProvider>
  
  );
}


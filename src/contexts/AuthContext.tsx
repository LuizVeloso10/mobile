import {createContext, ReactNode, useState, useEffect}  from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser'
import {useAuth as useAuthClerk} from "@clerk/clerk-expo"




WebBrowser.maybeCompleteAuthSession();



interface UserProps{
    name: string;
    avatarUrl: string;
}


export interface AuthContextDataProps{
    userLogin: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthProviderProps){
    
    const [userLogin, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const {isSignedIn, isLoaded, getToken} = useAuthClerk()
    
    console.log(AuthSession.makeRedirectUri())

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "902095196030-81ojvh6vmcvtbkru0qr0jp3ghogr5ltm.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
        redirectUri: "https://auth.expo.io/@luizload/mobile"  // Certifique-se que esse URI está correto para o ambiente
      });

      useEffect(( () => {
        WebBrowser.warmUpAsync()

        return () => {
          WebBrowser.coolDownAsync();
        }
      }), [])

      useEffect(() => {
        if (isSignedIn && isLoaded) {
            // Pega os dados do usuário
         
        }
    }, [isSignedIn, isLoaded]);

      useEffect(() => {
        if (response?.type === 'success') {
          const { authentication } = response;
          console.log('Token de autenticação:', authentication.accessToken);
          // Aqui você pode fazer algo com o token de autenticação
        }
      }, [response]);
   
   
    async function signIn(){

      
        try {
            setIsUserLoading(true);
            if (request) { // Verifique se o request está pronto
              await promptAsync();
            } else {
              console.log('Request não está pronto');
            }
          } catch (error) {
            console.log(error);
          } finally {
            setIsUserLoading(false);
          }
            
    }

   

    return(
   
        <AuthContext.Provider value={{
                  signIn,
                  isUserLoading,
                  userLogin
                }}>

                {children}
        </AuthContext.Provider>
    
       
    )
}
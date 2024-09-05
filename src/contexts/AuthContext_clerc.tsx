import {createContext, ReactNode, useState, useEffect}  from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser'
import {ClerkProvider, useOAuth, useUser} from "@clerk/clerk-expo"
import {useAuth as useAuthClerk} from "@clerk/clerk-expo"
import * as Linking from 'expo-linking';
import { useAuth} from '../hooks/useAuth';



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
    const {user} = useUser()

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
            fetchUserData();
        }
    }, [isSignedIn, isLoaded]);

      useEffect(() => {
        if (response?.type === 'success') {
          const { authentication } = response;
          console.log('Token de autenticação:', authentication.accessToken);
          // Aqui você pode fazer algo com o token de autenticação
        }
      }, [response]);
   
    const googleOAuth = useOAuth({strategy: "oauth_google"}) 
    async function signIn(){

      try {
        setIsUserLoading(true);
        const redirectURL = Linking.createURL("/")
        const oAuthFlow = await googleOAuth.startOAuthFlow({redirectUrl: redirectURL});
        if(oAuthFlow.authSessionResult?.type === "success"){
          if(oAuthFlow.setActive){
            await oAuthFlow.setActive({
              session: oAuthFlow.createdSessionId
             
            
            })

          
          }
        }else{
          setIsUserLoading(false)
        }

      } catch (error) {
        setIsUserLoading(false);
      }
   


      /*
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
            */
    }

    async function fetchUserData() {
        try {
            const token = await getToken();
            console.log("Token de autenticação:", token);

            const userData: UserProps = {
                name: user?.fullName || "Usuário",
                avatarUrl: user?.imageUrl || "",
            };
            setUser(userData);

            // Você pode usar o token para fazer chamadas à API aqui
        } catch (error) {
            console.error("Erro ao obter o token:", error);
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
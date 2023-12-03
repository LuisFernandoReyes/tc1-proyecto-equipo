import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "../utils/constant";

export async function setTokenApi(token){

    try{
        await AsyncStorage.setItem(TOKEN, token)
        return true
    }catch(e){
        return null
    }

}

export async function getTokenApi(token){

    try{
        const token = await AsyncStorage.getItem(TOKEN)
        return token
    }catch(e){
        return null
    }

}
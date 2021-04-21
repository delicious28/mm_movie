import AsyncStorage from '@react-native-async-storage/async-storage';


const saveData = async (key,value,timeout=0) => {
    try {
      await AsyncStorage.setItem('@'+key, JSON.stringify({
        saveTime:Date.now(),
        timeout,
        value
      }))
    } catch (e) {
      // saving error
    }
}

const getData = async (key) => {
    try {
      const data = await AsyncStorage.getItem('@'+key)
      if(data !== null) {
        let {saveTime,timeout,value} = JSON.parse(data);

        //过期的返回null，并把值删掉
        if(timeout > 0 && (Date.now()-saveTime)>timeout*1000)
        {
          await removeItem(key);
          return null;
        }
        return value
      }
    } catch(e) {
      return null
    }
}

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem('@'+key)
  } catch(e) {
   
  }
}

export default {
    saveData,
    getData,
    removeItem
}
  
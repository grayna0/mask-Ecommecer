/* eslint-disable @typescript-eslint/no-explicit-any */
 const useLocalStorage = () => {
    let localItem
  
    const getLocalItem = (key: string) => {
      localItem = localStorage.getItem(key);
      if (localItem) {
        return JSON.parse(localItem);
      }
      return null;
    };
  
    const setLocalItem = (key:string, data:any) => {
      localStorage.setItem(key, JSON.stringify(data));
    };
    const removeLocalItem = (key: string) => {
        localStorage.removeItem(key)
    }
    return {getLocalItem, setLocalItem, removeLocalItem} 
  };
export default useLocalStorage
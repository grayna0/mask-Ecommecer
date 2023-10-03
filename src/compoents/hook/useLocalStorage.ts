 const useLocalStorage = () => {
    let localitem
  
    const getLocalItem = (key: string) => {
      localitem = localStorage.getItem(key);
      if (localitem) {
        return JSON.parse(localitem);
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
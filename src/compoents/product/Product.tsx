import React, {useState,useEffect} from "react";
import apiUrl from '../../services/Api'
import axios from "axios";


interface IData {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    albumId: number;
    class: string;
  }
const MyComponent: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [maxAlbumId, setMaxAlbumId] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, []);

 

  const fetchData = async () => {
    try {
      const response = await axios.get<IData[]>(`${apiUrl}/photos`);
      const maxId = Math.max(...response.data.map((photo) => photo.albumId));
      setMaxAlbumId(maxId);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAlbumIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMaxAlbumId(parseInt(event.target.value));
  };

  const renderAlbumIdOptions = () => {
    const options = [];
   
    

    for (let i = 1; i <= maxAlbumId; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  };

  return (
    <div>
      <h1>Photos</h1>
      <label htmlFor='albumId'>Album ID:</label>
      <select id='albumId' value={maxAlbumId} onChange={handleAlbumIdChange}>
        {renderAlbumIdOptions()}
      </select>
      <ul>
        {data
          .filter((photo) => photo.albumId === maxAlbumId)
          .slice(0, 5)
          .map((photo) => (
            <li key={photo.id}>
              <div>{photo.title}</div>
              <img src={photo.url} alt='' />
              <img src={photo.thumbnailUrl} alt='' />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MyComponent;
export type {IData}
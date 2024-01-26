import { useEffect, useState } from "react";

const Stars = ({
    rating,
    onchange,
  }: {
    rating: number;
    onchange?: (i: number) => void;
  }) => {
    const [starExists, setStarExists] = useState<number[]>([0, 0, 0, 0, 0]);
    useEffect(() => {
      handleStarShow();
      console.log(1,rating);
      
    },[rating]);
    const onchangeStars = (index: any) => {
      if (onchange) {
        onchange(index);
        handleSelectStar(index);
      
      } else {
        return;
      }
    };
    const handleSelectStar = (rating: number) => {
      const fillStar = starExists.slice(0, rating + 1).fill(1);
  
  
      const lastStar = starExists.slice(rating + 1, 6).fill(0);
 
  
      const showStarSeletd = fillStar.concat(lastStar);
 
  
      setStarExists(showStarSeletd);
    };
    const handleStarShow = () => {
      let starsFirst;
      let starLast;
      if (rating) {
        starsFirst = Math.floor(rating);
        starLast = (rating - starsFirst).toFixed(1);      
        const updateStar = starExists.slice(0, starsFirst).fill(1);
        if (Number(starLast) < 1 && Number(starLast) > 0) {
          const updateStarLast = starExists.slice(starsFirst+1, 6);
          setStarExists(updateStar.concat(Number(starLast), updateStarLast));
        } else if (Number(starLast) === 5) {
          setStarExists([1, 1, 1, 1, 1]);
        } else if (Number(starLast) === 0) {
          const updateStarLast = starExists.slice(starsFirst, 6);
          setStarExists(updateStar.concat(updateStarLast));
        }
      }
    };
  
    return (
      <>
        {starExists.map((rate: number, index: number) => (
          <div className="star-rating">
            <div
              className="star-rating-wrapper"
              style={{ width: `${rate === 1 ? 100 : rate * 100}%` }}
            >
              <svg
                enableBackground="new 0 0 15 15"
                viewBox="0 0 15 15"
                x="0"
                y="0"
                className="icon-rating"
                onClick={() => {
                  onchangeStars(index);
                }}
              >
                <polygon
                  points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                ></polygon>
              </svg>
            </div>
            <svg
              enableBackground="new 0 0 15 15"
              viewBox="0 0 15 15"
              x="0"
              y="0"
              className="rating-stars__primary-star icon-rating-solid"
              onClick={() => {
                onchangeStars(index);
              }}
            >
              <polygon
                points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
              ></polygon>
            </svg>
          </div>
        ))}
      </>
    );
  };
   const ShowStars = ({
    productStar,
    onchange,
  }: {
    productStar: number;
    onchange?: (i: number) => void;
  }) => {
    return (
      <div className="header-rating-comment  w-40">
        <Stars rating={productStar} onchange={onchange} />
      </div>
    );
  };


  export default ShowStars
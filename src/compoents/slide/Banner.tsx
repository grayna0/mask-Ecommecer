
const Banner = () => {
  return (
    <div className="banner">
     
      <div className="content-banner ">
  
        <svg>
          <filter id="custom">
            <feTurbulence type="turbulence" baseFrequency="0.01 0.003" >
              <animate
                attributeName="baseFrequency"
                from="0.01 0.003"
                to="0.001 0.2"
                dur="5.6s"
                repeatCount="indefinite"
              ></animate>
            </feTurbulence>
            <feDisplacementMap
             
              in="SourceGraphic"
              scale="50"
            ></feDisplacementMap>
          </filter>
        </svg>
        <img src="/banner1.png" alt="banner1" className="banner-img" />
      </div>
    </div>
  );
};

export default Banner;

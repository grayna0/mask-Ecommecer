
import "./ball.scss"
const Ball = ({width,height,x,y,nameAnimation,dur}:{nameAnimation?:string,width?:number,height?:number,x?:number,y?:number,dur?:number}) => {
  return (
 

        <div className='ball'
        style={{
          position:`absolute`,
          width: `${width}px`,
          height: `${height}px`,
          top: `${y}%`,
          left: `${x}%`,
          transform:`translate(${x}%,${y}%))`,
          animation:`${nameAnimation} linear ${dur}s infinite alternate`,
        }}></div>
     
   
  )
}

export default Ball
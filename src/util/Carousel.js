import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import librarycards from "../assets/images/library-cards.svg";
import BrandTargetdnd from "../assets/images/BrandTarget-dnd.svg";
import ExclusiveDnd from "../assets/images/Container_exclusive_dnd.svg";

const customCarousel =()=>{
    return(
          <>
         <Carousel autoPlay showThumbs={false} showIndicators={false} showStatus={false}>
            <div>
                <img src={librarycards} />
            </div>
            <div>
                <img src={BrandTargetdnd} />
            </div>
            <div>
                <img src={ExclusiveDnd}/>
            </div>
        </Carousel>
         </>
      )
  }
  
  
  export default customCarousel;
  



 
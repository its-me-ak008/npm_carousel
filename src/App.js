import React from 'react';
import CustomCarousel, { CarouselItem } from "./components/carousel";

function App() {
    return (
        <CustomCarousel
        >
            {
                Array.from(Array(8)).map((item, i) =>
                    <CarouselItem key={"item" + i}>
                        <div className="product text-center mx-2 " key={"product" + i}>
                            <img src="https://ds393qgzrxwzn.cloudfront.net/resize/c500x500/cat1/img/images/0/eavVeFFfyf.jpg" alt="" width="200px" />
                        </div>
                    </CarouselItem>
                )
            }
        </CustomCarousel>
    )
}
export default App;
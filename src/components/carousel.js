import React from "react";

export const CarouselItem = ({ children, width, key }) => {
    return (
        <div style={{ ...style.carousel_item_asw, width: width }} key={key}>
            {children}
        </div>
    )
}
const CustomCarousel = ({ children, options }) => {
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [itemstoshow, setItemstoshow] = React.useState(0)
    const [itemwidth, setItemwidth] = React.useState(0)
    const [childCount, setChildCount] = React.useState(0)
    const carouselref = React.useRef();
    const updateIndex = (newindex) => {
        if (newindex < 0) {
            newindex = 0;
        }
        else if (newindex >= (React.Children.count(children) - (itemstoshow - 1))) {
            newindex = React.Children.count(children) - itemstoshow;
        }
        setActiveIndex(newindex);
    }
    React.useEffect(() => {
        setChildCount(React.Children.count(children));
        window.addEventListener('resize', updateitems);
        setItemwidth(carouselref.current.children[0].clientWidth)
        let a = carouselref.current.children[0].clientWidth;
        function updateitems() {
            setItemstoshow(Math.floor(carouselref?.current?.parentElement?.clientWidth / a));
        }
        updateitems();
    }, [])
    return (
        <div
            style={style.carsousel_asw}
        >
            <div
                style={{
                    ...style.carousel_inner_asw,
                    transform: `translateX(-${activeIndex * 100 / itemstoshow}%)`
                }}
                ref={carouselref}
            >
                {
                    React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, { width: `${100 / itemstoshow}%` });
                    })
                }
            </div>
            <div
                style={style.dots}
                className="dots"
            >
                {
                    (childCount - itemstoshow) >= 0 ?
                        Array?.from(Array(childCount - itemstoshow + 1))?.map((dot, d) =>
                            <span
                                key={"dot" + d}
                                style={{
                                    ...style.dots.dot,
                                    backgroundColor: d == activeIndex ? 'grey' : 'lightgrey'
                                }}
                                onClick={() => updateIndex(d)}
                            >
                            </span>
                        ) :
                        <></>
                }
            </div>
            <div style={style.indicators}>
                <button
                    style={{ ...style.indicators.button, transform: 'rotate(180deg)', marginRight: 10 }}
                    className="prev"
                    onClick={() => updateIndex(activeIndex - 1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" x="0" y="0" viewBox="0 0 24 24">
                        <g xmlns="http://www.w3.org/2000/svg">
                            <path d="m12 19a1 1 0 0 1 -.71-1.71l5.3-5.29-5.3-5.29a1 1 0 0 1 1.41-1.41l6 6a1 1 0 0 1 0 1.41l-6 6a1 1 0 0 1 -.7.29z" fill="white"></path>
                        </g>
                    </svg>
                </button>
                <button
                    style={style.indicators.button}
                    className="next"
                    onClick={() => updateIndex(activeIndex + 1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" x="0" y="0" viewBox="0 0 24 24">
                        <g xmlns="http://www.w3.org/2000/svg">
                            <path d="m12 19a1 1 0 0 1 -.71-1.71l5.3-5.29-5.3-5.29a1 1 0 0 1 1.41-1.41l6 6a1 1 0 0 1 0 1.41l-6 6a1 1 0 0 1 -.7.29z" fill="white"></path>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    )
}
export default CustomCarousel;

export const style = {
    carsousel_asw: {
        overflow: 'hidden',
        margin: '0 30px'
    },
    carousel_inner_asw: {
        whiteSpace: 'nowrap',
        transition: 'transform 0.3s',
        marginBottom: 10,
    },
    carousel_item_asw: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 10px',
        boxSizing: 'border-box'
    },
    dots: {
        display: "flex",
        justifyContent: 'center',
        marginBottom: 10,
        dot: {
            width: 10,
            height: 10,
            marginRight: 5,
            borderRadius: '50px',
            cursor: "pointer"
        }
    },
    indicators: {
        display: "flex",
        justifyContent: 'center',
        button: {
            backgroundColor: 'grey',
            outline: 'none',
            borderRadius: 5,
            width: 50,
            padding: 5,
            border: 'none',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer'
        }
    }
}
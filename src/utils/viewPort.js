import { useState, useEffect, useRef } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function useViewPort({viewPortRows, data, renderedRows}, tableContainer){
    const [numberOfRows, setNumberOfRow] = useState(renderedRows ? renderedRows : viewPortRows + 10);
console.log("inside rendered rows", renderedRows);
    const [renderData, setRenderData] = useState([]);
    const myStateRef = useRef(numberOfRows);
    useEffect(() => {
        function handleScroll() {
            const newNumberOfRows =  numberOfRows + 5
            myStateRef.current = newNumberOfRows;
            setNumberOfRow(newNumberOfRows);
        console.log("inside handler code", numberOfRows)

        }
        console.log("inside registering a handler")
        tableContainer.current.addEventListener("scroll", handleScroll);
        return () => tableContainer.current.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        console.log("inside setting reder data")
        setRenderData([...data].splice(0, numberOfRows))
    }, [numberOfRows])

    useEffect(() => {
        console.log("inside with data")
        if(data.length) {
            // setRenderData(data);
            setRenderData([...data].splice(0, numberOfRows));
        }
    }, [data])

    return {renderData, numberOfRows}
}
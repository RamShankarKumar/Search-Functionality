import './ResultCardContainer.css'
import ResultCard from '../resultCard/ResultCard'
import { createRef, useState, useEffect } from 'react';

const useKeyPress = function (targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};


const ResultCardContainer = ({ inputText, searchResult }) => {

  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    if (searchResult.length && downPress) {
      setCursor(prevState =>
        prevState < searchResult.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (searchResult.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (searchResult.length) {
      setSelected(searchResult[cursor]);
    }
  }, [cursor]);

  useEffect(() => {
    if (searchResult.length && hovered) {
      setCursor(searchResult.indexOf(hovered));
    }
  }, [hovered]);

  return (
    <div className='resultCardContainer'>
      {searchResult.length ?
        searchResult.map((searchResultItem, index) => {
          const ref = createRef();

          const handleScrollClick = () => {
            ref.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
          return (
            <ResultCard
              key={searchResultItem.id}
              id={index}
              inputText={inputText}
              searchResult={searchResultItem}
              length={searchResult.length}
              ref={ref}
              handleScrollClick={handleScrollClick}

              active={index === cursor}
              setSelected={setSelected}
              setHovered={setHovered}
              downPress={downPress}
              upPress={upPress}
              selected={selected}
            />
          )
        }) :
        inputText && <div className='noResult'>No Result Found</div>
      }
    </div>
  )
}

export default ResultCardContainer;
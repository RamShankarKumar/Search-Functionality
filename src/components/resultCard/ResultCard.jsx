import './ResultCard.css'
import { forwardRef, useEffect } from 'react';

const ResultCard = forwardRef(({ handleScrollClick, inputText, searchResult, id, length, active, setHovered, selected, upPress, downPress }, ref) => {

  useEffect(() => {
    if ((selected?.id === searchResult.id) && (upPress || downPress)) {
      handleScrollClick();
    }
  }, [selected])

  return (
    <div
      className={`${id === length - 1 ? 'last-resultCard' : 'resultCard'} ${active ? "active" : ""}`}
      ref={ref}
      onClick={() => {
        handleScrollClick();
      }}
      onMouseEnter={() => {
        setHovered(searchResult);
      }}
      onMouseLeave={() => setHovered(undefined)}
    >
      <p className='resultId'>{typeof searchResult.id === 'string' ? searchResult.id :
        searchResult.id.map((ele) => <p key={ele}>{ele}</p>)}</p>

      <p className='resultName'>{searchResult.name}</p>

      {searchResult.textInItemsArray && <p className='resultItem'>"<span>{inputText}</span>" found in items</p>}

      <p className='resultAddress'>{searchResult.address + ' ' + searchResult.pincode}</p>
    </div>
  )
})

export default ResultCard;
import { useState, useEffect } from 'react';
import ResultCardContainer from '../resultCardContainer/ResultCardContainer';
import { data } from '../../asset/data';
import { Icon } from '@iconify/react';
import './SearchBar.css';

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  function handleInputText(e) {
    setInputText(e.target.value)
  }


  // Function to handle results got from input text.
  function handleSearchResult(inputText) {
    const filteredData = data.filter((dataItem) => {
      const dataItemValues = Object.values(dataItem).join(' ').toLowerCase();

      if (inputText.length && dataItemValues.includes(inputText.toLowerCase())) {
        return true
      }
      else {
        return null
      }
    })

    // This loop will check if searched text is present in the `item array` or not. If present it puts a new key `textItemsArray` to the exisiting result object.
    return filteredData.map((filteredItem) => {
      const filteredItemValues = filteredItem.items.join(' ').toLowerCase();
      if (filteredItemValues.includes(inputText.toLowerCase())) {
        return { ...filteredItem, textInItemsArray: true };
      }
      else {
        return { ...filteredItem, textInItemsArray: false };
      }
    })
  }

  useEffect(() => {
    setSearchResult(handleSearchResult(inputText))
  }, [inputText])

  return (
    <div className='searchBarContainer'>
      <div className='searchBarContainer-input'>
        <input type='text' value={inputText} onChange={handleInputText} />
        <span className='icon-search icon'><Icon icon='ic:baseline-search' /></span>
        {searchResult.length > 0 ? <span className='icon-cancel icon' onClick={() => setInputText('')}><Icon icon='radix-icons:cross-2' /></span> : null}
      </div>
      <ResultCardContainer inputText={inputText} searchResult={searchResult} />
    </div>
  )
}

export default SearchBar;
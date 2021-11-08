import moment from 'moment';
import { useEffect, useState } from 'react';

function App() {
  let [value, setValue] = useState(``);
  let [changedElem, setChangedElem] = useState({day: false,month: false,year: false,hour: false,min: false,sec: false});

  const setCursorIndex = (e) => {
    const indCursorPosition = e.target.selectionStart,
          targetValue = e.target.value,
          indFirstSlash = targetValue.indexOf('/'),
          indSecondSlash = targetValue.lastIndexOf('/'),
          indFirstSpace = targetValue.indexOf(' '),
          indFirstColon = targetValue.indexOf(':'),
          indSecondColon = targetValue.lastIndexOf(':');

    if(indCursorPosition <= 2) setChangedElem({day: true,month: false,year: false,hour: false,min: false,sec: false});
    if(indCursorPosition > indFirstSlash && indCursorPosition <= indSecondSlash) setChangedElem({day: false,month: true,year: false,hour: false,min: false,sec: false});
    if(indCursorPosition > indSecondSlash && indCursorPosition <= indFirstSpace) setChangedElem({day: false,month: false,year: true,hour: false,min: false,sec: false});
    if(indCursorPosition > indFirstSpace && indCursorPosition <= indFirstColon)  setChangedElem({day: false,month: false,year: false,hour: true,min: false,sec: false});
    if(indCursorPosition > indFirstColon && indCursorPosition <= indSecondColon)  setChangedElem({day: false,month: false,year: false,hour: false,min: true,sec: false});
    if(indCursorPosition > indSecondColon)  setChangedElem({day: false,month: false,year: false,hour: false,min: false,sec: true});
  };

  useEffect(()=>{
    const elementMy = document.getElementById('myInput'),
          indFirstSlash = value.indexOf('/'),
          indSecondSlash = value.lastIndexOf('/'),
          indFirstSpace = value.indexOf(' '),
          indFirstColon = value.indexOf(':'),
          indSecondColon = value.lastIndexOf(':');

    if(value.length > 18){
      if(changedElem.day) elementMy.setSelectionRange(indFirstSlash - 2, indFirstSlash); 
      if(changedElem.month) elementMy.setSelectionRange(indFirstSlash + 1, indSecondSlash);
      if(changedElem.year)  elementMy.setSelectionRange(indSecondSlash + 1, indFirstSpace);
      if(changedElem.hour) elementMy.setSelectionRange(indFirstSpace + 1, indFirstColon);
      if(changedElem.min) elementMy.setSelectionRange(indFirstColon + 1, indSecondColon);
      if(changedElem.sec) elementMy.setSelectionRange(indSecondColon + 1, indSecondColon + 3);
    }  

  }, [value]);

  const date = moment(value, 'DD/MMMM/YYYY kk:mm:ss');

  const pushedDown = (e) => {
    const key = e.keyCode;

    if(key === 13) {
      setValue(date.format('DD/MMMM/YYYY kk:mm:ss'));
    }

    if(key === 38 && e.ctrlKey) {
      const cicleDate = moment(value);
      let day = cicleDate.get('date');
      if(changedElem.day) {
        setValue(`${day + 1}/${cicleDate.month()}/${cicleDate.year()} ${cicleDate.hour()}:${cicleDate.minute()}:${cicleDate.second()}`);
      }
    }

    if(key === 38 && !e.ctrlKey) {
      if(changedElem.day) setValue(date.add(1, 'days').format('DD/MMMM/YYYY kk:mm:ss'));
      if(changedElem.month) setValue(date.add(1, 'months').format('DD/MMMM/YYYY kk:mm:ss'));
      if(changedElem.year) setValue(date.add(1, 'years').format('DD/MMMM/YYYY kk:mm:ss'));
      if(changedElem.hour) setValue(date.add(1, 'hours').format('DD/MMMM/YYYY kk:mm:ss'));
      if(changedElem.min) setValue(date.add(1, 'minutes').format('DD/MMMM/YYYY kk:mm:ss'));
      if(changedElem.sec) setValue(date.add(1, 'seconds').format('DD/MMMM/YYYY kk:mm:ss'));
    } else if(key === 40 && !e.ctrlKey) {
        if(changedElem.day) setValue(date.subtract(1, 'days').format('DD/MMMM/YYYY kk:mm:ss'));
        if(changedElem.month) setValue(date.subtract(1, 'months').format('DD/MMMM/YYYY kk:mm:ss'));
        if(changedElem.year) setValue(date.subtract(1, 'years').format('DD/MMMM/YYYY kk:mm:ss'));
        if(changedElem.hour) setValue(date.subtract(1, 'hours').format('DD/MMMM/YYYY kk:mm:ss'));
        if(changedElem.min) setValue(date.subtract(1, 'minutes').format('DD/MMMM/YYYY kk:mm:ss'));
        if(changedElem.sec) setValue(date.subtract(1, 'seconds').format('DD/MMMM/YYYY kk:mm:ss'));
    }
  }
  
  return (
    <>
      <input
        id='myInput'
        value={value}
        type='text'
        onClick={(e) => setCursorIndex(e)}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => setCursorIndex(e)}
        onKeyDown={(e) => pushedDown(e)}
        style={{minWidth: '300px'}}
      />
    </>
  );
}

export default App;

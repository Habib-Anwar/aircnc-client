import { DateRange } from 'react-date-range'



const DatePicker = ({selectionRange, handleSelect}) => {
  return (
    <DateRange
      rangeColors={['#F43F5E']}
      ranges={[selectionRange]}
      onChange={handleSelect}
      date={new Date()}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
    />
  )
}

export default DatePicker
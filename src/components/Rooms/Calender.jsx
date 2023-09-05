import { DateRange } from 'react-date-range'



const DatePicker = ({value, handleSelect}) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={value}
      onChange={handleSelect}
      date={new Date()}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
    />
  )
}

export default DatePicker
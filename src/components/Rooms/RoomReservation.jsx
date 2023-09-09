// ChatGPT code
import { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import Button from '../Button/Button';
import { AuthContext } from '../../providers/AuthProvider.jsx';
import { formatDistance } from 'date-fns';
import BookingModal from '../Modal/BookingModal';
import { addBooking, updateStatus } from '../../api/bookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DatePicker from './DatePicker';


const RoomReservation = ({ roomData }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const closeModal = () => {
    setIsOpen(false);
  };
  
  const { user, role } = useContext(AuthContext);

  // Price Calculation
  const totalPrice =
    parseFloat(
      formatDistance(new Date(roomData.to), new Date(roomData.from)).split(' ')[0]
    ) * roomData.price;

    const [selectionRange, setSelectionRange] = useState({
      startDate: new Date(roomData?.from),
      endDate: new Date(roomData?.to),
      key: 'selection',
    });

  // Booking state
  const [bookingInfo, setBookingInfo] = useState({
    guest: { name: user.displayName, email: user.email, image: user.photoURL },
    host: roomData.host.email,
    location: roomData.location,
    price: totalPrice,
    to: selectionRange.endDate,
    from: selectionRange.startDate,
    title: roomData.title,
    roomId: roomData._id,
    image: roomData.image,
  });

  const handleSelect = (ranges) => {
    // Update the selectionRange state with the new range
    setSelectionRange({ ...ranges.selection });
  };

  const modalHandler = () => {
    addBooking(bookingInfo)
      .then((data) => {
        console.log(data);
        updateStatus(roomData._id, true)
          .then((updateData) => {
            console.log(updateData);
            toast.success('Booking Successful!');
            navigate('/dashboard/my-bookings');
            closeModal();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {roomData.price}</div>
        <div className='font-light text-neutral-600'>night</div>
      </div>
      <hr />
      <div className='flex justify-center'>
        {/* Corrected the component name to 'Calendar' */}
        <DatePicker handleSelect={handleSelect} selectionRange={selectionRange}></DatePicker>
      </div>
      <hr />
      <div className='p-4'>
        <Button
          onClick={() => setIsOpen(true)}
          disabled={roomData.host.email === user.email || roomData.booked}
          label='Reserve'
        />
      </div>
      <hr />
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
      <BookingModal
        modalHandler={modalHandler}
        bookingInfo={bookingInfo}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default RoomReservation;























// Atik Vai code

// import { useContext, useState } from 'react'
// import Calender from '../Rooms/Calender'
// import Button from '../Button/Button'
// import { AuthContext } from '../../providers/AuthProvider.jsx'
// import { formatDistance } from 'date-fns'
// import BookingModal from '../Modal/BookingModal'
// import { addBooking, updateStatus } from '../../api/bookings'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// const RoomReservation = ({ roomData }) => {
//   const navigate = useNavigate()
//   const [isOpen, setIsOpen] = useState(false)
//   const closeModal = () => {
//     setIsOpen(false)
//   }
//   const { user, role } = useContext(AuthContext)

//   // Price Calculation
//   const totalPrice =
//     parseFloat(
//       formatDistance(new Date(roomData.to), new Date(roomData.from)).split(
//         ' '
//       )[0]
//     ) * roomData.price

//   const [value, setValue] = useState({
//     startDate: new Date(roomData?.from),
//     endDate: new Date(roomData?.to),
//     key: 'selection',
//   })

//   // Booking state
//   const [bookingInfo, setBookingInfo] = useState({
//     guest: { name: user.displayName, email: user.email, image: user.photoURL },
//     host: roomData.host.email,
//     location: roomData.location,
//     price: totalPrice,
//     to: value.endDate,
//     from: value.startDate,
//     title: roomData.title,
//     roomId: roomData._id,
//     image: roomData.image,
//   })
//   const handleSelect = ranges => {
//     setValue({ ...value })
//   }

//   const modalHandler = () => {
//     addBooking(bookingInfo)
//       .then(data => {
//         console.log(data)
//         updateStatus(roomData._id, true)
//           .then(data => {
//             console.log(data)
//             toast.success('Booking Successful!')
//             navigate('/dashboard/my-bookings')
//             closeModal()
//           })
//           .catch(err => console.log(err))
//       })
//       .catch(err => console.log(err))
//   }

//   return (
//     <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
//       <div className='flex flex-row items-center gap-1 p-4'>
//         <div className='text-2xl font-semibold'>$ {roomData.price}</div>
//         <div className='font-light text-neutral-600'>night</div>
//       </div>
//       <hr />
//       <div className='flex justify-center'>
//         <Calender handleSelect={handleSelect} value={value} />
//       </div>

//       <hr />
//       <div className='p-4'>
//         <Button
//           onClick={() => setIsOpen(true)}
//           disabled={roomData.host.email === user.email || roomData.booked}
//           label='Reserve'
//         />
//       </div>
//       <hr />
//       <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
//         <div>Total</div>
//         <div>$ {totalPrice}</div>
//       </div>

//       <BookingModal
//         modalHandler={modalHandler}
//         bookingInfo={bookingInfo}
//         isOpen={isOpen}
//         closeModal={closeModal}
//       />
//     </div>
//   )
// }

// export default RoomReservation













// My code

// import Calender from '../Rooms/Calender'
// import Button from '../Button/Button'
// import { useContext, useState } from 'react';
// import { AuthContext} from '../../providers/AuthProvider'
// import BookingModal from '../Modal/BookingModal';
// import { formatDistance } from 'date-fns'

// const RoomReservation = ({roomData}) => {
//     const { user, role} = useContext(AuthContext);
//     const [isOpen, setIsOpen] = useState(false);

//     // Price Calculation
//     const totalPrice = 
//     parseFloat(formatDistance (new Date (roomData.to), new Date(roomData.from))
//         .split(' ')[0]) * roomData.price
    
//         const [value, setValue] = useState({
//             startDate : new Date(roomData?.from),
//             endDate : new Date(roomData?.to),
//             key : 'selection',
//         })

//     // Booking State
//     const [bookingInfo, setBookingInfo] = useState({
//         guest:{name:user.displayName, email:user.email, image:user.photoURL},
//         host: roomData.host.email,
//         location: roomData.location,
//         price: totalPrice,
//         to: value.endDate,
//         from: value.startDate,
//     })
//     const handleSelect = ranges =>{
//         setValue({...value})
//     }
//     return (
//         <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
//             <div className="flex flex-row items-center gap-1 p-4">
//                 <div className="text-2xl font-semibold">$ {roomData.price}</div>
//                 <div className="font-light text-neutral-600">night</div>
//             </div>
//             <hr />
//             <div className='text-center'>

//             <Calender value={value}></Calender>
//             </div>
//             <hr />
//             <div className='p-4'><Button onClick={() =>{isOpen()}} disabled={roomData.host.email === user.email} label="Reserve"></Button></div>
//             <hr />
//             <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
//              <div>Total</div>
//              <div>$ {totalPrice}</div>
//             </div>
//             {/* <BookingModal isOpen={isOpen}></BookingModal> */}
//         </div>
//     );
// };

// export default RoomReservation;
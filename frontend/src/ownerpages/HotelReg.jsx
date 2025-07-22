// import React, { useState } from 'react';
// import bgImage from '@/assets/bg.png'; // adjust path to your assets

// const HotelReg = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     contact: '',
//     address: '',
//     city: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Registered hotel:", formData);
//     // TODO: Hook to backend here
//     onClose(); // Close the popup
//   };

//   return (
//     <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
//       <form onSubmit={handleSubmit} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
//         {/* Left Side Image */}
//         <img
//           src={bgImage}
//           alt='reg-image'
//           className='w-1/2 rounded-xl hidden md:block'
//         />

//         {/* Right Side Form */}
//         <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
//           <button
//   type="button"
//   onClick={onClose}
//   className="absolute top-4 right-4 text-gray-500 hover:text-black"
//   aria-label="Close"
// >
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//     viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//   </svg>
// </button>

//           <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

//           {/* Hotel Name */}
//           <div className='w-full mt-4'>
//             <label htmlFor='name' className='font-medium text-gray-500'>
//               Hotel Name
//             </label>
//             <input
//               type='text'
//               id='name'
//               name='name'
//               placeholder='Type here'
//               value={formData.name}
//               onChange={handleChange}
//               className='w-full border px-3 py-2 mt-1 rounded outline-none focus:ring-2 focus:ring-blue-500'
//               required
//             />
//           </div>

//           {/* Phone */}
//           <div className='w-full mt-4'>
//             <label htmlFor='phone' className='font-medium text-gray-500'>
//               Contact
//             </label>
//             <input
//               type='text'
//               id='phone'
//               name='phone'
//               placeholder='Type here'
//               value={formData.contact}
//               onChange={handleChange}
//               className='w-full border px-3 py-2 mt-1 rounded outline-none focus:ring-2 focus:ring-blue-500'
//               required
//             />
//           </div>

//           {/* Address */}
//           <div className='w-full mt-4'>
//             <label htmlFor='address' className='font-medium text-gray-500'>
//               Address
//             </label>
//             <input
//               type='text'
//               id='address'
//               name='address'
//               placeholder='Type here'
//               value={formData.address}
//               onChange={handleChange}
//               className='w-full border px-3 py-2 mt-1 rounded outline-none focus:ring-2 focus:ring-blue-500'
//               required
//             />
//           </div>

//           {/* City Dropdown */}
//           <div className='w-full mt-4'>
//             <label htmlFor='city' className='font-medium text-gray-500'>
//               City
//             </label>
//             <select
//               id='city'
//               name='city'
//               value={formData.city}
//               onChange={handleChange}
//               className='w-full border px-3 py-2 mt-1 rounded bg-white outline-none focus:ring-2 focus:ring-blue-500'
//               required
//             >
//               <option value='' disabled>Select City</option>
//               <option value='Delhi'>Delhi</option>
//               <option value='Mumbai'>Mumbai</option>
//               <option value='Bangalore'>Bangalore</option>
//               <option value='Chennai'>Chennai</option>
//               <option value='Kolkata'>Kolkata</option>
//             </select>
//           </div>

//           {/* Submit */}
//           <button
//             type='submit'
//             className='mt-6 w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700 transition'
//           >
//             Register
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default HotelReg;





import React, { useState } from 'react';
import bgImage from '@/assets/bg.png';
import axios from 'axios';
import { toast } from 'sonner';
import { HOTEL_API_END_POINT } from '@/utils/constant';

const HotelReg = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    city: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        `${HOTEL_API_END_POINT}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || 'Hotel registered successfully');
        onClose(); // Close the modal after success
      } else {
        toast.error(res.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error("Hotel registration failed:", error);
      toast.error(error?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
      <form onSubmit={handleSubmit} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
        {/* Left Side Image */}
        <img
          src={bgImage}
          alt='reg-image'
          className='w-1/2 rounded-xl hidden md:block'
        />

        {/* Right Side Form */}
        <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
          {/* Close Button */}
          <button
            type='button'
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-500 hover:text-black'
            aria-label='Close'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>

          <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

          {/* Hotel Name */}
          <div className='w-full mt-4'>
            <label htmlFor='name' className='font-medium text-gray-500'>Hotel Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Type here'
              className='w-full border px-3 py-2 mt-1 rounded outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Contact */}
          <div className='w-full mt-4'>
            <label htmlFor='contact' className='font-medium text-gray-500'>Contact</label>
            <input
              type='text'
              id='contact'
              name='contact'
              value={formData.contact}
              onChange={handleChange}
              placeholder='Type here'
              className='w-full border px-3 py-2 mt-1 rounded outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Address */}
          <div className='w-full mt-4'>
            <label htmlFor='address' className='font-medium text-gray-500'>Address</label>
            <input
              type='text'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              placeholder='Type here'
              className='w-full border px-3 py-2 mt-1 rounded outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* City */}
          <div className='w-full mt-4'>
            <label htmlFor='city' className='font-medium text-gray-500'>City</label>
            <select
              id='city'
              name='city'
              value={formData.city}
              onChange={handleChange}
              className='w-full border px-3 py-2 mt-1 rounded bg-white outline-none focus:ring-2 focus:ring-blue-500'
              required
            >
              <option value='' disabled>Select City</option>
              <option value='Delhi'>Delhi</option>
              <option value='Mumbai'>Mumbai</option>
              <option value='Bangalore'>Bangalore</option>
              <option value='Chennai'>Chennai</option>
              <option value='Kolkata'>Kolkata</option>
              <option value='Hyderabad'>Hyderabad</option>
              <option value='Noida'>Noida</option>
              <option value='Pune'>Pune</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className={`mt-6 w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;



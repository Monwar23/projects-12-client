import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DetailsModal = ({ setIsEditModalOpen, isOpen, pet, user }) => {
  const axiosSecure=useAxiosSecures()
  const navigate=useNavigate()

  const handleAdopt = async e => {
    e.preventDefault()
    const form=e.target
    const pet_name=pet.pet_name
    const pet_image_url=pet.pet_image_url
    const cartIds=pet._id
    const name=user?.displayName
    const email=pet.email
    const requestedEmail=user?.email
    const phone_number=form.phone_number.value
    const address=form.address.value
    const status ='pending'

    const info={pet_name,pet_image_url,cartIds,name,email,requestedEmail,phone_number,address,status}
    try{
      const petRes = await axiosSecure.post('/adopt', info)
        if (petRes.data.insertedId) {
            // reset()
            navigate('/petListing')
           toast.success(`Adopt request sent successfully.`)
        }
    }
    catch(error){
      toast.error(error.message)
    }
  }
 

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsEditModalOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-xl font-medium text-center leading-6 text-pink-500'
                >
                  {pet.pet_name}
                </DialogTitle>
                <div className='mt-2 w-full'>
                  <form onSubmit={handleAdopt} className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'></label>
                      <img src={pet.pet_image_url} alt={pet.pet_name} className='mt-1 block w-full h-72 rounded-md border-gray-300 shadow-sm' />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Pet Id</label>
                      <input
                        type='text'
                        value={pet._id}
                        disabled
                        className='mt-1 p-2 block w-full rounded-md border border-pink-500 shadow-sm  focus:border-pink-500 focus:ring-pink-500 sm:text-sm'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Pet Name</label>
                      <input
                        type='text'
                        value={pet.pet_name}
                        disabled
                        className='mt-1 block p-2 w-full rounded-md border border-pink-500 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>User Name</label>
                      <input
                        type='text'
                        value={user?.displayName}
                        disabled
                        className='mt-1 block p-2 w-full rounded-md border border-pink-500 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Email</label>
                      <input
                        type='email'
                        value={user?.email}
                        disabled
                        className='mt-1 block p-2 w-full rounded-md border border-pink-500 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 '>Phone Number</label>
                      <input
                        type='number' name="phone_number" required
                        className='mt-1 p-2 block w-full rounded-md border border-pink-500 focus:outline-pink-500 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Address</label>
                      <input
                        type='text' name="address" required
                        className='mt-1 p-2 block w-full rounded-md border border-pink-500 shadow-sm focus:border-pink-500 focus:ring-pink-500 focus:outline-pink-500 sm:text-sm'
                      />
                    </div>
                    <div className='mt-4 flex justify-center'>
                      <button
                        type='submit'
                        className='btn btn-outline  border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none'
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                </div>
                <hr className='mt-8 ' />
                <div className='mt-2 flex justify-center'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-pink-500 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DetailsModal;

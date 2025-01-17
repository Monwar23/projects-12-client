import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Fragment } from 'react';
import CheckOutForm from './CheckOutForm';

const DonationModal = ({isOpen,setIsEditModalOpen,pet,user}) => {

    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

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

                  <Elements stripe={stripePromise}>
                    <CheckOutForm pet={pet} user={user} setIsEditModalOpen={setIsEditModalOpen} ></CheckOutForm>
                  </Elements>

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

export default DonationModal;
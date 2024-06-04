import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckOutForm = ({ pet, user, setIsEditModalOpen }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [donatedAmount, setDonatedAmount] = useState(0); 
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecures();
    const navigate = useNavigate();

    useEffect(() => {
        if (donatedAmount > 0) {
            axiosSecure.post('/create-payment-intent', { price: donatedAmount })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, donatedAmount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error');
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // Save the payment in the database
                const payment = {
                    email: user.email,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    cartIds: pet._id,
                    pet_name: pet.pet_name,
                    pet_Image_url: pet.pet_image_url,
                    donated_amount: donatedAmount,
                };

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                if (res.data?.paymentResult?.insertedId) {
                    toast.success('Payment Successful');
                    setIsEditModalOpen(false); 
                    navigate('/donationCampaigns'); 
                    setDonatedAmount(0);
                    setError('');
                    setTransactionId('');
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-6">
                <label htmlFor="donatedAmount" className="block text-gray-700">Donated Amount</label>
                <input
                    id="donatedAmount"
                    type="number"
                    value={donatedAmount}
                    onChange={(e) => setDonatedAmount(parseFloat(e.target.value))}
                    className="mt-1 block w-full border p-1 rounded-md shadow-sm sm:text-sm
                    focus:border-pink-500 border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
            </div>
            <div className="mb-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4 flex justify-center">
                <button 
                    className="btn btn-outline rounded-2xl border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;

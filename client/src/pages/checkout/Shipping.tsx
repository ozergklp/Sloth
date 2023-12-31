
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ICartItem } from '../../types/type';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setAddressValues } from '../../redux/features/addressSlice';

const stripeKey = process.env.STRIPE_PUBLIC_KEY ?? 'bla bla';
const stripePromise = loadStripe(stripeKey);


export default function Shipping() {
    const CartItems = useSelector((state : RootState) => state.CartItems.cartItems);
    const AddressValues = useSelector((state: RootState) => state.Address.addressValues);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if(AddressValues.email.length === 0){
            const localStorageAddressValues = JSON.parse(localStorage.getItem('addressFormValues') || '{}');
            if (!localStorageAddressValues.email ) navigate('/checkout');
            else dispatch(setAddressValues(localStorageAddressValues));
            
        }
    },[])
    const handleCheckout = async () => {
        const stripe = await stripePromise;

        try {
            const items = CartItems.map((cartItem: ICartItem) => ({
                name: cartItem.name,
                amount: cartItem.price , // Amount in cents
                quantity: cartItem.count,
            }));
            const response = await fetch('http://localhost:4000/api/create-checkout-session', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                amount: 1, // Amount in cents
                currency: 'usd',
                items: items,
                }),
            });

            const session = await response.json();

            if (stripe && session.id) {
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });
        
                if (result.error) {
                    console.error(result.error.message);
                }
                } else {
                console.error('Failed to create checkout session');
                }
            } catch (error) {
                console.error(error);
            }
        };
    return (
        <>
        <nav className='m-7 mb-4 text-lg font-semibold w-full '>
                <ul className='flex justify-center mr-12 text-xl'>
                    <li className='mx-2 cursor-pointer'>{` Information`}</li>{'>'}
                    <li className='mx-2 cursor-pointer font-bold underline '> {` Shipping`}</li>{'>'}
                    <li className='mx-2 cursor-pointer'> {` Payment`}</li>
                </ul>
                
            </nav>
            <section className='mx-auto w-9/12 flex justify-between text-xl pl-0 p-2 py-2 border-black border-2 rounded-lg mb-3'>
                <h3 className='flex-1 ml-3 '>{AddressValues.email}</h3>
                <h3 className='font-semibold w-1/3 overflow-hidden whitespace-nowrap overflow-ellipsis'>{AddressValues.address}</h3>
            </section>
            <section className='mx-auto w-9/12 flex justify-between text-xl pl-0 p-2 py-2 border-black border-2 rounded-lg mb-3'>
                <input type="checkbox"  className='w-14 accent-black'/>
                <h3 className='flex-1'>Free Shipping</h3>
                <h3 className='font-semibold'>Free</h3>
            </section>
            <button onClick={handleCheckout}
                className='hover:shadow-md hover:shadow-emerald-300 w-9/12 mx-auto p-2 py-1 bg-black text-white text-lg font-semibold rounded-xl '>
            Continue to payment</button>
            </>
    )
}

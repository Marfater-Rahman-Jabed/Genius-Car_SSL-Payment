import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, image, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const address = form.message.value;
        const currency = form.currency.value;


        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            address,
            currency

        }
        // console.log(order);
        // if(phone.length > 10){
        //     alert('Phone number should be 10 characters or longer')
        // }
        // else{

        // }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                window.location.replace(data.url)
            })
            .catch(er => console.error(er));


    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className="text-4xl text-center">You are about to order: <span className='text-orange-600 font-semibold'>{title}</span> </h2>
                <h4 className="text-3xl text-center mb-3">Price: <span className='text-orange-600 font-semibold'>{price}</span> Taka</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-2 '>
                    <div>
                        <img src={image} alt="" />
                    </div>
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
                            <div>
                                <input name="firstName" type="text" placeholder="First Name" className="input input-ghost w-full  input-bordered mb-2" />
                                <input name="lastName" type="text" placeholder="Last Name" className="input input-ghost w-full  input-bordered mb-2" />

                                <input name="phone" type="text" placeholder="Your Phone" className="input input-ghost w-full  input-bordered mb-2" required />
                                <input name="email" type="text" placeholder="Your email" defaultValue={user?.email} className="input input-ghost w-full  input-bordered mb-2" readOnly />
                            </div>

                            <div>
                                <select name='currency' className="select input input-ghost w-full  input-bordered mb-2 ">

                                    <option value='BDT'>BDT</option>
                                    <option value='USD'>USD</option>

                                </select>
                                <textarea name="message" className="textarea textarea-bordered h-24 w-full" placeholder="Your Address" required></textarea>
                            </div>


                        </div>
                        <input className='btn w-full' type="submit" value="Pay" />
                    </div>

                </div>

            </form>
        </div>
    );
};

export default Checkout;
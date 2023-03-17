import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const transectionId = query.get("transectionId")
    // console.log(transectionId)
    const [order, setOrder] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/orders/transection-id/${transectionId}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [transectionId])
    // console.log(order);
    return (
        <div>
            <h2 className='text-green-600 text-center'>Congratulationss!!!</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head*/}
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Product Name</th>
                            <th>TransectionId</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr >
                            <th>1</th>
                            <td>{order.serviceName}</td>
                            <td>{order.transectionId}</td>
                            <td className='text-green-600 font-semibold'>{order.paid === true ? 'paid' : "Unpaid"}</td>
                        </tr>


                    </tbody>
                </table>
                <div className='flex justify-end mb-2 '>
                    <button className='btn btn-primary w-24 print:hidden' onClick={() => window.print()}>Print</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
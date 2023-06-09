import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, serviceName, phone, customer, price, service, status, paid } = order;
    const [orderService, setOrderService] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data));
    }, [service])



    return (
        <tr>
            <th>
                {!paid && <label>
                    <button onClick={() => handleDelete(_id)} className='btn btn-ghost tooltip' data-tip="Delete">X</button>
                </label>}
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {
                                orderService?.image &&
                                <img src={orderService.image} alt="Avatar Tailwind CSS Component" />}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td>
            <td>Purple</td>
            <th>
                {paid === true ?
                    <span className='text-green-600'>paid</span>
                    :
                    <button
                        onClick={() => handleStatusUpdate(_id)}
                        className="btn btn-ghost btn-xs">pending
                    </button>}
            </th>
        </tr>
    );
};

export default OrderRow;
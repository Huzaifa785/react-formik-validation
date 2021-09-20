import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Products(props) {
    const [isLoading, setLoading] = useState(false)

    const [productList, setProductList] = useState([])
    useEffect(async () => {
        setLoading(true)
        let products = await axios.get("https://60f547872208920017f39fe8.mockapi.io/products")
        setLoading(false)
        setProductList([...products.data])
    }, [])

    let handleDelete = async (id) => {
        try {
            let confirm = window.confirm("Are you sure you want to delete?")
            if (confirm) {
                await axios.delete(`https://60f547872208920017f39fe8.mockapi.io/products/${id}`)
                let rowIndex = productList.findIndex(obj => obj.id === id)
                productList.splice(rowIndex, 1)
                setProductList([...productList])
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Products</h1>
                <Link to="/create-product" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Create Product</Link>
            </div>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Products Data</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <h3>Loading...</h3> :
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {
                                            productList.map((product) => {
                                                return <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>{product.productName}</td>
                                                    <td>${product.price}</td>
                                                    <td>{product.description}</td>
                                                    <td>
                                                        <Link to={`/edit-product/${product.id}`} className=" mt-1 btn btn-sm btn-primary mr-2">Edit</Link>
                                                        <button onClick={() => handleDelete(product.id)} className="btn btn-sm btn-danger mt-1">Delete</button>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Products
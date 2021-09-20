import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom"
import { useFormik } from 'formik'

function EditProduct(props) {

    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [isLoading, setLoading] = useState(false)
    const history = useHistory()

    const validate = (values) => {
        const errors = {}

        if (!values.productName) {
            errors.productName = "Required"
        }

        if (!values.price) {
            errors.price = "Required"
        }

        if (!values.description) {
            errors.description = "Required"
        } else if (values.description.length < 15) {
            errors.description = "Description must be at least 15 characters long..."
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            productName: "",
            price: "",
            description: ""
        },
        validate,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                await axios.put(`https://60f547872208920017f39fe8.mockapi.io/products/${props.match.params.id}`, values)
                setLoading(false)
                history.push("/products")
            } catch (error) {
                console.log(error);
            }
        }
    })

    useEffect(async () => {
        try {
            setLoading(true)
            let product = await axios.get(`https://60f547872208920017f39fe8.mockapi.io/products/${props.match.params.id}`)
            setLoading(false)
            formik.setFieldValue("productName", product.data.productName)
            formik.setFieldValue("price", product.data.price)
            formik.setFieldValue("description", product.data.description)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Edit Product</h1>
            </div>

            {
                isLoading ? <h3>Loading...</h3> :
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-div">
                            <div className="row">
                                <div className="col-lg-4">
                                    <label htmlFor="productName">Product Name:</label>
                                    <input type="text" className="form-control" id="productName" name="productName" onBlur={formik.handleBlur} value={formik.values.productName} onChange={formik.handleChange} autoComplete="off" />
                                    {formik.errors.productName ? <div style={{ color: "crimson" }}>{formik.touched.productName && formik.errors.productName}</div> : null}
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="price">Price:</label>
                                    <input type="text" className="form-control" id="price" name="price" onBlur={formik.handleBlur} value={formik.values.price} onChange={formik.handleChange} autoComplete="off" />
                                    {formik.errors.price ? <div style={{ color: "crimson" }}>{formik.touched.price && formik.errors.price}</div> : null}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-lg-8">
                                    <label htmlFor="description">Description:</label>
                                    <textarea rows='3' cols='3' className="form-control" id="description" name="description" onBlur={formik.handleBlur} value={formik.values.description} onChange={formik.handleChange} autoComplete="off" />
                                    {formik.errors.description ? <div style={{ color: "crimson" }}>{formik.touched.description && formik.errors.description}</div> : null}
                                </div>
                            </div>
                            <div className="row mt-3 ml-1">
                                <input type="submit" className="btn btn-primary" value="Update" disabled={isLoading} />
                            </div>
                        </div>
                    </form>
            }
        </>
    )
}

export default EditProduct

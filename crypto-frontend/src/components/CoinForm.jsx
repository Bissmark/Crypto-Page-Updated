import { useState } from "react"

const CoinForm = ({ handleCreateCoin }) => {
    // Define state for the form data
    const [formData, setFormData] = useState({
        name: '',
        price: ''
    })

    // handleChange function
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    // handleSubmit function
    const handleSubmit = (event) => {
        event.preventDefault()
        handleCreateCoin(formData)
        setFormData({
            name: '',
            price: ''
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='name'
            />
            <input
                type='text'
                name='price'
                value={formData.price}
                onChange={handleChange}
                placeholder='price'
            />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default CoinForm
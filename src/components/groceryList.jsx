import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchGroceryList } from '../actions';
import './groceryList.css';

const BASE_URL = 'http://localhost:3000';

const GroceryList = () => {
    const [groceryList, setGroceryList] = useState([]);
    const [customItem, setCustomItem] = useState('');

    const fetchData = async () => {
        try {
            console.log('Fetching grocery list data');
            const combinedList = await fetchGroceryList();
            console.log(combinedList);
            setGroceryList(combinedList);
        } catch (error) {
            console.error('Error fetching grocery list:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCustomItemChange = (event) => {
        setCustomItem(event.target.value);
    };

    const handleAddCustomItem = async () => {
        if (customItem.trim() !== '') {
            try {
                await axios.post(
                    `${BASE_URL}/groceries/custom-item`,
                    { customItem },
                    { withCredentials: true }
                );
                setCustomItem('');
                const combinedList = await fetchGroceryList();
                setGroceryList(combinedList);
            } catch (error) {
                console.error('Error adding custom item:', error);
            }
        }
    }

    const handleDeleteItem = async (itemName) => {
        try {
            await axios.delete(`${BASE_URL}/groceries/item/${itemName}`);
            const combinedList = await fetchGroceryList();
            setGroceryList(combinedList);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="grocery-container">
            <h2 className="grocery-heading">Grocery List</h2>
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Add custom item"
                    value={customItem}
                    onChange={handleCustomItemChange}
                    className="custom-item-input"
                />
                <button className="add-button" onClick={handleAddCustomItem}>Add</button>
            </div>
            {groceryList.length > 0 ? (
                <ul className="grocery-list">
                    {groceryList.map((item, index) => (
                        <li key={index} className="grocery-item">
                            {item}{' '}
                            <button className="delete-button" onClick={() => handleDeleteItem(item)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty-list-message">There is nothing on your list!</p>
            )}
        </div>
    );
};

export default GroceryList;


import { useState, useEffect } from 'react';
import axios from 'axios';


const BASE_URL = 'http://localhost:3000';

const GroceryList = () => {
    const [groceryList, setGroceryList] = useState([]);
    const [customItem, setCustomItem] = useState('');
    const [ user, setUser] = useState('');

    const fetchGroceryList = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/groceries`, { withCredentials: true });

            if (response.data) {
                setUser(response.data.user._id)

                const combinedList = [...response.data.likedRecipeIngredients, ...response.data.customItems];

                setGroceryList(combinedList);
            } else {
                setGroceryList([]);
            }
        } catch (error) {
            console.error('Error fetching grocery list:', error);
        }
    };

    useEffect(() => {
        fetchGroceryList();
    }, []);

    const handleCustomItemChange = (event) => {
        setCustomItem(event.target.value);
    };

    const handleAddCustomItem = async () => {
        try {
            await axios.post(
                `${BASE_URL}/groceries/custom-item`,
                { customItem },
                { withCredentials: true }
            );
            setCustomItem('');
            fetchGroceryList(); 
        } catch (error) {
            console.error('Error adding custom item:', error);
        }
    };

    const handleDeleteItem = async (itemName) => {
        try {
            await axios.delete(`${BASE_URL}/groceries/item/${itemName}`);
            fetchGroceryList();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            <h2>Grocery List</h2>
            {groceryList.length > 0 ? (
                <ul>
                    {groceryList.map((item, index) => (
                        <li key={index}>
                            {item}{' '}
                            <button onClick={() => handleDeleteItem(item)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>There is nothing on your list!</p>
            )}
            <div>
                <input
                    type="text"
                    placeholder="Add custom item"
                    value={customItem}
                    onChange={handleCustomItemChange}
                />
                <button onClick={handleAddCustomItem}>Add</button>
            </div>
        </div>
    );
};

export default GroceryList;

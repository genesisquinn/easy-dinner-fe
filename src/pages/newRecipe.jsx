import { useState } from 'react';
import axios from 'axios';
import ImagePreview from '../components/imagePreview';
import Navigation from '../components/navigationBar';
import { BASE_URL } from '../actions';


const RecipeForm = () => {
    const [infoSubmitObj, setInfoSubmitObj] = useState('');
    const [infoErrorsObj, setInfoErrorsObj] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0])
    }

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.name.value.trim();
        const instructions = event.target.instructions.value.trim();
        const source = event.target.source.value.trim();

        if (name === '' || instructions === '' || source === '' || ingredients.every(ingredient => ingredient.trim() === '')) {
            setInfoSubmitObj('');
            setInfoErrorsObj([{ message: 'Please fill in all fields.' }]);
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('source', source);
        formData.append('instructions', instructions);
        ingredients.forEach((ingredient) => {
            if (ingredient.trim() !== '') {
                formData.append('ingredients', ingredient);
            }
        });
        formData.append('category', event.target.category.value);
        formData.append('image', imageFile);

        try {
            console.log(formData);
            await axios.post(`${BASE_URL}/recipes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            setInfoSubmitObj('Recipe submitted successfully!');
            setInfoErrorsObj('');
            event.target.name.value = '';
            event.target.instructions.value = '';
            event.target.source.value = '';
            setIngredients(['']);
            setImageFile(null);
            event.target.querySelector('input[type="file"]').value = null;
            event.target.querySelector('select[name="category"]').value = '';

        } catch (error) {
            setInfoSubmitObj('');
            setInfoErrorsObj([{ message: 'Oops! Something went wrong.' }]);
        }
    }


    return (
        <>
            <Navigation />
            <div className='px-4 py-5 my-5 text-center'>
                <h1 className='display-5 fw-bold'>Submit Your Recipe</h1>
                <div className='col-lg-6 mx-auto'>
                    <p className='lead'> Dinner does not have to be complicated. Need ideas? Take the hassle out of dinner. Share your favorite recipes to get started. </p>
                </div>
            </div>

            <div className='row justify-content-center'>

                {infoSubmitObj && (
                    <div className='col-8 alert alert-success' role='alert'>
                        {infoSubmitObj}
                    </div>
                )}

                {infoErrorsObj && (
                    <div className='col-8 alert alert-danger' role='alert'>
                        {infoErrorsObj[0].message}
                    </div>
                )}

                <div className='col-8'>
                    <form onSubmit={handleFormSubmit}>

                        <div className='row g-3'>

                            <div className='col-12'>
                                <label htmlFor='name' className='form-label'>Recipe Name</label>
                                <input type='text' name='name' id='name' className='form-control' required />
                            </div>

                            <div className='col-12'>
                                <label htmlFor='instructions' className='form-label'>Instructions</label>
                                <textarea name='instructions' id='instructions' className='form-control' cols='30' rows='4'></textarea>
                            </div>

                            <div className='col-12'>
                                <label htmlFor='name' className='form-label'>Ingredients</label><br />
                                <small>Example: 2 cups sugar</small>
                                <div className='ingredientList'>
                                    {ingredients.map((ingredient, index) => (
                                        <div key={index} className='ingredientDiv mb-1'>
                                            <input
                                                type='text'
                                                name='ingredients'
                                                className='form-control'
                                                value={ingredient}
                                                onChange={(event) => handleIngredientChange(index, event.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='col-12'>
                                <button type='button' className='btn btn-outline-primary' onClick={handleAddIngredient}>+ Ingredient</button>
                            </div>

                            <div className='col-12'>
                                <label htmlFor='category'>Select Category</label>
                                <select className='form-select form-control' name='category' aria-label='Category' defaultValue=''>
                                    <option value='' disabled>Select Category</option>
                                    <option value='Asian'>Asian</option>
                                    <option value='American'>American</option>
                                    <option value='Italian'>Italian</option>
                                    <option value='Caribbean'>Caribbean</option>
                                    <option value='Salads'>Salads</option>
                                </select>
                            </div>

                            <div className='col-12'>
                                <label htmlFor='source' className='form-label'>Source</label>
                                <input type='text' name='source' id='source' className='form-control' required />
                            </div>

                            <div className='col-12'>
                                <label htmlFor='image'>Product Image</label>
                                <input type="file" className="form-control" name="image" accept="image/*" onChange={handleImageChange} />
                                <ImagePreview image={imageFile} />
                            </div>

                            <div className='col-12'>
                                <button type='submit' className='btn btn-primary'>Submit Recipe</button>
                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default RecipeForm;
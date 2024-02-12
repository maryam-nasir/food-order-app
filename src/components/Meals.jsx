import { useEffect } from 'react';
import MealItem from './MealItem';
import Error from './Error';
import API_CONSTANTS from '../constants/ApiConstants';
import useHttp from '../hooks/useHttp';

const Meals = () => {
    const { loading, data: meals, error, sendHttpRequest } = useHttp(`${API_CONSTANTS.BASE_API_URL}${API_CONSTANTS.MEALS}`, { method: 'GET' }, []);

    useEffect(() => {
        sendHttpRequest();
    }, []);

    if (loading) {
        return <p className='center'>Fetching meals...</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error.message} />
    }

    return (
        <ul id='meals'>
            {meals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
        </ul>
    );
};

export default Meals;
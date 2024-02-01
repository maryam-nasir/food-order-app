import Button from './UI/Button';
import API_CONSTANTS from '../constants/ApiConstants';
import { currencyFormatter } from '../utils/formatting';

const MealItem = ({ meal }) => {
    return (
        <li className='meal-item'>
            <article>
                <img src={`${API_CONSTANTS.BASE_API_URL}${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
                    <p className='meal-item-description'>{meal.description}</p>
                </div>
                <p className='meal-item-actions'>
                    <Button>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
};

export default MealItem;
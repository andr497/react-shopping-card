import Button from '@material-ui/core/Button';
//Types
import { CartItemType } from "../App";
//Styles
import { Wrapper } from './Item.style';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        <div className="contenedor-img">
            <img src={item.image} alt={item.title}/>
        </div>
        <div className="contenedor-info">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>
            + Add to cart
        </Button>
    </Wrapper>
);

export default Item;

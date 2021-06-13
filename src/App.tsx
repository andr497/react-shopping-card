import {useEffect, useState} from "react";
import {useQuery} from "react-query";
//Components
import Menu from "./Menu/Menu";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from '@material-ui/core/Badge';
//Styles
import { Wrapper } from './App.styles';
import {IconButton, MenuItem} from "@material-ui/core";
//Types
export type CartItemType = {
    id: number,
    category: string,
    description: string,
    image: string,
    price: number,
    title: string,
    amount: number
}

export type CategoryProductType = {
    category: string
}

const getCategories = async (): Promise<[]> => {
    return await (await fetch('https://fakestoreapi.com/products/categories')).json();
}

const getProducts = async (): Promise<CartItemType[]> => {
    return await (await fetch('https://fakestoreapi.com/products')).json();
}

const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);
    const products = useQuery<CartItemType[]>(
        'products',
        getProducts
    );
    const categories = useQuery<[]>(
        'categories',
        getCategories
    )

    const getTotalItems = (items: CartItemType[]) => {
        return items.reduce((acc: number, items: CartItemType) => acc + items.amount, 0);
    }

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            //1. Verificar si el item ya esta en el Cart
            const isItemInCart = prev.find(item => item.id === clickedItem.id);
            if(isItemInCart){
                return prev.map(item =>
                    item.id === clickedItem.id
                    ? {...item, amount: item.amount + 1}
                    : item
                );
            }
            //Primera vez que se agrega el item
            return [...prev, {...clickedItem, amount: 1}];
        });
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev =>
            prev.reduce((acc, item) => {
                if(item.id === id){
                    if(item.amount === 1) return acc;
                    return [...acc, {...item, amount: item.amount - 1}]
                } else {
                    return [...acc, item];
                }
            }, [] as CartItemType[]
            )
        );
    };

    const shoppingMenu = () => {
        return(
            <MenuItem onClick={() => setCartOpen(true)}>
                <IconButton color="inherit">
                    <Badge badgeContent={getTotalItems(cartItems)} color="error">
                        <AddShoppingCartIcon/>
                    </Badge>
                </IconButton>
            </MenuItem>
        );
    }

    console.log(products.isSuccess);

    useEffect(() => {
        //TODO funcion para agregar un porcentaje
    });

    if(products.isLoading) return <LinearProgress />
    if(products.error) return <div>Something went wrong...</div>

    if(categories.isLoading) return <LinearProgress/>

    console.log(categories.data);

    return (
        <>
            <Menu
                title="Shopping Cart"
                menuItems={categories.data}
                shoppingMenu={shoppingMenu()}
            />
            <Wrapper>
                <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                    <Cart
                        cartItems={cartItems}
                        addToCart={handleAddToCart}
                        removeFromCart={handleRemoveFromCart}
                    />
                </Drawer>
                <Grid container spacing={3}>
                    {
                        products.data?.map(item => (
                            <Grid item key={item.id} xs={12} sm={4}>
                                <Item item={item} handleAddToCart={handleAddToCart}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Wrapper>
        </>
    );
}

export default App;

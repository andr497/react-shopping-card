import {MenuItem, Toolbar, Typography} from "@material-ui/core";
import {StyledMenu} from "./Menu.styles";
import React from "react";
import {CategoryProductType} from "../App";
import {QueryObserverIdleResult} from "react-query";

type Props = {
    title: string;
    menuItems: [] | undefined;
    shoppingMenu: JSX.Element;
}

const Menu: React.FC<Props> = ({title, menuItems, shoppingMenu}) => {
    return(
        <StyledMenu position="sticky" >
            <Toolbar className="toolbar">
                <Typography variant="h6">
                    {title}
                </Typography>
                {
                    menuItems?.map((item: string, i: number) => (
                        <MenuItem key={i}>
                            {item}
                        </MenuItem>
                    ))
                }
                {shoppingMenu}
            </Toolbar>
        </StyledMenu>
    );
}

export default Menu;
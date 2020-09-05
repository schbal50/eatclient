import React, { useState, useEffect } from 'react'
import MenuItem from './MenuItem'
import MenuService from '../Services/MenuService';
import queryString from 'query-string';

export default function PublicMenu({ location }) {
    const [menu, setMenus] = useState([]);

    useEffect(() => {
        const { id } = queryString.parse(location.search)

        MenuService.getMenuById(id).then(data => {
            setMenus(data.menu)
        });

    }, []);

    return (
        <div>
            {menu.map(menuI => {
                return <MenuItem key={menuI._id} menuItem={menuI} />
            })}
        </div>
    )
}

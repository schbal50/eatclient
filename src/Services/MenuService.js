export default {
    getMenus: () => {
        return fetch('/user/menu').then(response => {
            if (response.status !== 401) {
                return response.json().then(data => data);
            }
            else return { message: { msgBody: "UnAuthorized" }, msgError: true };
        })
    },
    postMenu: menuItem => {
        return fetch('/user/menuItem', {
            method: "POST",
            body: JSON.stringify(menuItem),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 401) {
                return response.json().then(data => data);
            }
            else return { message: { msgBody: "UnAuthorized" }, msgError: true };
        })
    },
    getMenuById: (id) => {
        return fetch(`/menu/${id}`).then(response => { // `/menu/id?id=${id}`
            if (response.status !== 404) {
                return response.json().then(data => data);
            }
            else return { message: { msgBody: "404 Not Found" }, msgError: true };
        })
    },
    deleteMenuItemById: (id) => {
        return fetch(`/user/deleteMenuItem/${id}`, {
            method: "DELETE",
        }).then(response => {
            if (response.status !== 401) {
                return response.json().then(data => data);
            }
            else return { message: { msgBody: "UnAuthorized" }, msgError: true };
        })
    }
}
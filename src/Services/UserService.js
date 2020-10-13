export default {
    getUserDetails: () => {
        return fetch('/user/userDetails').then(response => {
            if (response.status !== 401) {
                return response.json().then(data => data);
            }
            else return { message: { msgBody: "UnAuthorized" }, msgError: true };
        })
    },
    updateUser: (menuItem) => {
        return fetch(`/user/updateUser`, {
            method: "PATCH",
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
    }
}
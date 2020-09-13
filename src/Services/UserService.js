export default{
    getUserById: (id) => {
        return fetch(`/user/${id}`).then(response => { // `/user/id?id=${id}`
            if (response.status !== 404) {
                return response.json().then(data => data);
            }
            else return { message: { msgBody: "404 Not Found" }, msgError: true };
        })
    },
    updateUserById: (id) => {
        return fetch(`/user/${id}`).then('/user/userItem', {
            method: "PATCH",
            body: JSON.stringify(userItem),
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
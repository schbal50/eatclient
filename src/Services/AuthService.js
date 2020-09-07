// Az api hívások ne legyenek benyomorítva a componentekbe. ezért vannak ide kiszervezve., Ezeket context apival fogjuk meghívni
export default {
    login: user => {
        return fetch('/user/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status !== 401) return res.json().then(data => data);
            else return { isAuthenticated: false, user: {username: "", is_staff: false }}
        })
    },
    register: user => {
        return fetch('/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },
    logout: () => {
        return fetch('/user/logout')
            .then(res => res.json())
            .then(data => data);
    },
    // amint beléptünk, a frontenden be állítiunk egy statet
    // hogy tudjuk, bevagyunk jelentkezve.
    // de amint bezárjuk az böngészőt a state megy a picsába.
    // Szóval ez arra van hogy össze scyncelje a kettőt
    isAuthenticated: () => { // context apival fogjuk hívni = az egy ilyen global state az apphoz
        return fetch('/user/authenticated')
            .then(res => {
                if (res.status !== 401) // Passport automatikusan küld egy 401-t ha nem vagyunk autholva
                { return res.json().then(data => data); }
                else { return { isAuthenticated: false, user: { username: "", is_staff: false } }; }
            })
    }
}
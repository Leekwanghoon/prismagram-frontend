//인증되는지 안되는지만 판단함
export const defaults = {
    isLoggedIn : Boolean(localStorage.getItem("token")) || false
}
export const resolvers = {
    Mutation: {
        logUserIn: (_, {token},{cache}) => {
            localStorage.setItem("token", token);
            cache.writeData({
                data: {
                    isLoggedIn: true
                }
            });
            return null;
        },
        logUserOut: (_, __, {cache}) => {
            localStorage.removeItem("token");
            window.location = "/";   //모든 캐시를 없애기를 원해
            return null;
        }
    }
};
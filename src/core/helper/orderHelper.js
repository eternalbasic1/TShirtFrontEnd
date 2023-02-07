import {API} from "../../backend"

export const createOrder = (userId, token, orderData) => {
    // console.log("THE orderdata is and token and userId ",  orderData);
    // console.log("THE userId", userId)
    // console.log("THE token is", token)
    
     return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : null
        },
        body: JSON.stringify({order: orderData})
    }).then(response => {
        return response.json();
        // console.log("the respose is ",response); // If you get any error in future uncomment this line and comment above line
    }).catch(err => console.log(err));
    
}
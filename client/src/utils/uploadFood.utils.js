import axios from "axios";

export const serverUrl = "http://localhost:3001";

export const uploadFood = async (input) => {
    //{{host}}/api/uploadFoods/uploadFood
    try {
        const {data} = await axios.post(`${serverUrl}/api/uploadFoods/uploadFood`, input, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                'x-refresh' : localStorage.getItem("refreshToken")
            }
        });
        console.log(data);
        return data;
    }
    catch (error) {
        return false;
    }
}

export const getAllFoods = async () => {
    // {{host}}/api/uploadFoods
    try {
        const {data} = await axios.get(`${serverUrl}/api/uploadFoods`)
        return data;
    }
    catch (error) {
        return null;
    }
}

export const deleteFood = async (id) => {
    //{{host}}/api/uploadFoods/{{uploadFoodId}}
    try {
        const {data} = await axios.delete(`${serverUrl}/api/uploadFoods/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                'x-refresh' : localStorage.getItem("refreshToken")
            }
        });
        return data;
    }
    catch (error) {
        return false;
    }
}

export const searchFood = async (query) => {
    //{{host}}/api/uploadFoods/{{query}}
    try {
        const {data} = await axios.get(`${serverUrl}/api/uploadFoods/${query}`)
        return data;
    }
    catch (error) {
        return null;
    }
}
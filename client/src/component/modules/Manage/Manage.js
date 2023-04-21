import { useEffect } from "react"
import { useState } from "react"
import { getAllFoods } from "../../../utils/uploadFood.utils"
import FoodItem from "./FoodItem"
import styles from './styles.css';

function Manage() {
    const [foods, setFoods] = useState([])
    useEffect(() => {
        getAllFoods().then((res) => {
            if (res) {
                setFoods(res);
            }
        })
    }, [])

    return (
        <>
            <h3 className="text-center">
                Quản lý món ăn
            </h3>
            <div className="foodManager">
                {
                    foods.map((food) => {
                        return <FoodItem food={food} key = {food.id}/>
                    })
                }
            </div></>
    )
}

export default Manage
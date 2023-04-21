import React, { useEffect, useState } from "react";

import { FoodItem } from "../Cart/Item";
import './Menu.css'
import { FoodState } from "../../../context/FoodContext";

export default function MenuFood() {
    const { food } = FoodState();
    const menuFood = food.filter(item => item.category === "Food");
    return (
        <div id="Food" className="menu">
            <h2>Đồ ăn</h2>

            <div className="menu-container">
                {menuFood.map((i) => FoodItem(i))}
            </div>
        </div>
    );
}

export function MenuDrink() {
    const { food } = FoodState();
    const menuDrink = food.filter(item => item.category === "Drink");
    return (
        <div id="Drink" className="menu">
            <h2>Đồ uống</h2>
            <div className="menu-container">
                {menuDrink.map((i) => FoodItem(i))}
            </div>
        </div>
    );
}

export function SearchMenu({ searchedFood }) {
    const menuFood = searchedFood.filter(item => item.category === "Food");
    const menuDrink = searchedFood.filter(item => item.category === "Drink");
    return (
        <>
            <div id="Food" className="menu">
                <h2>Đồ ăn</h2>

                <div className="menu-container">
                    {menuFood.map((i) => FoodItem(i))}
                </div>
            </div>
            <div id="Drink" className="menu">
                <h2>Đồ uống</h2>
                <div className="menu-container">
                    {menuDrink.map((i) => FoodItem(i))}
                </div>
            </div>
        </>
    )
}
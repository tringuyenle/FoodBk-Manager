import React, { useEffect, useState } from 'react';
// import { FoodItem } from '../../UI/Item';
import MenuFood, { MenuDrink, SearchMenu } from '../Menu/Menu';
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button";
import bunsbo from '../../../img/paper.png'
import './Home.css'
import { BsSearch } from 'react-icons/bs'
import { searchFood } from '../../../utils/uploadFood.utils';
export default function Home() {
    const [Food, setFood] = useState("food-type active")
    const [Drink, setDrink] = useState("food-type")
    const [query, setQuery] = useState("");
    const [searchedFood, setSearchedFood] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const onClickFood = () => {
        setDrink("food-type");
        setFood("food-type type-active")
    }
    const onClickDrink = () => {
        setDrink("food-type type-active");
        setFood("food-type")
    }
    const handleSearch = async (query) => {
        const result = await searchFood(query);
        setSearchedFood(result);
        setIsSearch(true);
    }
    return (
        <div id="home">
            <div className='wallpaper'>
                <img
                    src={bunsbo}
                    alt='bunsbo'
                    className='paper'
                />
                <div className='infor__section'>
                    <div>
                        <h3 className='text__bluesky. text__name_2'>Căn tin</h3>
                        <h1 className='text__name'>Trường Đại Học <span className='text__bluesky.'>Bách Khoa</span> - ĐHQG HCM</h1>
                        <h5 className='text_another'>Các món: Bánh mì & Xôi - Phở, Bún bò và nhiều món ngon khác nữa</h5>
                        <p><span className='opening__hours'>Giờ mở cửa</span> <span className='opening__hours hours'>Hôm nay 05:50 - 17:00</span></p>
                    </div>
                </div>
            </div>
            <ul className='food-type_tab'>
                <li className={Food} onClick={onClickFood}><a href="#Food">Đồ ăn</a></li>
                <li className={Drink} onClick={onClickDrink}><a href='#Drink'>Đồ uống</a></li>
                <div className='search-bar'>
                    {/* <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success"><BsSearch/></Button>
                    </Form> */}
                    <Form onSubmit = {(e) =>{
                        e.preventDefault();
                        e.stopPropagation();
                        handleSearch(query);
                    }}>
                    <InputGroup className="d-flex input__gr">
                        <Form.Control
                            type='search'
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            className='input__gr'
                            onChange={(event) => {
                                if(event.target.value === '') {
                                    setIsSearch(false);
                                }
                                setQuery(event.target.value)
                            }}
                        />
                        <Button variant="success" id="button-addon2" className='input__gr'>
                            <BsSearch />
                        </Button>
                    </InputGroup>
                    </Form>
                </div>
            </ul>
            <div className='home-container' id="menu-section">
                    {
                        !isSearch ?
                        <>
                            <MenuFood />
                            <MenuDrink />
                        </>
                        : 
                        <SearchMenu searchedFood = {searchedFood}/>
                    }
            </div>
        </div>
    );
}

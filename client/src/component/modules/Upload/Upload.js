import {memo, useState} from "react"
import clsx from "clsx"
// import axios from "axios"
// css and bootstrap
import styles from "./uploadFood.css"
import {Button, Form, Container, InputGroup} from "react-bootstrap"
import { uploadFood } from "../../../utils/uploadFood.utils"

function FoodForm() {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Food")
    const [averageRating, setAverageRating] = useState(5)
    const [image, setImage] = useState({})
    const [description, setDescription] = useState("")
    async function handleSubmit(event)
    {
        const form = event.currentTarget;
        // const a = new FormData();
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        const data = new FormData();
        data.append('title',title);
        data.append('price',price);
        data.append('category',category);
        data.append('rating',averageRating.toString());
        data.append('image',image.files[0]);
        data.append('description',description);

        const res = await uploadFood(data);
        //alert
        if(res)
        {
            alert("Upload success")
        }
        else {
            alert("Upload failed")
        }
    }

    return (
        <>  
            <Container>
                <section className={clsx("d-flex flex-column align-items-center p-3",styles.uploadFood_box)}>
                <Form className="w-100" onSubmit={(e)=>{e.preventDefault(); handleSubmit(e)}}>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tên món ăn :</Form.Label>
                        <Form.Control required type="text" placeholder="Tên món ăn" onChange={(e)=>{setTitle(e.target.value)}} />
                    </Form.Group>


                    <Form.Group className="position-relative mb-3">
                    <Form.Label>Loại:</Form.Label>
                    <Form.Select required aria-label="Default select example" onChange={(e)=>{setCategory(e.target.value)}}>
                    <option value="Food">Thức ăn</option>
                    <option value="Drink">Đồ uống</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Mô tả :</Form.Label>
                        <Form.Control required type="text" placeholder="Mô tả" onChange={(e)=>{setDescription(e.target.value)}} />
                    </Form.Group>

                    <Form.Group className="position-relative mb-3">
                        <Form.Label>Hình ảnh:</Form.Label>
                        <Form.Control
                        type="file"
                        required
                        name="file"
                        // @ts-ignore
                        onChange={(e)=>{setImage(()=>({files:e.target.files, img:URL.createObjectURL(e.target.files[0])}))}}
                        />
                    </Form.Group>
                    {image.img &&
                            <div className="d-flex w-100 mb-3 mt-3" style={{ height: 100 }}>
                                <img src={image.img} alt='img'/>
                            </div>
                    }
                    <fieldset className="starability-basic mb-3" onChange={(e)=>{setAverageRating(e.target.value)}}>
                    <legend>Đánh giá:</legend>
                    <input type="radio" id="first-rate1" name="rating" value="1" />
                    <label htmlFor="first-rate1" title="Terrible">1 star</label>
                    <input type="radio" id="first-rate2" name="rating" value="2" />
                    <label htmlFor="first-rate2" title="Not good">2 stars</label>
                    <input type="radio" id="first-rate3" name="rating" value="3" />
                    <label htmlFor="first-rate3" title="Average">3 stars</label>
                    <input type="radio" id="first-rate4" name="rating" value="4" />
                    <label htmlFor="first-rate4" title="Very good">4 stars</label>
                    <input type="radio" id="first-rate5" name="rating" value="5" />
                    <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                    </fieldset>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Giá:</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>đ</InputGroup.Text>
                            <Form.Control placeholder = "Giá"required type="number" aria-label="Amount (to the nearest dollar)" onChange={(e)=>{setPrice(e.target.value)}}/>
                        </InputGroup>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    Lưu món ăn
                    </Button>
                </Form>
                </section>

            </Container>
        </>
    )
}
export default memo(FoodForm)
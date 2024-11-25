import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import axios from "axios";
import {URL} from "../App";
// import ChatMessage from "./ChatMessage";
import OrderTracking from "./OrderTracking";


const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState([]);

  const loadData = async () => {
    try {
      let response = await axios.post(
        `${URL}/api/foods/fooddata`
      );
      // console.log("API response", response.data);
      const { category, foodData } = response.data;
      setFoodItem(foodData);
      setFoodCat(category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
      <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important " }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="/images/image1.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
                />
            </div>

            <div className="carousel-item">
              <img
                src="/images/image2.jfif"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>

            <div className="carousel-item">
              <img
                src="/images/images3.jfif"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div>
        <div>
      </div>
        {localStorage.getItem("token")?
          <OrderTracking/>
          : ""}
        <div className="container">
          {
          foodCat != [] ? (
            foodCat.map((category) => {
              return (
                <div className="row mb-3" >
                  <div key={category._id} className="fs-3 m-3">
                    {category.CategoryName}
                  </div>
                  <hr />
                  {foodItem != [] ? (
                    foodItem
                      .filter(
                          (item) => (item.CategoryName === category.CategoryName)
                        && (item.name.toLowerCase().includes(search.toLocaleString()))
                        ) 
                      .map((items) => {
                        return (
                          <div key={items._id} className="col-12 col-md-6 col-lg-3">
                            <Card foodItem={items}
                            options={items.options[0]}
                            >
                            </Card>
                            
                          </div>
                        );
                      })
                  ) : (
                    <div>"No such data"</div>
                    
                  )}
                </div>
                
              );
            })
          ) : (
            <div>no available data</div>
          )}
        </div>
        {/* <ChatMessage/> */}
        <div>
          <Footer />
        </div>
      </div>
      
    </div>
  );
};

export default Home;
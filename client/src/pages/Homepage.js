import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Cricket");
  const categories = [
    {
      name: "Cricket",
      imageUrl:
"https://th.bing.com/th/id/OIP.IJy5hEtU7R--OdinLAqyAwHaHa?rs=1&pid=ImgDetMain"    },
    {
      name: "Fitness",
      imageUrl: "https://clipart-library.com/data_images/107900.png",
    },
    {
      name: "Table Tennis",
      imageUrl:
        "https://cdn.pixabay.com/photo/2022/05/23/16/05/table-tennis-7216580_960_720.png",
    },
    {
      name: "Badminton",
      imageUrl:
        "https://clipart-library.com/images_k/badminton-transparent-background/badminton-transparent-background-10.png",
    },
    {
      name: "Football",
      imageUrl:
        "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/21494/football-clipart-xl.png",
    },
    {
      name: "Basketball",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Basketball_Clipart.svg/2048px-Basketball_Clipart.svg.png",
    },
    {
      name: "Tennis",
      imageUrl:
        "https://th.bing.com/th/id/R.2cade3f59510d92091e968a390f9195b?rik=7UIKuBtXrHwxZw&riu=http%3a%2f%2fallhdwallpapers.com%2fwp-content%2fuploads%2f2015%2f05%2fTennis-1.jpg&ehk=UQTkaQwBDG0uN3W1xxCInUGVmjKYb7%2brao97KoTzHCc%3d&risl=&pid=ImgRaw&r=0"
    },
    
  ];
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get(
          `http://localhost:8080/api/items/get-item`
          
        );
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h4 className="text-uppercase text-white">{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="40"
              width="60"
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <div>
              <ItemList key={item.id} item={item} />
            </div>
          ))}
      </div>
    </DefaultLayout>
  );
};

export default Homepage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Ingredients = ({ Ingrs, setIngrs }) => {
  const [selectType, setSelectType] = useState("");
  const [searchIngrs, setSearchIngrs] = useState("");
  const [showFPIngrs, setShowFPIngrs] = useState(false);
  const [NewIngr, setNewIngr] = useState({
    nom: "",
    type: "crue",
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [whenHaveSomeChange, setwhenHaveSomeChange] = useState(false);

  // Fetch ingredients from the server when the component mounts
  useEffect(() => {
    const getIngrs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/data");
        setIngrs(res.data.getData);
      } catch (error) {
        console.log(error);
      }
    };
    getIngrs();
  }, [whenHaveSomeChange]);

  const handleChangeIngr = (event) => {
    setNewIngr({
      ...NewIngr,
      [event.target.name]: +event.target.value
        ? +event.target.value
        : event.target.value,
    });
  };

  const addIngrs = async () => {
    try {
      const result = await axios.post("http://localhost:5000/add", NewIngr);
      alert(result.data.msg);
      setwhenHaveSomeChange(!whenHaveSomeChange);
      setNewIngr({
        nom: "",
        type: "crue",
        protein: 0,
        carbs: 0,
        fat: 0,
      });
      setShowFPIngrs(!showFPIngrs)
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        alert(
          "Please add all required data: nom, type, protein,carbs and fat."
        );
      }
    }
  };

  return (
    <>
      <div className="searchPart">
        <button onClick={() => setShowFPIngrs(!showFPIngrs)}>
          Add Ingredient
        </button>

        <select
          id="selectTypeCss"
          onChange={(e) => setSelectType(e.target.value)}
        >
          <option value="">All</option>
          <option value="crue">Crue</option>
          <option value="cuit">Cuit</option>
        </select>
        <input
          type="text"
          name="nom"
          placeholder="Search Ingredients"
          onChange={(e) => setSearchIngrs(e.target.value)}
        />
      </div>
      <div>
        {/* Form to add a new plat */}
        {showFPIngrs && (
          <div className="FormPlats">
            <input
              type="text"
              name="nom"
              placeholder="Nom de l'ingrediant"
              onChange={(e) => handleChangeIngr(e)}
            />
            <div className="taillePlats">
              <label>Selection de l'ingrediant:</label>
              <select
                name="type"
                id="selectTypeCss"
                onChange={(e) => handleChangeIngr(e)}
              >
                <option value="crue">crue</option>
                <option value="cuit">cuit</option>
              </select>
            </div>
            <input
              type="number"
              name="protein"
              placeholder="protein"
              onChange={(e) => handleChangeIngr(e)}
            />
            <input
              type="number"
              name="carbs"
              placeholder="carbs"
              onChange={(e) => handleChangeIngr(e)}
            />
            <input
              type="number"
              name="fat"
              placeholder="fat"
              onChange={(e) => handleChangeIngr(e)}
            />

            <button onClick={()=>addIngrs()} >Add</button>
          </div>
        )}
      </div>

      <div className="Ingrs">
        {Ingrs ? (
          Ingrs.filter((el) => {
            // Filter ingredients based on search term and selected type
            return (
              el.nom.toLowerCase().includes(searchIngrs.toLowerCase()) &&
              (!selectType || el.type === selectType)
            );
          }).map((ingr, index) => (
            <div key={index} className="Ingr">
              <h3>Nom: {ingr.nom}</h3>
              <p>Protein: {ingr.protein}</p>
              <p>Carbs: {ingr.carbs}</p>
              <p>Fat: {ingr.fat}</p>
              <p>Kcalories: {ingr.kcalories}</p>
              <p>Type: {ingr.type}</p>
              
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Ingredients;

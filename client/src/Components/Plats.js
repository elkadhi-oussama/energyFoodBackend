import React, { useEffect, useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";

const Plats = () => {
  //const navigate = useNavigate();
  const [showFPlat, setShowFPlat] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [plats, setPlats] = useState([]);
  const [changeWhenDelete, setChangeWhenDelete] = useState(false);
  // State to hold total nutritional values
  const [totals, setTotals] = useState({
    fat: 0,
    carbs: 0,
    protein: 0,
    kcalories: 0,
  });
  // Fetch the list of plats from the server
  useEffect(() => {
    const getNosPlats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/plat/dataplat");
        setPlats(data.getData);
      } catch (error) {
        console.log(error);
      }
    };
    getNosPlats();
  }, [changeWhenDelete]);

  // Delete a plat from the server
  const deletePlats = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/plat/${id}`);
      alert(data.msg);
      setChangeWhenDelete(!changeWhenDelete);
    } catch (error) {
      console.log(error);
    }
  };

  // State to manage the new plat form inputs
  const [newPlats, setNewPlats] = useState({
    nom: "",
    contenu: [],
    taille: "S",
    prix: 0,
  });

  // Handle changes in the new plat form inputs
  const handleChangePlats = (event) => {
    setNewPlats({
      ...newPlats,
      [event.target.name]: +event.target.value
        ? +event.target.value
        : event.target.value,
    });
  };

  // Update newPlats.contenu whenever selectedIngredients changes
  useEffect(() => {
    setNewPlats((prevPlats) => ({
      ...prevPlats,
      contenu: selectedIngredients,
    }));
  }, [selectedIngredients]);

  // Add a new plat to the server
  const addPlats = async () => {
    try {
      const result = await axios.post("http://localhost:5000/plat/addplat", {
        ...newPlats,
        total: totals,
      });
      alert(result.data.msg);
      setChangeWhenDelete(!changeWhenDelete);
      setNewPlats({
        nom: "",
        contenu: [],
        taille: "S",
        prix: 0,
      });
      setFilterIngr("");
      setSelectedIngredients([]);
      setTotals({
        fat: 0,
        carbs: 0,
        protein: 0,
        kcalories: 0,
      });
      setShowFPlat(false);
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        alert("Please add all required data: nom, taille, and prix.");
      }
    }
  };

  // Add an ingredient to the selected ingredients list
  const addIngrToPlats = (data, quantity) => {
    const condition =
      selectedIngredients.filter((el) => el.nom === data.nom).length > 0;
    if (!condition) {
      if (quantity) {
        if (data.nom !== "OEUF") {
          const newData = {
            ...data,
            fat: +((data.fat / 100) * quantity).toFixed(2),
            carbs: +((data.carbs / 100) * quantity).toFixed(2),
            protein: +((data.protein / 100) * quantity).toFixed(2),
            kcalories: +((data.kcalories / 100) * quantity).toFixed(2),
            quantity: quantity,
          };
          setTotals((prevTotals) => ({
            fat: +(prevTotals.fat + newData.fat).toFixed(2),
            carbs: +(prevTotals.carbs + newData.carbs).toFixed(2),
            protein: +(prevTotals.protein + newData.protein).toFixed(2),
            kcalories: +(prevTotals.kcalories + newData.kcalories).toFixed(2),
          }));
          setSelectedIngredients([...selectedIngredients, newData]);
          console.log("newData : ", newData);
        } else {
          const newData = {
            ...data,
            fat: +(data.fat * quantity).toFixed(2),
            carbs: +(data.carbs * quantity).toFixed(2),
            protein: +(data.protein * quantity).toFixed(2),
            kcalories: +(data.kcalories * quantity).toFixed(2),
            quantity: quantity,
          };
          setTotals((prevTotals) => ({
            fat: +(prevTotals.fat + newData.fat).toFixed(2),
            carbs: +(prevTotals.carbs + newData.carbs).toFixed(2),
            protein: +(prevTotals.protein + newData.protein).toFixed(2),
            kcalories: +(prevTotals.kcalories + newData.kcalories).toFixed(2),
          }));
          setSelectedIngredients([...selectedIngredients, newData]);
          console.log("newData : ", newData);
        }

        setQuantity(0);
      } else {
        const newData = {
          ...data,

          quantity: 100,
        };
        setTotals((prevTotals) => ({
          fat: +(prevTotals.fat + data.fat).toFixed(2),
          carbs: +(prevTotals.carbs + data.carbs).toFixed(2),
          protein: +(prevTotals.protein + data.protein).toFixed(2),
          kcalories: +(prevTotals.kcalories + data.kcalories).toFixed(2),
        }));

        setSelectedIngredients([...selectedIngredients, newData]);
        console.log("newData : ", newData);
      }
    }
  };

  // Remove an ingredient from the selected ingredients list
  const removeIngrFromPlats = (data) => {
    setSelectedIngredients(selectedIngredients.filter((ingr) => ingr !== data));
    setTotals((prevTotals) => ({
      fat: +(prevTotals.fat - data.fat).toFixed(2),
      carbs: +(prevTotals.carbs - data.carbs).toFixed(2),
      protein: +(prevTotals.protein - data.protein).toFixed(2),
      kcalories: +(prevTotals.kcalories - data.kcalories).toFixed(2),
    }));
  };

  // State to manage ingredient search and quantity inputs
  const [filterIngr, setFilterIngr] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  // Fetch the list of ingredients from the server
  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/data");
        setIngredients(res.data.getData);
      } catch (error) {
        console.log(error);
      }
    };
    getIngredients();
  }, []);

  return (
    <div>
      <h1>Nos Plats</h1>
      <div className="searchPart plats">
        <button onClick={() => setShowFPlat(!showFPlat)}>Add Plats</button>
      </div>
      <div>
        {/* Form to add a new plat */}
        {showFPlat && (
          <div className="FormPlats">
            <input
              type="text"
              name="nom"
              placeholder="Nom du Plat"
              onChange={handleChangePlats}
              value={newPlats.nom}
            />
            <div className="taillePlats">
              <label>Selection Taille du Plat:</label>
              <select
                name="taille"
                id="selectTypeCss"
                onChange={handleChangePlats}
                value={newPlats.taille}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
            <input
              type="number"
              name="prix"
              placeholder="Prix du Plat"
              onChange={handleChangePlats}
              value={newPlats.prix}
            />
            <span>SVP selection le contenu du plat</span>

            <div className="clearSearch">
              <input
                type="text"
                placeholder="Search Ingredients"
                onChange={(e) => setFilterIngr(e.target.value)}
                value={filterIngr}
              />
              <button onClick={() => setFilterIngr("")}>
                {" "}
                <img src="./images/del.png" alt="" />{" "}
              </button>
            </div>
            {filterIngr &&
              ingredients
                .filter((el) =>
                  el.nom.toLowerCase().includes(filterIngr.toLowerCase())
                )
                .map((item, index) => (
                  <div key={index} className="ingrFil">
                    <span>{item.nom}</span>
                    <input
                      type="number"
                      placeholder="Qte"
                      onChange={(e) => setQuantity(+e.target.value)}
                    />

                    <button onClick={() => addIngrToPlats(item, quantity)}>
                      Add to Plat
                    </button>
                  </div>
                ))}
            <button onClick={() => addPlats()}>Add</button>
          </div>
        )}
      </div>
      <div className="AllPlats">
        {plats.length > 0 ? (
          plats.map((plat, index) => (
            <div key={index} className="onePlat">
              <h3>Nom: {plat.nom}</h3>
              <h4>Contenu:</h4>
              {plat.contenu.length > 0 ? (
                plat.contenu.map((cont, i) => (
                  <div key={i}>
                    <span>{cont.nom}</span>
                    { cont.nom ==="OEUF" ? <span> {cont.quantity} P </span> : <span> {cont.quantity} G </span>  }
                  </div>
                ))
              ) : (
                <p className="oublier">Vous avez oublié le contenu du plat</p>
              )}
              <h5>Taille: {plat.taille}</h5>
              <h5>Prix: {plat.prix} dt</h5>
              {plat.total.map((tb, i) => (
                <Table key={i} striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th> Protein </th>
                      <th>Carbs</th>
                      <th>Fat</th>
                      <th>kcalories</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> {tb.protein} </td>
                      <td> {tb.carbs} </td>
                      <td> {tb.fat} </td>
                      <td> {tb.kcalories} </td>
                    </tr>
                  </tbody>
                </Table>
              ))}
              <Button variant="danger" onClick={() => deletePlats(plat._id)}>
                Delete
              </Button>
            </div>
          ))
        ) : (
          <h1>
            SVP ajoutez des plats{" "}
            <span>
              <Link to={"/Ingredients"}>ici</Link>
            </span>
          </h1>
        )}
      </div>

      {selectedIngredients.length > 0 && (
        <Table striped bordered hover variant="dark" className="tableIngr">
          <thead>
            <tr>
              <th>Num</th>
              <th>Nom</th>
              <th>protein</th>
              <th>carbs</th>
              <th>fat</th>
              <th>kcalories</th>
              <th>Quantity</th>
              <th>Delete</th>
            </tr>
          </thead>

          {selectedIngredients.length > 0 &&
            selectedIngredients.map((selIngr, index) => (
              <tbody key={index}>
                <tr>
                  <td> {index + 1} </td>
                  <td> {selIngr.nom} </td>
                  <td> {selIngr.protein} </td>
                  <td> {selIngr.carbs} </td>
                  <td> {selIngr.fat} </td>
                  <td> {selIngr.kcalories} </td>
                  { selIngr.nom ==="OEUF" ? <td> {selIngr.quantity} P </td> : <td> {selIngr.quantity} G </td>  }
                  
                  <td>
                    {" "}
                    <Button
                      onClick={() => removeIngrFromPlats(selIngr)}
                      variant="danger"
                    >
                      {" "}
                      Del
                    </Button>{" "}
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      )}
    </div>
  );
};

export default Plats;

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Recipes() {
  const API_KEY = '6c31a1ea041d9a7efb9526c6aaf38337';
  const API_ID = '08f1c7d8';
  const [recipes, setRecipes] = useState([]);
  const [searchVal, setSearchVal] = useState(
    localStorage.getItem("searchVal") || "pizza"
  );
  const [diet, setDiet] = useState("");
  const [health, setHealth] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [mealType, setMealType] = useState("");
  const [dishType, setDishType] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(searchVal);
  const [nextPage, setNextPage] = useState('');
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchVal);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchVal]);

  useEffect(() => {

    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${debouncedValue}&app_id=${API_ID}&app_key=${API_KEY}${diet}${health}${cuisineType}${mealType}${dishType}`
      )
      .then((response) => {
        setRecipes(response.data.hits);
        setNextPage(response.data._links.next.href)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    debouncedValue,
    diet,
    health,
    cuisineType,
    mealType,
    dishType,
    reset,
  ]);

  const searchItems = (searchItem) => {
    setSearchVal(searchItem);
    localStorage.setItem("searchVal", searchItem);
  };

  const handleDietChange = (event) => {
    setDiet(event.target.value);
  };
  const handleHealthChange = (event) => {
    setHealth(event.target.value);
  };
  const handleCuisineTypeChange = (event) => {
    setCuisineType(event.target.value);
  };
  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };
  const handleDishTypeChange = (event) => {
    setDishType(event.target.value);
  };

  const handleNextPage = () => {
    axios
      .get(nextPage)
      .then((response) => {
        setRecipes(response.data.hits);
        console.log(nextPage)
        setNextPage(response.data._links.next.href);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const resetPages = () => {
    setReset(!reset)
  }

  return (
    <div>
      <input
        icon="search"
        type="text"
        value={searchVal}
        onChange={(e) => searchItems(e.target.value)}
        placeholder="Search by name..."
      ></input>

      <h2>Filter by diet:</h2>
      <select name="select" onChange={handleDietChange}>
        <option value="" selected></option>
        <option value="&diet=balanced">balanced</option>
        <option value="&diet=high-fiber">high-fiber</option>
        <option value="&diet=high-protein">high-protein</option>
        <option value="&diet=low-carb">low-carb</option>
        <option value="&diet=low-fat">low-fat</option>
        <option value="&diet=low-sodium">low-sodium</option>
      </select>

      <h2>Filter by Healthiness:</h2>
      <select name="select" onChange={handleHealthChange}>
        <option selected="" value=""></option>
        <option value="&health=alcohol-cocktail"> alcohol-cocktail </option>
        <option value="&health=alcohol-free"> alcohol-free </option>
        <option value="&health=celery-free"> celery-free </option>
        <option value="&health=crustacean-free"> crustacean-free </option>
        <option value="&health=dairy-free"> dairy-free </option>
        <option value="&health=DASH"> DASH </option>
        <option value="&health=egg-free"> egg-free </option>
        <option value="&health=fish-free"> fish-free </option>
        <option value="&health=fodmap-free"> fodmap-free </option>
        <option value="&health=gluten-free"> gluten-free </option>
        <option value="&health=immuno-supportive"> immuno-supportive </option>
        <option value="&health=keto-friendly"> keto-friendly </option>
        <option value="&health=kidney-friendly"> kidney-friendly </option>
        <option value="&health=kosher"> kosher </option>
        <option value="&health=low-fat-abs"> low-fat-abs </option>
        <option value="&health=low-potassium"> low-potassium </option>
        <option value="&health=low-sugar"> low-sugar </option>
        <option value="&health=lupine-free"> lupine-free </option>
        <option value="&health=Mediterranean"> Mediterranean </option>
        <option value="&health=mollusk-free"> mollusk-free </option>
        <option value="&health=mustard-free"> mustard-free </option>
        <option value="&health=no-oil-added"> no-oil-added </option>
        <option value="&health=paleo"> paleo </option>
        <option value="&health=peanut-free"> peanut-free </option>
        <option value="&health=pescatarian"> pescatarian </option>
        <option value="&health=pork-free"> pork-free </option>
        <option value="&health=red-meat-free"> red-meat-free </option>
        <option value="&health=sesame-free"> sesame-free </option>
        <option value="&health=shellfish-free"> shellfish-free </option>
        <option value="&health=soy-free"> soy-free </option>
        <option value="&health=sugar-conscious"> sugar-conscious </option>
        <option value="&health=sulfite-free"> sulfite-free </option>
        <option value="&health=tree-nut-free"> tree-nut-free </option>
        <option value="&health=vegan"> vegan </option>
        <option value="&health=vegetarian"> vegetarian </option>
        <option value="&health=wheat-free"> wheat-free </option>
      </select>

      <h2>Filter by cuisineType:</h2>
      <select name="select" onChange={handleCuisineTypeChange}>
        <option selected="" value=""></option>
        <option value="&cuisineType=American"> American </option>
        <option value="&cuisineType=Asian"> Asian </option>
        <option value="&cuisineType=British"> British </option>
        <option value="&cuisineType=Caribbean"> Caribbean </option>
        <option value="&cuisineType=Central%20Europe"> Central Europe </option>
        <option value="&cuisineType=Chinese"> Chinese </option>
        <option value="&cuisineType=Eastern%20Europe"> Eastern Europe </option>
        <option value="&cuisineType=French"> French </option>
        <option value="&cuisineType=Indian"> Indian </option>
        <option value="&cuisineType=Italian"> Italian </option>
        <option value="&cuisineType=Japanese"> Japanese </option>
        <option value="&cuisineType=Kosher"> Kosher </option>
        <option value="&cuisineType=Mediterranean"> Mediterranean </option>
        <option value="&cuisineType=Mexican"> Mexican </option>
        <option value="&cuisineType=Middle%20Eastern"> Middle Eastern </option>
        <option value="&cuisineType=Nordic"> Nordic </option>
        <option value="&cuisineType=South%20American"> South American </option>
        <option value="&cuisineType=South%20East%20Asian">
          {" "}
          South East Asian{" "}
        </option>
      </select>

      <h2>Filter by meal type:</h2>
      <select name="select" onChange={handleMealTypeChange}>
        <option value="" selected></option>
        <option value="&mealType=Breakfast">Breakfast</option>
        <option value="&mealType=Dinner">Dinner</option>
        <option value="&mealType=Lunch">Lunch</option>
        <option value="&mealType=Snack">Snack</option>
        <option value="&mealType=Teatime">Teatime</option>
      </select>

      <h2>Filter by dish type:</h2>
      <select name="select" onChange={handleDishTypeChange}>
        <option selected="" value=""></option>
        <option value="&dishType=Biscuits%20and%20cookies">
          {" "}
          Biscuits and cookies{" "}
        </option>
        <option value="&dishType=Bread"> Bread </option>
        <option value="&dishType=Cereals"> Cereals </option>
        <option value="&dishType=Condiments%20and%20sauces">
          {" "}
          Condiments and sauces{" "}
        </option>
        <option value="&dishType=Desserts"> Desserts </option>
        <option value="&dishType=Drinks"> Drinks </option>
        <option value="&dishType=Main%20course"> Main course </option>
        <option value="&dishType=Pancake"> Pancake </option>
        <option value="&dishType=Preps"> Preps </option>
        <option value="&dishType=Preserve"> Preserve </option>
        <option value="&dishType=Salad"> Salad </option>
        <option value="&dishType=Sandwiches"> Sandwiches </option>
        <option value="&dishType=Side%20dish"> Side dish </option>
        <option value="&dishType=Soup"> Soup </option>
        <option value="&dishType=Starter"> Starter </option>
        <option value="&dishType=Sweets"> Sweets </option>
      </select>

      <h1>Recipes</h1>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.recipe.uri}>{recipe.recipe.label}</li>
        ))}
      </ul>
        <button onClick={handleNextPage}>Next page</button>
        <button onClick={resetPages}>Reset Pages</button>
    </div>
  );
}

export default Recipes;

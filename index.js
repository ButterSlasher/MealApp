async function GetRandMeal() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + document.getElementById("category").value);
    let data = await response.json();

    let meal = data.meals[Math.floor(Math.random() * data.meals.length)];

    let fullMeal = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal["idMeal"]).then(r => r.json());

    return fullMeal.meals[0];
}

function GetIngredients(meal) {
    let ingredients = [];

    for (let i = 1; i <= 20; i++) {
        let ingredient = meal["strIngredient" + i];
        let measure = meal["strMeasure" + i];

        if (ingredient && ingredient.trim() != "" && measure && measure.trim() != "") {
            if (measure.trim() == "sprigs of fresh") {
                measure = "fresh sprigs"
            }
            if (measure.trim() == "sprigs of") {
                measure = "sprigs"
            }

            ingredients.push(ingredient.trim().toLowerCase() + " - " + measure.trim().toLowerCase());
        }
    }

    let ingredientsList = "";

    for (let i = 0; i < ingredients.length; i++) {
        let item = ingredients[i];
        item = "<li>" + item + "</li>"

        ingredientsList += item;
    }

    return ingredientsList;
}

document.getElementById("generate").onclick = async () => {
    let meal = await GetRandMeal();

    document.getElementById("ingredients").innerHTML = GetIngredients(meal);

    document.getElementById("preparation").innerHTML = meal.strInstructions;

    document.getElementById("meal").innerHTML = meal.strMeal;
    document.getElementById("thumbnail").src = meal.strMealThumb;
}
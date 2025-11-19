async function GetRandMeal() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    let data = await response.json();

    return data.meals[0];
}

document.getElementById("generate").onclick = async () => {
    let meal = await GetRandMeal();

    document.getElementById("recipe").innerHTML = meal.strMeal;
    document.getElementById("thumbnail").src = meal.strMealThumb;
}
const allItems = document.getElementById('foods');
const searchBtn = document.getElementById('btn');
const error = document.getElementById('error');

searchBtn.addEventListener('click', function (){
    const inputItem = document.getElementById('input').value;
    allItems.innerHTML = '';
    if (inputItem === '') {
        error.style.display = 'block';
    } else {
        getFood(inputItem);
        error.style.display = 'none';
    }
});

const displayDetails = name =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            foodInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};

const foodInfo = (food) =>{
    const ingredients = [];
    for (let i = 1; i <= 20; i++){
        if (food[`strIngredient${i}`]){
            ingredients.push(`${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    const foodDetails = document.getElementById('foodsDetails');
    foodDetails.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
    <ul class="list-style mb-0">
    ${ingredients.map((ingredient) => `<li><i class="icon-check icons"></i>${ingredient}</li>`).join('')}
    </ul>
`;
};

function getFood(food){
    const apiLink = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`;

    fetch(apiLink)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        });

    const displayFoods = foods =>{
        const div = document.getElementById('foods');
        if (foods != null) {
            foods.map(food => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'col-md-3';
                const itemInfo = `
                        <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                itemDiv.innerHTML = itemInfo;
                div.appendChild(itemDiv);
            });
        } else {
            error.style.display = 'block';
        }
    };
}
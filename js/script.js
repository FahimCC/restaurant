// fetch API
const loadMeal = async () => {
	const URL = 'https://themealdb.com/api/json/v1/1/search.php?s=Chicken';
	const res = await fetch(URL);
	const data = await res.json();
	displayMeal(data.meals);
};

// display food data
const displayMeal = meals => {
	const mealContainer = document.getElementById('meal-container');
	for (const meal of meals) {
		// console.log(meal);
		const food = document.createElement('div');
		food.innerHTML = `
            <div class="flex flex-wrap md:flex-nowrap items-center gap-5">
                <img
                    src="${meal.strMealThumb}"
                    class="rounded-tr-xl rounded-tl-xl w-full md:h-[300px] md:w-[230px]"
                    alt="Movie"
                />
                <div>
                    <h2 class="text-2xl font-bold text-[#403F3F]">${
											meal.strMeal
										}</h2>
                    <p class="text-lg font-normal my-4 text-[#706F6F]">${meal.strInstructions
											.split(' ')
											.slice(0, 10)
											.join(' ')}...</p>
                    <!-- The button to open modal -->
                    <label
                        for="food-details" onclick="loadFoodDetails('${
													meal.idMeal
												}')"
                        class="text-lg font-semibold text-warning underline cursor-pointer"
                    >
                        View Details
                    </label>
                </div>
            </div>
        `;
		mealContainer.appendChild(food);
	}
};

// again fetch API
const loadFoodDetails = foodId => {
	console.log(foodId);
	const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
	fetch(URL)
		.then(res => res.json())
		.then(data => displayFoodDetails(data.meals[0]));
};

//display food details in modal
const displayFoodDetails = food => {
	console.log(food);
	document.getElementById('food-title').innerText = food.strMeal;
	document.getElementById('food-image').src = food.strMealThumb;
	document.getElementById('food-category').innerText = food.strCategory;
	document.getElementById('food-area').innerText = food.strArea;
	document.getElementById('food-instructions').innerText = food.strInstructions;
	document.getElementById('food-youtube').href = food.strYoutube;
	document.getElementById('food-youtube').innerText = food.strYoutube;
};

loadMeal();

document.addEventListener('DOMContentLoaded', () => {
  const allMealsContainer = document.getElementById('allMealsContainer');
  const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  let page = 1;
  const displayedMeals = new Set();

  const fetchAllMeals = () => {
    fetch(`${apiUrl}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const meals = data.meals;
        if (meals) {
          meals.forEach((meal) => {
            if (!displayedMeals.has(meal.strMeal)) {
              displayedMeals.add(meal.strMeal);

              const mealDiv = document.createElement('div');
              mealDiv.className = 'meal';

              const mealImage = document.createElement('img');
              mealImage.src = meal.strMealThumb;
              mealImage.alt = meal.strMeal;

              const mealDetails = document.createElement('div');
              mealDetails.className = 'meal-details';

              const mealName = document.createElement('h3');
              mealName.textContent = meal.strMeal;

              const viewButton = document.createElement('button');
              viewButton.className = 'view-button';
              viewButton.textContent = 'View';
              viewButton.dataset.mealName = meal.strMeal;

              mealDetails.appendChild(mealName);
              mealDetails.appendChild(viewButton);

              mealDiv.appendChild(mealImage);
              mealDiv.appendChild(mealDetails);

              allMealsContainer.appendChild(mealDiv);
            }
          });

          // Fetch the next page if available
          if (meals.length > 0) {
            page++;
            fetchAllMeals();
          }
        } else {
          allMealsContainer.innerHTML = '<p>No meals found.</p>';
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        allMealsContainer.innerHTML = '<p>Error fetching meals.</p>';
      });
  };

  fetchAllMeals();
});




function fetchMealCategories() {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((response) => response.json())
      .then((data) => {
        const categoryDropdown = document.getElementById("searchData");
  
        data.meals.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.strCategory;
          option.textContent = category.strCategory;
          categoryDropdown.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching meal categories: " + error);
      });
  }
  
  // Call the function to populate the dropdown
  fetchMealCategories();
  
  // Add an event listener for the category dropdown
  const searchData = document.getElementById("searchData");
  searchData.addEventListener("change", function () {
    const selectedCategory = searchData.value;
    fetchCategoryMeals(selectedCategory);
  });
  
  // Function to fetch meals based on the selected category
  function fetchCategoryMeals(category) {
    const categoriesList = document.getElementById("categories-list");
    categoriesList.innerHTML = "Loading meals for the selected category...";
  
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          const mealsHTML = data.meals.map((meal) => {
            return `
              <div class="meal">
                <div class="meal-image">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>
                <div class="meal-details">
                  <h3>${meal.strMeal}</h3>
                  <button class="view-button" data-meal-name="${meal.strMeal}">View</button>
                </div>
              </div>
            `;
          }).join('');
          categoriesList.innerHTML = `<div class="meals-container">${mealsHTML}</div>`;
        } else {
          categoriesList.innerHTML = `No meals found for the category "${category}".`;
        }
      })
      .catch((error) => {
        categoriesList.innerHTML = "Error fetching data.";
        console.error("Error:", error);
      });
  }

  // Add an event listener for the "View" buttons
  const categoriesList = document.getElementById("categories-list");
  categoriesList.addEventListener("click", function (event) {
    if (event.target.classList.contains('view-button')) {
      const mealName = event.target.getAttribute('data-meal-name');
      fetchMealDetails(mealName);
    }
  });
  
  // Function to fetch detailed meal information
  function fetchMealDetails(mealName) {
    const categoriesList = document.getElementById("categories-list");
    categoriesList.innerHTML = "Loading meal details...";
  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];
          const ingredients = [];

          // Loop through the ingredients and add them to the ingredients array
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && measure) {
              ingredients.push(`${measure} ${ingredient}`);
            }
          }
  
          const mealDetailsHTML = `
          <div class="meal-details">
            <h2>${meal.strMeal}</h2>
            <div class="mealpic"><img src="${meal.strMealThumb}" alt="${meal.strMeal}"></div>
            <h3>Ingredients:</h3>
            <ul>
              ${ingredients
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join('')}
            </ul>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
            <h3>Video:</h3>
            <p><a href="https://www.youtube.com/results?search_query=${mealName}" target="_blank">Watch ${mealName} Recipe Video</a></p>
            <h3>Related Site:</h3>
            <p><a href="${meal.strSource}" target="_blank">${meal.strMeal} Recipe on the Official Site</a></p>
          </div>
          `;
          categoriesList.innerHTML = mealDetailsHTML;
        } else {
          categoriesList.innerHTML = `No details found for the meal: "${mealName}".`;
        }
      })
      .catch((error) => {
        categoriesList.innerHTML = "Error fetching data.";
        console.error("Error:", error);
      });
  }
  

  document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const closebutton = document.getElementById("closebutton");
  
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
  
    closebutton.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
  });
  


  
  
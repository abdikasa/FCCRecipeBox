

let internalCtrl = (function () {

    let Recipe = function (name, description, ingredients, directions, duration, servings, id) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.directions = directions;
        this.duration = duration;
        this.servings = servings;
        this.id = id;
    }

    let data = {
        cookBook: []
    }



    return {
        retreiveData: function () {
            return data.cookBook;
        },

        add: function (name, description, ingredients, directions, duration, servings) {
            let recipe, id;

            //Returns undefined property id of undefined
            // data.cookBook.length = 0, then we subtract 1, thus undefined.
            //Solution, make id a ixed value of zero if our data array is empty.

            if (data.cookBook.length === 0) {
                id = 0;
            } else {
                id = data.cookBook[data.cookBook.length - 1].id + 1;
            }

            let condition1 = name.trim().length > 0 && description.trim().length > 0;
            let condition2 = ingredients.trim().length > 0 && directions.trim().length > 0;
            let condition3 = duration.trim().length > 0 && servings.trim().length > 0;

            if (condition1 && condition2 && condition3) {
                recipe = new Recipe(name, description, ingredients, directions, duration, servings, id);
                data.cookBook.push(recipe)
            }
            return recipe;
        },

        searchForMatch(id, data) {
            let recipe;
            for (let i = 0; i < data.length; i++) {
                if (Number(id) === data[i].id) {
                    recipe = data[i];
                    break;
                }
            }
            return recipe;
        }
    }

})();

let UICtrl = (function () {

    let DOMStrings = {
        name: '#recipe-name',
        description: '#description',
        ingredients: '#ingredients',
        directions: '#directions',
        duration: '#duration',
        servings: '#numOfServings',
        save_btn: '.save',
        container: '.card-container',
        num_of_tasks: '#num-of-tasks',
        today_date: '.today-date',
        full_recipe: 'resize-icon',
        full_name: '.full-name',
        full_description: '.full-description',
        full_ingredients: '.full-ingredients',
        full_directions: '.full-directions',
        full_time: '.full-time',
        full_servings: '.full-servings'
    };


    return {
        getUserInput: function () {
            return {
                name: document.querySelector(DOMStrings.name).value,
                description: document.querySelector(DOMStrings.description).value,
                ingredients: document.querySelector(DOMStrings.ingredients).value,
                directions: document.querySelector(DOMStrings.directions).value,
                duration: document.querySelector(DOMStrings.duration).value,
                servings: document.querySelector(DOMStrings.servings).value
            }
        },

        getDOMStrings: function () {
            return DOMStrings;
        },

        addItemToUI: function (recipe) {
            let html;
            if (recipe === undefined) {

            } else {

                let container = document.querySelector(DOMStrings.container);

                html = '<div class="card mb-3 ml-3"><div class="row no-gutters"><div class="col-auto"><img src="./lasagna.jpg" class="img-fluid" width="auto" height="auto" alt=""></div><div class="col-10"><div class="card-block px-2"><h4 class="card-title font-weight-bold">%name%</h4><p class="card-text">%description%</p><p class="card-text date-c">%date%</p></div></div></div><div class="card-footer w-100 font-weight-bold p-0"><div class="d-flex justify-content-center d-flex align-items-center"><div class="col-9"><p style="display:inline">Duration: <span class="minutes">%duration%</span> minutes. Servings: <span class="servings">%servings%</span></p></div><div class="col-3"><span class="enlarge-icon"><button type="button" class="btn enlarge-icon id-%id%" style="font-size:77%;padding:0;padding-top:25%" data-toggle="modal" data-target=".bd-example-modal-2g"><ion-icon name="resize" class="resize-icon"></ion-icon></button></span><span class="enlarge-icon"><ion-icon name="trash"></ion-icon></span><span class="enlarge-icon"><ion-icon name="create"></ion-icon></span></div></div></div></div'

                // '<div class="card mb-3 ml-3"><div class="row no-gutters"><div class="col-auto"><img src="./lasagna.jpg" class="img-fluid" width="auto" height="auto" alt=""></div><div class="col-10"><div class="card-block px-2"> <h4 class="card-title font-weight-bold">%name%</h4><p class="card-text">%description%</p><p class="card-text date-c">%date%</p></div></div></div><div class="card-footer w-100 font-weight-bold p-0"><div class="d-flex justify-content-center d-flex align-items-center"><div class="col-9"><p style="display:inline">Duration: <span class="minutes">%duration%</span> minutes. Servings: <span class="servings">%servings%</span></p></div><div class="col-3"><span class="enlarge-icon" style="font-size:120%;margin-top:2%"><ion-icon name="resize"></ion-icon></span><span class="enlarge-icon"><ion-icon name="trash"></ion-icon></span><span class="enlarge-icon"><ion-icon name="create"></ion-icon></span></div></div></div></div>'

                let date = this.getTodayDate();
                html = html.replace("%name%", recipe.name);
                html = html.replace("%description%", recipe.description);
                html = html.replace("%duration%", recipe.duration);
                html = html.replace("%servings%", recipe.servings);
                html = html.replace("%date%", 'Recipe created on ' + date);
                html = html.replace("%id%", recipe.id);

                container.insertAdjacentHTML("beforeend", html);
            }
        },
        updateCount: function () {
            let count = document.querySelector(DOMStrings.container).children.length;
            let spanCount = document.querySelector(DOMStrings.num_of_tasks);
            let array = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

            if(array[count] === undefined){
                spanCount.textContent= ` ${count} `
            }else{
                spanCount.textContent = ` ${array[count]} `;
            }

            // 

            // if (array.indexOf(count.textContent.trim()) >= 0) {
            //     count.textContent = " " + array[array.indexOf(count.textContent.trim()) + 1] + " ";
            //     console.log(count.textContent)
            //     if (count.textContent === " " + undefined + " ") {
            //         count.textContent = " 10 "
            //     }
            // } else {
            //     count.textContent = " 10+ "
            // }


        },

        getTodayDate: function () {
            let setDate = document.querySelector(DOMStrings.today_date);
            var d = new Date();
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let date = months[curr_month - 1] + " " + curr_date + ", " + curr_year;

            setDate.textContent = date;
            return date;
        },

        getFullRecipe: function (e) {
            // full_name: '.full-name',
            // full_description: '.full-description',
            // full_ingredients: '.full-ingredients',
            // full_directions: '.full-directions',
            // full_time: '.full-time',
            // full_servings: '.full-servings'

            //get Id from the targeted card
            let item;

            if (e.target.parentElement.classList.value.includes("id-")) {
                item = e.target.parentElement.classList.item(e.target.parentElement.classList.length - 1);
            }
            console.log(item); // returns id-0
            let split = item.split("-");

            return split;
        },

        getFullRecipeHelper: function (recipe) {
            // full_name: '.full-name',
            // full_description: '.full-description',
            // full_ingredients: '.full-ingredients',
            // full_directions: '.full-directions',
            // full_time: '.full-time',
            // full_servings: '.full-servings'

            document.querySelector(DOMStrings.full_name).textContent = recipe.name;
            document.querySelector(DOMStrings.full_description).textContent = recipe.description;
            document.querySelector(DOMStrings.full_ingredients).textContent = recipe.ingredients;
            document.querySelector(DOMStrings.full_directions).textContent = recipe.directions;
            document.querySelector(DOMStrings.full_time).textContent = recipe.duration;
            document.querySelector(DOMStrings.full_servings).textContent = recipe.servings;

        }
    }
})();


let link = (function (inside, outside) {



    let addToScreen = function () {
        let recipe;
        //Get user input
        let userInput = outside.getUserInput();

        //Add to internal structure
        recipe = inside.add(userInput.name, userInput.description, userInput.ingredients, userInput.directions, userInput.duration, userInput.servings);
        console.log(recipe)

        //Add to UI/external
        outside.addItemToUI(recipe);
        outside.updateCount();
    }

    let match_ID_With_Recipe = function (e) {
        if (e.target.classList.value.includes("resize-icon")) {
            let data = inside.retreiveData();
            let splitID = outside.getFullRecipe(e);
            let id = splitID[1];
            let result = inside.searchForMatch(id, data);
            return result;
        }
    }

    let seeFullRecipe = function (e) {
        let matchedRecipe = match_ID_With_Recipe(e);
        outside.getFullRecipeHelper(matchedRecipe);
    }






    function runListeners() {

        let DOMStrings = outside.getDOMStrings();

        document.querySelector(DOMStrings.save_btn).addEventListener("click", function () {
            addToScreen();
        })

        document.addEventListener("DOMContentLoaded", function () {
            outside.updateCount();
            outside.getTodayDate();
        })

        document.addEventListener("click", function (e) {
            if (e.target.classList.value.includes(DOMStrings.full_recipe)) {
                seeFullRecipe(e);
            }
        })
    }

    return {
        init: function () {
            console.log("Application has started!")
            runListeners();
        }

    }
})(internalCtrl, UICtrl);

link.init();
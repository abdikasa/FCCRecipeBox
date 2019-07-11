

let internalCtrl = (function () {

    let Recipe = function (name, description, ingredients, directions, duration, servings) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.directions = directions;
        this.duration = duration;
        this.servings = servings;
    }

    let data = {
        cookBook: []
    }



    return {
        retreiveData: function () {
            return data;
        },

        add: function (name, description, ingredients, directions, duration, servings) {
            let recipe;
            if (name.trim().length > 0 && description.trim().length > 0 && ingredients.trim().length > 0 && directions.trim().length > 0 && duration.trim().length > 0 && servings.trim().length > 0) {
                recipe = new Recipe(name, description, ingredients, directions, duration, servings);
                data.cookBook.push(recipe)
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
        container: '.container',
        num_of_tasks: '#num-of-tasks',
        today_date: '.today-date'
    };


    return {
        getUserInput: function () {
            return {
                name: document.querySelector(DOMStrings.name).value,
                description: document.querySelector(DOMStrings.description).value,
                ingredients: document.querySelector(DOMStrings.ingredients).value,
                directions: document.querySelector(DOMStrings.directions).value,
                duration: document.querySelector(DOMStrings.duration).value,
                servings: document.querySelector(DOMStrings.servings).value,
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

                html = '<div class="card mb-3 ml-3"><div class="row no-gutters"><div class="col-auto"><img src="./lasagna.jpg" class="img-fluid" width="auto" height="auto" alt=""></div><div class="col-10"><div class="card-block px-2"> <h4 class="card-title font-weight-bold">%name%</h4><p class="card-text">%description%</p><p class="card-text date-c">Recipe Created On: July 7, 2019</p></div></div></div><div class="card-footer w-100 font-weight-bold p-0"><div class="d-flex justify-content-center d-flex align-items-center"><div class="col-9"><p style="display:inline">Duration: <span class="minutes">%duration%</span> minutes. Servings: <span class="servings">%servings%</span></p></div><div class="col-3"><span class="enlarge-icon" style="font-size:120%;margin-top:2%"><ion-icon name="resize"></ion-icon></span><span class="enlarge-icon"><ion-icon name="trash"></ion-icon></span><span class="enlarge-icon"><ion-icon name="create"></ion-icon></span></div></div></div></div>'

                html = html.replace("%name%", recipe.name);
                html = html.replace("%description%", recipe.description);
                html = html.replace("%duration%", recipe.duration);
                html = html.replace("%servings%", recipe.servings);

                container.insertAdjacentHTML("afterbegin", html);
            }
        },
        updateCount: function () {
            let count = document.querySelector(DOMStrings.num_of_tasks);
            let array = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

            if (array.indexOf(count.textContent.trim()) >= 0) {
                count.textContent = " " + array[array.indexOf(count.textContent.trim()) + 1] + " ";
                console.log(count.textContent)
                if (count.textContent === " " + undefined + " ") {
                    count.textContent = " 10 "
                }
            } else {
                count.textContent = " 10+ "
            }
        },

        getTodayDate: function () {
            let setDate = document.querySelector(DOMStrings.today_date);
            var d = new Date();
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            setDate.textContent = months[curr_month-1] + "-" + curr_date + "-" + curr_year;

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






    function runListeners() {

        let DOMStrings = outside.getDOMStrings();

        document.querySelector(DOMStrings.save_btn).addEventListener("click", function () {
            addToScreen();
        })

        document.addEventListener("DOMContentLoaded", function () {
            document.querySelector(DOMStrings.num_of_tasks).textContent = ' zero ';
            outside.getTodayDate();
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


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

            if (data.cookBook.length > 0) {
                id = data.cookBook[data.cookBook.length - 1].id + 1;
            } else {
                id = 0;
            }

            let condition1 = name.trim().length > 0 && description.trim().length > 0;
            let condition2 = ingredients.trim().length > 0 && directions.trim().length > 0;
            let condition3 = duration.trim().length > 0 && servings.trim().length > 0;
            let condition4 = this.checkDurationAndServings();

            if (condition1 && condition2 && condition3 && condition4) {
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
        },

        checkDurationAndServings: function () {
            let durat = document.querySelector("#duration");
            let servings = document.querySelector("#numOfServings");
            let duratCondition = (Number(durat.value) >= Number(durat.getAttribute("min")) && (Number(durat.value) <= Number(durat.getAttribute("max"))));
            let servingsCondition = (Number(servings.value) >= Number(servings.getAttribute("min")) && (Number(servings.value) <= Number(servings.getAttribute("max"))));

            return duratCondition && servingsCondition;

        },
        deleteInternal: function (e) {
            let cookBook = this.retreiveData();
            let data;
            if (e.target.parentElement.previousElementSibling.children[0].classList.value.includes("id-")) {
                data = e.target.parentElement.previousElementSibling.children[0].classList.item(e.target.parentElement.previousElementSibling.children[0].classList.length - 1).split("-")[1];
                console.log(data);
            }

            for (let i = 0; i < cookBook.length; i++) {
                if (Number(data) === cookBook[i].id) {
                    cookBook.splice(i, 1);
                    return "true";
                }
            }
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
        full_servings: '.full-servings',
        id: 'id-',
        create_icon: 'create-icon',
        add_btn: "button.btn-add",
        delete_trash: 'delete-trash'
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

                html = '<div class="card mb-3 ml-3"><div class="row no-gutters"><div class="col-auto"><img src="//placehold.it/200" class="img-fluid replace-image" width="auto" height="auto" alt=""></div><div class="col-9"><div class="card-block px-2"><h4 class="card-title font-weight-bold">%name%</h4><p class="card-text">%description%</p><p class="card-text date-c">%date%</p></div></div></div><div class="card-footer w-100 font-weight-bold p-0"><div class="d-flex justify-content-center d-flex align-items-center"><div class="col-9"><p style="display:inline">Duration: <span class="minutes">%duration%</span> minutes. Servings: <span class="servings">%servings%</span></p></div><div class="col-3"><span class="enlarge-icon"><button type="button" class="btn enlarge-icon id-%id%" style="font-size:77%;padding:0;padding-top:25%" data-target=".bd-example-modal-2g"><ion-icon name="resize" class="resize-icon"></ion-icon></button></span><span class="enlarge-icon"><ion-icon name="trash" class="delete-trash"></ion-icon></span><span class="enlarge-icon"><button type="button" class="btn enlarge-icon" style="font-size:77%;padding:0;padding-top:24%" data-target=".bd-example-modal-lg"><ion-icon name="create" class="create-icon"></ion-icon></button></span></div></div></div></div'


                //between col-auto and end div, col-10

                // '<div class="card mb-3 ml-3"><div class="row no-gutters"><div class="col-auto"><img src="./lasagna.jpg" class="img-fluid" width="auto" height="auto" alt=""></div><div class="col-10"><div class="card-block px-2"> <h4 class="card-title font-weight-bold">%name%</h4><p class="card-text">%description%</p><p class="card-text date-c">%date%</p></div></div></div><div class="card-footer w-100 font-weight-bold p-0"><div class="d-flex justify-content-center d-flex align-items-center"><div class="col-9"><p style="display:inline">Duration: <span class="minutes">%duration%</span> minutes. Servings: <span class="servings">%servings%</span></p></div><div class="col-3"><span class="enlarge-icon" style="font-size:120%;margin-top:2%"><ion-icon name="resize"></ion-icon></span><span class="enlarge-icon"><ion-icon name="trash"></ion-icon></span><span class="enlarge-icon"><ion-icon name="create" class="create-icon"></ion-icon></span></div></div></div></div>'


                let date = this.getTodayDate();
                html = html.replace("%name%", recipe.name);
                html = html.replace("%description%", recipe.description);
                html = html.replace("%duration%", recipe.duration);
                html = html.replace("%servings%", recipe.servings);
                html = html.replace("%date%", 'Recipe created on ' + date);
                html = html.replace("%id%", recipe.id);

                // document.querySelector(".image-replace").innerHTML = image;
                container.insertAdjacentHTML("beforeend", html);

            }
        },

        uploadImage: function () {

        },

        resetUserInput: function () {
            //1. get the values from the input tag.
            let nodes = document.querySelectorAll(DOMStrings.name + ',' + DOMStrings.description + ',' + DOMStrings.ingredients + ',' + DOMStrings.directions + ',' + DOMStrings.duration + ',' + DOMStrings.servings);

            //2. convert to array
            let nodeArray = Array.prototype.slice.call(nodes);

            //3.Loop through the array

            nodeArray.forEach(function (item) {
                item.value = "";
            })

            nodeArray[0].focus();

        },

        updateCount: function () {
            let count = document.querySelector(DOMStrings.container).children.length;
            let spanCount = document.querySelector(DOMStrings.num_of_tasks);
            let array = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

            if (array[count] === undefined) {
                spanCount.textContent = ` ${count} `
            } else {
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

        resetValues: function () {
            document.querySelector(DOMStrings.full_name).textContent = "";
            document.querySelector(DOMStrings.full_description).textContent = ""
            document.querySelector(DOMStrings.full_ingredients).textContent = "";
            document.querySelector(DOMStrings.full_directions).textContent = "";
            document.querySelector(DOMStrings.full_time).textContent = "";
            document.querySelector(DOMStrings.full_servings).textContent = "";
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

        getFullRecipe: function (e, string) {
            // full_name: '.full-name',
            // full_description: '.full-description',
            // full_ingredients: '.full-ingredients',
            // full_directions: '.full-directions',
            // full_time: '.full-time',
            // full_servings: '.full-servings'

            //get Id from the targeted card
            let item;
            if (e.target.parentElement.classList.value.includes(string)) { //DOMStrings.id
                item = e.target.parentElement.classList.item(e.target.parentElement.classList.length - 1);
            } else if (e.target.parentElement.parentElement.parentElement.children[0].children[0].className.includes(string)) {
                item = e.target.parentElement.parentElement.parentElement.children[0].children[0].classList.item(e.target.parentElement.parentElement.parentElement.children[0].children[0].classList.length - 1);
            } else if (e.target.parentElement.parentElement.children[0].children[0].className.includes(string)) {
                item = e.target.parentElement.parentElement.children[0].children[0].classList.item(e.target.parentElement.parentElement.children[0].children[0].classList.length - 1);
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


            //Clears the modal's values.
            this.resetValues();

            document.querySelector(DOMStrings.full_name).textContent = recipe.name;
            document.querySelector(DOMStrings.full_description).textContent = recipe.description;

            //Create a function here that takes these params later, they repeat the same values.
            //Format the ingredients.
            let ingredients = recipe.ingredients.trim().split("/");
            let ul = document.createElement("ul");
            ul.className = 'text-left'
            document.querySelector(DOMStrings.full_ingredients).appendChild(ul);
            for (let i = 0; i < ingredients.length; i++) {
                let item = ingredients[i].trim();
                if (item !== "") {
                    let li = document.createElement("li");
                    li.textContent = item;
                    ul.appendChild(li);
                }
            }

            //Format the directions
            let directions = recipe.directions.trim().split("/");
            let ol = document.createElement("ol");
            ol.className = 'text-left'
            document.querySelector(DOMStrings.full_directions).appendChild(ol);
            for (let i = 0; i < directions.length; i++) {
                let item = directions[i].trim();
                if (item !== "") {
                    let li = document.createElement("li");
                    li.textContent = item;
                    ol.appendChild(li);
                }
            }

            document.querySelector(DOMStrings.full_time).textContent = recipe.duration;
            document.querySelector(DOMStrings.full_servings).textContent = recipe.servings;

        },

        editRecipeUI: function (recipe) {
            document.querySelector(DOMStrings.name).value = recipe.name;
            document.querySelector(DOMStrings.description).value = recipe.description;
            document.querySelector(DOMStrings.ingredients).value = recipe.ingredients;
            document.querySelector(DOMStrings.directions).value = recipe.directions;
            document.querySelector(DOMStrings.duration).value = recipe.duration;
            document.querySelector(DOMStrings.servings).value = recipe.servings;
        },

        showImages: function () {
            if (document.querySelector(".modal-title").textContent === "Edit A Recipe") {
                console.log("bonjour, browse is open, how can I help you?")
                document.querySelector(".browse-images").style.display = "block";
            } else {
                document.querySelector(".browse-images").style.display = "none";
                console.log("Au revoir, browse has gone home")
            }
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

        outside.resetUserInput();
        outside.updateCount();
    }

    let match_ID_With_Recipe = function (e, string, string2) {
        let array = [];
        //let DOMStrings = outside.getDOMStrings(); //  let DOMStrings = outside.getDOMStrings();
        if (e.target.classList.value.includes(string)) { //DOMStrings.full_recipe
            let data = inside.retreiveData();
            let splitID = outside.getFullRecipe(e, string2);
            let id = splitID[1];
            let result = inside.searchForMatch(id, data);
            array.push(result, id)
            return array;
        }
    }

    let seeFullRecipe = function (e) {
        let DOMStrings = outside.getDOMStrings();
        let stmt = match_ID_With_Recipe(e, DOMStrings.full_recipe, DOMStrings.id)[0];
        outside.getFullRecipeHelper(stmt);
    }

    let editRecipe = function (e) {
        let DOMStrings = outside.getDOMStrings();
        let stmt = match_ID_With_Recipe(e, DOMStrings.create_icon, DOMStrings.id);
        console.log("Edit recipe")
        console.log(stmt);
        outside.editRecipeUI(stmt[0]); //modal is filled with the clicked card's details.
        return stmt[1];
    }

    // let addImages = function (id) {
    //     let img = document.querySelectorAll(".replace-image");
    //     let file = document.querySelector("#image-upload").files[0];
    //     let reader = new FileReader();
    //     reader.onloadend = function () {
    //         img.src = reader.result;
    //     }
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     } else {
    //         img.src = "";
    //     }
    // }


    let deleteRecipe = function () {
        //Delete from data

        //delete from UI
    }


    checkID = function (id, userInput) {
        if (id != undefined) {
            let data = inside.retreiveData();
            let food;
            for (let i = 0; i < data.length; i++) {
                if (Number(data[i].id) === Number(id)) {
                    console.log(data[i], data[i].id, Number(id));
                    food = inside.add(userInput.name, userInput.description, userInput.ingredients, userInput.directions, userInput.duration, userInput.servings);
                    let tempId = data[i].id;
                    console.log(food, "food");
                    if (food === undefined) {
                        console.log("Undefined, try again")
                    } else {
                        data[i] = food;
                        data[i].id = tempId;
                        data.splice(data.length - 1, 1);

                        document.querySelectorAll(".card-title")[i].textContent = data[i].name;
                        document.querySelectorAll(".card-text")[i].textContent = data[i].description;
                        document.querySelectorAll(".minutes")[i].textContent = data[i].duration;
                        document.querySelectorAll(".servings")[i].textContent = data[i].servings;

                        break;
                    }
                }
            }
            console.log(data);
        }
    }


    function runListeners() {

        let DOMStrings = outside.getDOMStrings();

        document.querySelector(DOMStrings.save_btn).addEventListener("click", function () {
            if (document.querySelector(".modal-title").textContent === "Edit A Recipe") {
                console.log("Editing..... is called")
            } else {
                console.log("addToScreen() is called")
                addToScreen();
            }
        })

        document.addEventListener("DOMContentLoaded", function () {
            outside.updateCount();
            outside.getTodayDate();
        })

        document.querySelector(DOMStrings.add_btn).addEventListener("click", function () {
            console.log("Add Recipe")
            outside.resetUserInput();
            document.querySelector(".modal-title").textContent = "Add A Recipe";
            outside.showImages();
        })

        document.querySelector(".browse-images").addEventListener("change", function () {
            addImages();
        })
        //Taken from Kyle Robinson FileReader YT video
        // document.querySelector('input[type="file"]').addEventListener("change", function (e) {
        //     console.log(document.querySelector('input[type="file"]').files);

        //    outside.getImage();
        // }, false)


        document.querySelector(DOMStrings.container).addEventListener("click", function (e) {
            if (event.detail === 1) {
                if (e.target.classList.value.includes(DOMStrings.full_recipe)) {
                    seeFullRecipe(e);
                    $('.bd-example-modal-2g').modal("show")
                } else if (e.target.parentElement.parentElement.parentElement.children[0].children[0].className.includes(DOMStrings.id)) {
                    $('.bd-example-modal-lg').modal("show");
                    document.querySelector(".modal-title").textContent = "Edit A Recipe";
                    outside.showImages();
                    let id = editRecipe(e);
                    document.querySelector(DOMStrings.save_btn).onclick = function () {
                        checkID(id, outside.getUserInput());
                        //e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
                        $('.bd-example-modal-lg').modal("hide");
                    };
                }
            }
            let bool = inside.deleteInternal(e);
            if (bool === "true") {
                e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
                outside.updateCount();
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
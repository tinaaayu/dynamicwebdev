let express = require('express');

let app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/search', mySearchRequestHandler)

function mySearchRequestHandler(req, res){
    let ingredient = req.query.q;
    
    console.log('Got search request:' + ingredient);

    let allRecipesLink = "https://www.allrecipes.com/search?q=" + encodeURIComponent(ingredient);
    let foodNetworkLink = "https://www.foodnetwork.com/search/" + encodeURIComponent(ingredient) + "-";
    let myHtmlOutput = "<h1>Recipe Search</h1>"
    myHtmlOutput = myHtmlOutput + "<p>you're looking 4 recipes with:</p>"
    myHtmlOutput = myHtmlOutput + "<p><strong>" + ingredient + "</strong></p>"
    myHtmlOutput = myHtmlOutput + "<p>Try this link: <a href='" + allRecipesLink + "'>AllRecipes</a></p>"
    myHtmlOutput = myHtmlOutput + "<p>Or try this link: <a href='" + foodNetworkLink + "'>Food Network</a></p>"
    res.send(myHtmlOutput);
}

let recipes = [];

app.post('/shareRecipe', myShareRecipeRequestHandler);
function myShareRecipeRequestHandler(req, res){

    console.log(req.body);

    let recipe = req.body.recipe;
    
    recipes.push(recipe);
    console.log('Got POST request to /shareRecipe with recipe: ' + recipe);

    res.redirect('/recipes');
} 


app.get('/recipes', myGetRecipesRequestHandler);
function myGetRecipesRequestHandler(req, res){

    let dataToRender = {
        myRecipes: recipes
    };

    res.render('recipes.ejs', dataToRender);
}

let cuisines = [
    "Italian",
    "Mexican",
    "Chinese",
    "Japanese",
    "Indian",
    "Thai",
    "French",
    "Greek",
    "Spanish",
    "Korean",
    "Vietnamese",
    "Turkish",
    "Moroccan",
    "Brazilian",
    "Lebanese",
    "Ethiopian",
    "Peruvian",
    "Caribbean",
    "German",
    "American",
    "Mediterranean",
    "Middle Eastern",
    "Polish",
    "Russian",
    "Portuguese",
    "Malaysian",
    "Indonesian",
    "Filipino",
    "Argentinian",
    "Cuban"
];

app.get("/welcome", myWelcomeRequestHandler);
function myWelcomeRequestHandler(req, res){
    let userName = req.query.userName || 'Guest';
    let favoriteFood = req.query.favoriteFood || 'pizza';

    let randomCuisine = cuisines[Math.floor(Math.random() * cuisines.length)]
    let dataToRender = {
        userName: userName,
        favoriteFood: favoriteFood,
        cuisine: randomCuisine
    }

    res.render('welcome.ejs', dataToRender)
}

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
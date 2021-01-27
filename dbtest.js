const db = require("./models");

db.user.findOrCreate({
    where: {
        id: 1
    }
}).then(([user, created]) => {
    db.cocktail.findOrCreate({
        where: {
            name: "paloma"
        }
    }).then(([cocktail, created]) => {
        user.addCocktail(cocktail).then(relationInfo => {
            console.log(`${cocktail.name} added to ${user.name}`);
        })
    })
}).catch(error => {
    console.log(error)
}); 
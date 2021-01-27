const db = require("./models");

db.user.findOrCreate({
    where: {
        id: //change to req.user.id
    }
}).then(([user, created]) => {
    db.cocktail.findOrCreate({
        where: {
            name: //change to req.body.name
        }
    }).then(([cocktail, created]) => {
        user.addCocktail(cocktail).then(relationInfo => {
            console.log(`${cocktail.name} added to ${user.name}`);
        })
    })
}).catch(error => {
    console.log(error)
}); 
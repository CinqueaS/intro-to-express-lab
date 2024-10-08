const express = require(`express`)
const PORT = process.env.PORT || 3000

const app = express()

app.listen(PORT , () => {
    console.log(`The app is on ${PORT}`)
})

app.get(`/`, (req, res) => {
    res.send("This is the landing page")
})

app.get(`/greeting/:username`, (req, res) =>{
    res.send(`Hello there ${req.params.username}. How are you`)
})

app.get(`/roll/:number`, (req, res) =>{
    let max = req.params.number
    if(isNaN(max)){
        res.send(`You must specify a number`)
    } 
    res.send(`You rolled a ${Math.floor(Math.random() * max)}`)
})

app.get(`/collectibles/:index`, (req, res) =>{
    let index = req.params.index
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
      ];
      
      if (req.params.index >= collectibles.length){
        res.send("That item is not yet in stock. Check back later!")
      }
      res.send(`So you want ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!`)
})

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res)=>{
    let a = parseInt(req.query.minprice)
    let z = parseInt(req.query.maxprice)
    let c = req.query.type
    console.log(c)
    if(!Number.isNaN(a)){
        console.log("filter on min")
        let minPriceOutput = shoes.filter((shoe) => shoe.price >= a)
        res.send(minPriceOutput)
    } else if (!Number.isNaN(z)) {
        let maxPriceOutput = shoes.filter((shoe) => shoe.price <= z)
        res.send(maxPriceOutput)
    } else if(typeof c !== 'undefined'){
        let typeOutput = shoes.filter((shoe) => shoe.type === c)
        res.send(typeOutput)
    } else{
        res.send(shoes)}
})
// Rhiannon Obrien code, she explained to me how this was used filter
// through the arrays. I originally tried to use a for loop to complete
// this problem but ran into a lot of errors
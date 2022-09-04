
const PORT = 3000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())



//url holds web address
const url = 'https://www.theguardian.com/us'

//app.METHOD(PATH, HANDLER)

app.get('/', function (req, res) {
    res.json("this is my webscraper")

})

app.get('/results', function (req, res) {
    //using axios
    axios(url)  //using axios with url
        .then(response => {  //waiting for respons 
            const html = response.data  //storing website response data to a variable
            const $ = cheerio.load(html)  //loading response data and putting it into a variable
            const articles = []

            $(".fc-item__title", html).each(function () {
                const title = $(this).text();
                const url = $(this).find('a').attr('href');
                articles.push({
                    title,
                    url
                })
            })
            //console.log(articles)
            res.json(articles)
        }).catch(err => console.log(err))

})


// listening in on port
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`))



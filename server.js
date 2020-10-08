const bodyParse = require('body-parser')
const express = require('express')
	, app = express()
    , multer = require('multer')
    , ejs = require('ejs')
    , path = require('path');

const fs = require('fs')
const dados = require('./db')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {

        // error first callback
        cb(null,Date.now()+'_'+ file.originalname)
    }
});
const upload = multer({storage});

app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/',(req,res,next)=>{res.render('index');})

// rota indicado no atributo action do formulário
app.post('/file/upload', upload.single('file'), 
    (req, res) => res.send(res.render('index')));  

app.get('/forms', (req,res)=>{
    response = {
        nome: req.query.nome,
        sobrenome: req.query.sobrenome,
        idade: req.query.idade
    };
    console.log(response);
    dados.salvarPessoas(response);
    res.end(res.render('index'));
    
})
    
app.listen(3000, () => console.log('App na porta 3000'));
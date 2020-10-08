const fs = require('fs')

const sequence = {
    _id:1,
    get id(){return this._id++}
}

const pessoas = {}

dadosOld = require('./public/dados.json')
for (i in dadosOld){
    salvarPessoa(dadosOld[i])
}

function salvarPessoa(pessoa){
    pessoa.id = sequence.id
    pessoas[pessoa.id]=pessoa
    console.log(pessoa)
    return pessoa
}

function salvarPessoas(pessoa){
    salvarPessoa(pessoa)
    fs.writeFile('./public/dados.json',JSON.stringify(pessoas), err =>{
        console.log(err||'Arquivo Salvo com Sucesso.')});
    return pessoas
}


module.exports = {salvarPessoas}
import myexpress from 'express'
import mysql from 'mysql'
import dovenv from 'dotenv'
import bp from 'body-parser'

dovenv.config()

const app = myexpress()

app.use(bp.json())

const mydb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emplooye_db'
})


mydb.connect(function(err){
    if(err) throw new Error(err)
        console.log('Mysql Databse connected')
})

app.get("/",function(req,res){
    res.send(' you are welcome ')
})

app.get("/employees",function(req,res){
    mydb.query('select * from employees',(err,result)=>{
        if(err) throw new Error(err)
        res.json({message:'get all employees',result})
    })
})

app.get("/employees/:id", function(req,res){
    const id=req.params.id
    mydb.query('select * from employees where id = ? ', [id], (err,result)=>{
        if(err) throw new Error(err)
            res.json({message:'got employee',result})
    })
})

app.post("/employees", function(req,res){
    const {id,name,email,age,created_at}= req.body
    mydb.query('insert into employees (id,name,email,age) values(?,?,?,?)',[id,name,email,age,created_at],(err,result)=>{
       if(err) throw new Error(err)
        res.json({message:'inserted into employees',result})
    })
})

app.put("/employees/:id", function(req,res){
    const id =req.params.id
    const {name,email,age} = req.body
    mydb.query('update employees set name=?,email=?,age=? where id=?',
        [name,email,age,id],(err,result)=>{
        if(err) throw new Error(err)
            res.json({message:'updated employee',result})
    })
})

app.delete('/employees/:id', function(req,res){
    const id =req.params.id
    mydb.query('delete from employees where id = ?', [id],(err,results)=>{
          if(err) throw new Error(err)
        res.json({message: 'delete employee ',results})
    })

})


app.listen("6000",function(){
    console.log('server is running on port 6000')
})


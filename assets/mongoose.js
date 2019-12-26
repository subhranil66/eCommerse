var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://<username>:<password>@cluster0-koel1.mongodb.net/eCommerse?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.set('useFindAndModify', false);


var eSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productDesc: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true
    },
    productQty: {
        type: Number,
        required: true
    },
});

var Ecart = mongoose.model('Ecart', eSchema);


var suSchema = new Schema({
    username: {
        type: String,
        required: true,
        max: 100
    },
    password: {
        type: String,
        required: true,
        max: 100
    },
    confirmpw: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 100
    }
});

var Signedup = mongoose.model('Signedup', suSchema);

var cartSchema = new Schema({
    umail:{
        type: String,
        required: true,
        max: 100
    },
    qty:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
        max: 100
    },
    price:{
        type: Number,
        required: true,
    },
    tprice:{
        type: Number,
        required: true,
    },
    oldid:{
        type: Schema.Types.ObjectId,
        ref: "Ecart",
        required: true
    },
    oldqty:{
        type: Number,
        required: true
    }
});

var Cartitem = mongoose.model('Cartitem', cartSchema);

var tranSchema = new Schema({
    name:{
        type: String,
        required: '{PATH} is required!',
    },
    price:{
        type: Number,
        required: '{PATH} is required!',
    },
    qty:{
        type: Number,
        required: '{PATH} is required!',
    },
    tprice:{
        type: Number,
        required: '{PATH} is required!',
    },
    username:{
        type: String,
        required: '{PATH} is required!',
    },
    email:{
        type: String,
        required: '{PATH} is required!',
    },
    time:{
        type: String,
        required: '{PATH} is required!',
    },
    date:{
        type: String,
        required: '{PATH} is required!',
    },
});

var Transaction = mongoose.model('Transaction', tranSchema);


module.exports = function(app){

    app.use(express.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    


app.post('/addProduct', (req, res)=>{
    var ecart = Ecart(req.body).save((err, data)=>{
        if(err) throw err;
        res.redirect('/addProducts');
    });
});

app.get('/addProducts', (req, res)=>{
    res.render('admin');
});

app.get('/viewProduct', function(req, res){
    Ecart.find({}, (err, data)=>{
        if(err) throw err;
        res.render('view', {data});
    });
});

app.post("/deleteProduct/:id", async (req, res) => {
    const product = await Ecart.findByIdAndDelete({_id: req.params.id});
    res.send(product);
});


app.get('/editProduct/:id',(req, res)=>{
    Ecart.findById(req.params.id)
    .then((data)=>{
        res.render('edit', {data})
    })
    .catch((error)=>{
        console.log(error)
    })
})

app.post("/updateProduct/:id", async (req, res) => {
    const product = await Ecart.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect('/viewProduct')
});

app.get('/', function(req, res){
    Ecart.find({}, (err, data)=>{
        if(err) throw err;
        res.render('user', {data});
    });
});

// signup btn
app.get('/signUp', function(req, res){
    Ecart.find({}, (err, data)=>{
        if(err) throw err;
        res.render('signup', {data});
    });
});

// login btn
app.get('/logIn', function(req, res){
    Ecart.find({}, (err, data)=>{
        if(err) throw err;
        res.render('login', {data});
    });
});

// signup form
app.post('/signedUp', (req, res)=>{
    var signUp = Signedup(req.body).save((err, data)=>{
        if(err) throw err;
        res.redirect('/loggedUser/' + data._id);
    });
});

// login form

app.post('/loggedIn', (req, res)=>{
    Signedup.find({}, (err, data)=>{
        if(err) throw err;
        for(var i=0;i < data.length;i++){
        console.log(data[i].email)
        if(data[i].email == req.body.email){
            if(req.body.email == 'admin123@gmail.com'){
                res.redirect('/viewProduct');
            }
            else{
            res.redirect('/loggedUser/' + data[i]._id);
            }
            flag=1;
            break;
        }
        else{
            flag=0;
        }
    }
    if(flag==0){
            res.send('User Not Found!!! Sign Up First');
    }
    });
    });


// signedUp User
app.get('/loggedUser/:id', function(req, res){
    Signedup.findById(req.params.id, (err, data1)=>{
        if(err) throw err;
        Ecart.find({}, (err, data)=>{
            if(err) throw err;
        res.render('loggeduser', {data1, data});
    });
}); 
});

// cart adding
app.post('/cart/:id/:id1', async(req, res)=>{

    Signedup.findById(req.params.id)
    .then(async(data1)=>{

    Ecart.findById(req.params.id1)
    .then(async(product)=>{
       const newCart = new Cartitem({
            umail: data1.email,
            qty: req.body.qty,
            name: product.productName,
            price: product.productPrice,
            tprice: product.productPrice*req.body.qty,
            oldid: product._id,
            oldqty: product.productQty
       })
       newCart.save()
       .then(()=>{
        res.send({success: true})
       })
       .catch((error)=>{
        console.log(error)
       })

    })
    .catch((error)=>{
        console.log(error)
    })
})
.catch((error)=>{
    console.log(error)
})
});

// viewcart btn
app.get('/eCart/:id', function(req, res){
    Signedup.findById(req.params.id, (err, data1)=>{
        if(err) throw err;

        Cartitem.find({}, (err, data)=>{
            if(err) throw err;

            var arrcart = []
            for(i=0;i<data.length;i++){
                if( data[i].umail == data1.email ){
                    arrcart.push(data[i])
                }
            }
            res.render('cart', {data1, arrcart});
    });
    });
});

// delete from cart
app.delete("/deletecartproduct/:id", async (req, res) => {
    const product = await Cartitem.findByIdAndDelete({_id: req.params.id});

    console.log(product);
    res.send(product);
});

// add to transaction

app.post('/buy/:id/:id1', async (req, res)=>{

    const date = new Date();

    var su = await Signedup.findById(req.params.id)
    .then( async (data1)=>{

    var ci = await Cartitem.findByIdAndDelete(req.params.id1)
    .then(async (data)=>{
        
       const newtran1 = new Transaction({
            qty: data.qty,
            name: data.name,
            price: data.price,
            tprice: data.tprice,
            username: data1.username,
            email: data1.email,
            date: date.getDate() + "/" + `${date.getMonth()+1}` + "/" + date.getFullYear(),
            time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
       })
       newtran1.save()
       .then(()=>{
        res.send({success: true})
       })
       .catch((error)=>{
        console.log(error)
       })

    const oldid = data.oldid
    const quantity = data.qty
    const mainproduct = await Ecart.findByIdAndUpdate({ _id: oldid }, {
        $inc: {
            productQty: -quantity
        }
    }, { new: true })

    Ecart.findOne({ _id: oldid}, async(err, dt)=>{
    
    var id = data.oldid

    await Cartitem.find()
    .then(async(p)=>{
        for(var i=0; i < p.length; i++) {
            if( id.toString() == p[i].oldid.toString() ){
            
                Cartitem.findByIdAndUpdate(p[i]._id, {$set:{oldqty:dt.productQty}}, {new: true})
                .then(()=>{
                    console.log('ok')
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        }
    })
    .catch((error)=>{
        console.log(error)
    })
})


    })
    .catch((error)=>{
        console.log(error)
    })
})
.catch((error)=>{
    console.log(error)
})

});


// view transaction page
app.get('/eTransaction', function(req, res){
    Transaction.find({}, (err, data)=>{
        if(err) throw err;
        res.render('transaction', {data});
    })
});

}

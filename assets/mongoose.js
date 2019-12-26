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
    //    max: 100
    },
    productDesc: {
        type: String,
        required: true,
    //    max: 100
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
    //    max: 100
    },
    name:{
        type: String,
        required: true,
        max: 100
    },
    price:{
        type: Number,
        required: true,
    //    max: 100
    },
    tprice:{
        type: Number,
        required: true,
    //    max: 100
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
    // tid:{
    //     type: Number,
    //     // required: true,
    //     required: '{PATH} is required!',
    // },
    name:{
        type: String,
        // required: true,
        required: '{PATH} is required!',
    },
    price:{
        type: Number,
        // required: true,
        required: '{PATH} is required!',
    },
    qty:{
        type: Number,
        // required: true,
        required: '{PATH} is required!',
    },
    tprice:{
        type: Number,
        // required: true,
        required: '{PATH} is required!',
    },
    username:{
        type: String,
        // required: true,
        required: '{PATH} is required!',
    },
    email:{
        type: String,
        // required: true,
        required: '{PATH} is required!',
    },
    time:{
        type: String,
        // required: true,
        required: '{PATH} is required!',
    },
    date:{
        type: String,
        // required: true,
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
    // console.log(product);
    res.send(product);
});

// app.get("/editProduct/:id", (req, res) => {
//     Ecart.findById({_id: req.params.id}, (err, data)=>{
//         console.log(data);
//         res.render('edit', {data});
        
//     });
// });

app.get('/editProduct/:id',(req, res)=>{
    //console.log(req.params.id)
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
    // if(err) throw err;
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
    // var logIn = (req.body).save((err, data)=>{
    //     if(err) throw err;
    Signedup.find({}, (err, data)=>{
        if(err) throw err;
        // res.render('login', {data});
        // console.log(data.length)
        for(var i=0;i < data.length;i++){
        console.log(data[i].email)
        if(data[i].email == req.body.email){
            if(req.body.email == 'admin123@gmail.com'){
                res.redirect('/viewProduct');
            }
            else{
            res.redirect('/loggedUser/' + data[i]._id);
            }
            // req.session.email = data[i].email;
            // req.session.username = data[i].username;
            // console.log("ajsgsa = "+req.session.email);
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

/*
    app.post('/loggedIn', (req, res)=>{
        // var logIn = (req.body).save((err, data)=>{
        //     if(err) throw err;
        Signedup.findOne({email: req.body.email}, (err, data)=>{
            if(err) throw err;
            // res.render('login', {data});
            // console.log(data.email)
                // req.session.email = data.email;
                req.session.email = data.email
                req.session.username = data.username;
                res.redirect('/loggedUser/' + data._id);
                // console.log("ajsgsa = "+req.session.email);
                // flag=1;
            //    break;
        
        });
        });
*/

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
    // var cart = Cartitem.findById(req.params.id).save((err, data)=>{
    //     if(err) throw err;
    //     res.redirect('/eCart');
    // });

    Signedup.findById(req.params.id)
    .then(async(data1)=>{
        // console.log(data1._id);

    Ecart.findById(req.params.id1)
    .then(async(product)=>{
        // console.log(product._id)
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


    //    const oldid = product._id
    // const quantity = req.body.qty
    // const mainproduct = await Ecart.findByIdAndUpdate({ _id: oldid }, {
    //     $inc: {
    //         productQty: -quantity
    //     }
    // }, { new: true })


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

    // const oldid = product.oldid
    // const quantity = product.qty
    // const mainproduct = await Ecart.findByIdAndUpdate({ _id: oldid }, {
    //     $inc: {
    //         productQty: +quantity
    //     }
    // }, { new: true })

    console.log(product);
    res.send(product);
});

// remove from cart after transaction
// app.post("/buy/:id", async (req, res) => {
//     const product = await Cartitem.findByIdAndDelete({_id: req.params.id});
//     console.log(product);
//     res.send(product);
// });

// add to transaction

app.post('/buy/:id/:id1', async (req, res)=>{

    const date = new Date();

    var su = await Signedup.findById(req.params.id)
    .then( async (data1)=>{

    var ci = await Cartitem.findByIdAndDelete(req.params.id1)
    .then(async (data)=>{
        // console.log(data)
        
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


    //    const cartproduct = Cart.findOneAndDelete({ _id: req.params.id }) {'$set' :{Checked: true}}
    const oldid = data.oldid
    const quantity = data.qty
    const mainproduct = await Ecart.findByIdAndUpdate({ _id: oldid }, {
        $inc: {
            productQty: -quantity
        }
    }, { new: true })

    Ecart.findOne({ _id: oldid}, async(err, dt)=>{
    
    var id = data.oldid
    // const quan = data.qty

    await Cartitem.find()
    .then(async(p)=>{
        for(var i=0; i < p.length; i++) {
            // console.log(typeof(id))
            // console.log(typeof(p[i].oldid))
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


/*
app.post("/buy/:id", async (req,res)=>{
    try{
        var cartproduct = await Cartitem.findById({_id: req.params.id});
        var qty = cartproduct.qty;
        var name = cartproduct.name;
        var price = cartproduct.price;
        var tprice = cartproduct.tprice;

        var date = new Date();
        var data = {
            name: cartproduct.name,
            price: cartproduct.price,
            qty: cartproduct.qty,
            tprice: cartproduct.tprice,
            username: req.session.username,
            email: req.session.email,
            date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
            time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        }
        
        var transaction = new Transaction(data)
        const savedtran = await transaction.save()
        console.log(savedtran)
        res.send("product purchased successfully")
        Cartitem.findByIdAndDelete({_id: req.params.id});
        res.redirect('/eCart');
    }
    catch(err){
        console.log(err)
        // res.send("Something went wrong")
    }
})
*/

// view transaction page
app.get('/eTransaction', function(req, res){
    // var transactions = Transaction.find()
    Transaction.find({}, (err, data)=>{
        if(err) throw err;
        res.render('transaction', {data});
    })
});

}

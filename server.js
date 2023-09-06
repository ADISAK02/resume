const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Product = require('./models/product')

const cors = require('cors');
const req = require('express/lib/request');
app.use(cors());
mongoose.connect(
    'mongodb+srv://root:631411015@cluster0.8tpnnbx.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true }
);
app.use(express.json());

app.listen(port, () => {
    console.log(`Application is running (PROT: ${port})`);
});

app.get('/getallproduct', async (req, res) => {
    const response = await Product.find();
    res.json(response);
});

app.post('/create', async (req, res) => {
    let product = new Product(req.body);
    await product.save();
    res.json({
        'status': 'success'
    });
});

app.post('/update/:_id', async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findByIdAndUpdate({_id: _id}, req.body);
    res.json({
        'status': 'success',
        'data': product
    });
});

app.delete('/destory/:_id', async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findByIdAndDelete({_id: _id}, req.body);
    res.json({
      'status':'success' ,
      'data': 'wow!!!!!!'
    });
  });

app.get('/getproduct/:_id', async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findOne({ _id: _id });
    res.json({
        'status': 'success',
        'data': product
    })
});

const express = require ('express');
const router = express.Router();

const {BlogPosts} = require('./models');


BlogPosts.create();
BlogPosts.create();

//Begin get request
BlogPosts.get();

//Begin post request with create function

//Begin put request with update function 

//Begin delete request
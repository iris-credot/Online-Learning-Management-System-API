const Userrouter = require('./userroute');
const Announcerouter = require('./announceroute');
const Assignrouter = require('./assignroute');
const Courserouter = require('./courseroutes');
const Discrouter = require('./discroute');
const Graderouter = require('./graderoute');
const Quizrouter = require('./quizroute');
const Subrouter = require('./subroute');
const Contentrouter = require('./contentroute');
const express = require('express');
const notify = require('../middleware/Notify');

const Router= express.Router();

Router.use('/user', Userrouter);
Router.use('/announce',Announcerouter);
Router.use('/assign',Assignrouter);
Router.use('/course',Courserouter);
Router.use('/disc',Discrouter);
Router.use('/grade',Graderouter);
Router.use('/quiz',Quizrouter);
Router.use('/sub',Subrouter);
Router.use('/content',Contentrouter);

module.exports = Router;
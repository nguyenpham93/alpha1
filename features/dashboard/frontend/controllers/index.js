'use strict';
let moment = require('moment');
module.exports = function (controller, component, application) {

    controller.index = function (req, res) {

        let page = req.params.page || 1;
        let itemOfPage = application.getConfig("pagination").frontNumberItem || 5;
        let totalPage = 1;

        application.feature.blog.actions.findAndCountAll({
            where : {
                published : 1,
                type : 'post'
            },

            include : [{
                model : application.models.user
            }],

            limit  : itemOfPage,

            offset : (page - 1) * itemOfPage,

            order  : "id desc"

        })
        .then ((results) => {
            totalPage = Math.ceil( results.count/itemOfPage );

            res.frontend.render('index', {
                title       : 'ngonvl.com',
                posts       : results.rows,
                totalPage   : totalPage,
                itemOfPage  : itemOfPage,
                currentPage : page
            })

        });
    };

    controller.index2 = function (req, res) {

        let page = req.params.page || 1;
        let itemOfPage = application.getConfig("pagination").frontNumberItem || 5;
        let totalPage = 1;

        application.feature.blog.actions.findAndCountAll({
            where : {
                published : 1,
                type : 'post'
            },

            include : [{
                model : application.models.user
            }],

            limit  : itemOfPage,

            offset : (page - 1) * itemOfPage,

            order  : "id desc"

        })
        .then ((results) => {
            totalPage = Math.ceil( results.count/itemOfPage );

            res.json({
                posts       : results['rows'],
                totalPage   : totalPage,
                itemOfPage  : itemOfPage,
                currentPage : page
            });

        });
    };
};
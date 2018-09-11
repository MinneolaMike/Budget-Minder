var db = require("../models");

module.exports = function (app) {
  // ------------to find all(All the expenses with the same user)--------
  app.get("/api/expenses", function (req, res) {
    db.Expenses.findAll({}).then(function (dbExpenses) {
      res.json(dbExpenses);
      console.log(dbExpenses);
    });
  });

  // -----API route for the Categorywise expenses-------
  app.get("/api/expenses/summary/:email", function (req, res) {
    db.Expenses.findAll({
      attributes: ['category', [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'tot_amt']],
      where: {
        email: req.params.email
      },
      group: 'category'
    }).then(function (sum) {
      res.json(sum);
      console.log(sum);
    });
  });

  // -----POST route for new expenses source for the same user-----
  app.post("/api/create", function (req, res) {
    console.log(req.body);
    db.Expenses.create({
      source: req.body.source,
      category: req.body.category,
      amount: req.body.amount,
      userID: req.body.userID
    }).then(function (dbExpenses) {
      res.json(dbExpenses);
    });
  });

  // --------DELETE route to Delete Expenses by id
  app.delete("/api/expenses/:id", function (req, res) {
    console.log(req.params.id);
    db.Expenses.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExpenses) {
      res.json(dbExpenses);
    });
  });

  app.post("/api/expenses/", function (req, res) {
    db.Expenses.create({
      source: req.body.source,
      category: req.body.category,
      amount: req.body.amount,
      email: req.body.email
    }).then(function (dbExpenses) {
      res.json(dbExpenses);
    });
  });

  app.get("/api/expenses/:id", function (req, res) {
    db.Expenses.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbExpense) {
      res.json(dbExpense);
    });
  });

  app.get("/api/expenses/total/:email", function (req, res) {
    db.Expenses.findAll({
      attributes: [[db.sequelize.fn('SUM', db.sequelize.col('amount')), 'tot_amt']],
      where: {
        email: req.params.email
      }
    }).then(function (sum) {
      res.json(sum);
      console.log(sum);
    });
  });

  app.get("/api/expenses/detail/:email", function (req, res) {
    db.Expenses.findAll({
      where: {
        email: req.params.email
      }
    }).then(function (dbExpenses) {
      res.json(dbExpenses);
      console.log(dbExpenses);
    });
  });

};

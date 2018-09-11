var emailForm = $(".member-name")

var expenseSource = $("input#expense-source");
var expenseCategory = $("input#expense-category");
var expenseAmount = $("input#expense-amount");
var expenseSubmitBtn = $("#submit-expense");

var incomeSource = $("input#income-source");
var incomeCategory = $("input#income-category");
var incomeAmount = $("input#income-amount");
var incomeSubmitBtn = $("#submit-income");

var deleteExpenseBtn = $(".deleteExpense");
var deleteIncomeBtn = $(".deleteIncome");

var handleExpenseSubmit = function (event) {
  event.preventDefault();

  if (!(expenseSource && expenseCategory && expenseAmount)) {
    alert("You must enter an example text and description!");
    return;
  }

  var expense = {
    source: expenseSource.val().trim(),
    category: expenseCategory.val().trim(),
    amount: expenseAmount.val().trim(),
    email: emailForm.text()
  };

  submitExpense(expense)

  expenseSource.val("");
  expenseCategory.val("");
  expenseAmount.val("");
};

var handleIncomeSubmit = function (event) {
  event.preventDefault();

  if (!(incomeSource && incomeCategory && incomeAmount)) {
    alert("You must enter an example text and description!");
    return;
  }

  var income = {
    source: incomeSource.val().trim(),
    category: incomeCategory.val().trim(),
    amount: incomeAmount.val().trim(),
    email: emailForm.text()
  };

  submitIncome(income)

  incomeSource.val("");
  incomeCategory.val("");
  incomeAmount.val("");
};

function submitExpense(Expense) {
  $.post("/api/expenses/", Expense, function () {
    window.location.reload();
  })
}

function submitIncome(Income) {
  $.post("/api/incomes/", Income, function () {
    window.location.reload();
  })
}

function handleExpenseDelete() {
  var currentExpense = $(this).attr("data-expenseid")
  deleteExpense(currentExpense);
  window.location.reload();
}

function handleIncomeDelete() {
  var currentIncome = $(this).attr("data-incomeid")
  deleteIncome(currentIncome);
  window.location.reload();
}

function deleteExpense(id) {
  $.ajax({
    method: "DELETE",
    url: "/api/expenses/" + id
  })
    .then(function () {
    });
}

function deleteIncome(id) {
  $.ajax({
    method: "DELETE",
    url: "/api/incomes/" + id
  })
    .then(function () {
    });
}

expenseSubmitBtn.on("click", handleExpenseSubmit);
incomeSubmitBtn.on("click", handleIncomeSubmit);
deleteExpenseBtn.on("click", handleExpenseDelete);
deleteIncomeBtn.on("click", handleIncomeDelete);


// CHART FOR THE NET DIFFERENCE
var ctxOne = $("#myChartNet");
netDataSet = [];

var getNetData = function () {
  $.get("/api/user_data").then(function (data) {
    email = data.email;
    $.get("/api/incomes/total/" + email).then(function (datatwo) {
      netDataSet.push(datatwo[0].tot_amt);
      // console.log(datatwo[0].tot_amt);
      $.get("/api/expenses/total/" + email).then(function (datathree) {
        // console.log(datathree[0].tot_amt);
        netDataSet.push(datathree[0].tot_amt);
        // console.log(netDataSet)
        new Chart(ctxOne, {
          type: "horizontalBar",
          data: {
            labels: ["INCOME", "EXPENSES"],
            datasets: [{
              // data: [netDataSet[0], netDataSet[2]],
              data: netDataSet,
              backgroundColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255,99,132,1)"],
            }]
          },
          options: {
            legend: {
              display: false,
            },
            // title: {
            //   display: true,
            //   text: 'Expenses vs. Income'
            // },
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
        $("#netDollars").text(netDataSet[0] - netDataSet[1]).toFixed(2);
      });
    });
  });
}

getNetData();

// CHART FOR INCOME
var setBackgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)"
]

var setBorderColor = [
  "rgba(255,99,132,1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)"
]

var ctxTwo = $("#myChartIncome");
var incomeLabels = [];
var incomeData = [];
var incomeBackgroundColor = [];
var incomeBorderColor = []

var getIncome = function () {
  $.get("/api/user_data").then(function (data) {
    email = data.email;
    $.get("/api/incomes/summary/" + email).then(function (datatwo) {
      for (i = 0; i < datatwo.length; i++) {
        incomeLabels.push(datatwo[i].category);
        incomeData.push(datatwo[i].tot_amt);
        incomeBackgroundColor.push(setBackgroundColor[i % setBackgroundColor.length]);
        incomeBorderColor.push(setBorderColor[i % setBorderColor.length]);
      }
      new Chart(ctxTwo, {
        type: "doughnut",
        data: {
          labels: incomeLabels,
          datasets: [{
            label: "",
            data: incomeData,
            backgroundColor: incomeBackgroundColor,
            borderColor: incomeBorderColor,
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false,
          }
        }
      });
    });
  });
}

getIncome();

// CHART FOR EXPENSES
var ctxThree = $("#myChartExpense");
var expenseLabels = [];
var expenseData = [];
var expenseBackgroundColor = [];
var expenseBorderColor = [];

var getExpense = function () {
  $.get("/api/user_data").then(function (data) {
    email = data.email;
    $.get("/api/expenses/summary/" + email).then(function (datatwo) {
      console.log(datatwo)
      for (i = 0; i < datatwo.length; i++) {
        expenseLabels.push(datatwo[i].category);
        expenseData.push(datatwo[i].tot_amt);
        expenseBackgroundColor.push(setBackgroundColor[i % setBackgroundColor.length]);
        expenseBorderColor.push(setBorderColor[i % setBorderColor.length]);
      }
      new Chart(ctxThree, {
        type: "doughnut",
        data: {
          labels: expenseLabels,
          datasets: [{
            label: "",
            data: expenseData,
            backgroundColor: expenseBackgroundColor,
            borderColor: expenseBorderColor,
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false,
          }
        }
      });
    });
  });
};

getExpense();

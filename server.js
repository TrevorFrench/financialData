const express = require('express'); // easier to work with that the HTTP module.
const path = require('path'); // works with diretories and file paths
var bodyParser = require("body-parser");

const app = express(); // instantiate the module into a variable

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');


const https = require('https');

app.set("port", (process.env.PORT || 5000)); // sets the port to 5000
app.listen(app.get("port"), function () { // listens on the port and displays a message to the console
	console.log("Now listening for connection on port: " + app.get("port"));
});
app.use(express.static(path.join(__dirname, ''))); // this allows js and css files to be linked to the HTML

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html'))); // when the root directory loads, sendthe index.html file to the client

app.post('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

/*********************/
/*********************/
/*********************/
app.post('/getData', function(req, res) {
  const https = require('https');
	var persand;

  console.log(req.body.ticker);

	if (req.body.frequency == "period=quarter"){
		persand = req.body.frequency + "&apikey=aa1c38da7bdac1fe4a2cc0aaa2f7dcfa";
	}
		else {
			persand = "apikey=aa1c38da7bdac1fe4a2cc0aaa2f7dcfa";
		}

	console.log("FREQUENCY: " + req.body.frequency)

	console.log(persand);

https.get('https://financialmodelingprep.com/api/v3/financials/income-statement/' + req.body.ticker + "?" + persand, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  console.log(data);

  // The whole response has been received. Print out the result.
  resp.on('end', () => {

    let dataData = [];
    let labelsData = [];
    let npmData =[];
    let gmData = [];
    let fcfmData = [];
    let corData = [];
    let radData = [];
    let sgaData = [];
    let oeData =[];
    let ieData = [];
    let iteData = [];
    let dividendData = [];
    let epsData = [];
    let text = JSON.parse(data).financials;
    let textTwo = "<table><tr><th class='sticky-col first-col'>Date</th><th>Revenue (in 1000s)</th><th>Cost of Revenue</th><th>Gross Profit</th><th>R&D Expenses</th><th>SG&A Expense</th><th>Operating Expenses</th><th>Operating Income</th><th>Interest Expense</th><th>Earnings before Tax</th><th>Income Tax Expense</th><th>Net Income</th><th>Preferred Dividends</th><th>Net Income Com</th><th>EPS</th><th>EPS Diluted</th><th>Weighted Average Shares Out</th><th>Weighted Average Shares Out (Dil)</th><th>Dividend per Share</th><th>Gross Margin</th><th>EBITDA Margin</th><th>EBIT Margin</th><th>Profit Margin</th><th>Free Cash Flow Margin</th><th>EBITDA</th><th>EBIT</th><th>Consolidated Income</th><th>Earnings Before Tax Margin</th><th>Net Profit Margin</th></tr>";
    var x;
    let i = 0;
    console.log(text);
    if (text!= undefined){
      var keys = Object.keys(text);
      for (x in text) {
      dataData.push(text[x].Revenue);
      npmData.push(text[x]['Net Profit Margin']);
      gmData.push(text[x]['Gross Margin']);
      fcfmData.push(text[x]['Free Cash Flow margin']);
      corData.push(text[x]['Cost of Revenue']);
      radData.push(text[x]['R&D Expenses']);
      sgaData.push(text[x]['SG&A Expense']);
      oeData.push(text[x]['Operating Expenses']);
      ieData.push(text[x]['Interest Expense']);
      iteData.push(text[x]['Income Tax Expense']);
      dividendData.push(text[x]['Dividend per Share']);
      epsData.push(text[x].EPS);
      labelsData.push('"' + text[x].date + '"');
      textTwo += "<tr><td class='sticky-col first-col'>" + text[x].date + "</td><td>" + text[x].Revenue / 1000 + "</td><td>" + text[x]['Cost of Revenue'] + "</td><td>" + text[x]['Gross Profit'] + "</td><td>" + text[x]['R&D Expenses'] + "</td><td>" + text[x]['SG&A Expense'] + "</td><td>" + text[x]['Operating Expenses'] + "</td><td>" + text[x]['Operating Income'] + "</td><td>" + text[x]['Interest Expense'] + "</td><td>" + text[x]['Earnings before Tax'] + "</td><td>" + text[x]['Income Tax Expense'] + "</td><td>" + "</td><td>" + text[x]['Net Income'] + text[x]['Preferred Dividends'] + "</td><td>" + text[x]['Net Income Com'] + "</td><td>" + text[x]['EPS'] + "</td><td>" + text[x]['EPS Diluted'] + "</td><td>" + text[x]['Weighted Average Shs Out'] + "</td><td>" + text[x]['Weighted Average Shs Out (Dil)'] + "</td><td>" + text[x]['Dividend per Share'] + "</td><td>" + text[x]['Gross Margin'] + "</td><td>" + text[x]['EBITDA Margin'] + "</td><td>" + text[x]['EBIT Margin'] + "</td><td>" + text[x]['Profit Margin'] + "</td><td>" + text[x]['Free Cash Flow margin'] + "</td><td>" + text[x]['EBITDA'] + "</td><td>" + text[x]['EBIT'] + "</td><td>" + text[x]['Consolidated Income'] + "</td><td>" + text[x]['Earnings Before Tax Margin'] + "</td><td>" + text[x]['Net Profit Margin'] +"</td></tr>";
      i++;
      }
    textTwo += "</table>";
      console.log(textTwo);

      res.render('data.ejs', {
        statusMessage: textTwo,
        cor: corData,
        rad: radData,
        sga: sgaData,
        oe: oeData,
        ie: ieData,
        ite: iteData,
        gm: gmData,
        fcfm: fcfmData,
        data: dataData,
        npm: npmData,
        dividend: dividendData,
        eps: epsData,
        labels: labelsData
                 });
    } else {
      res.render('data.ejs', {statusMessage: "Error. Please double check to make sure you spelled your ticker correctly and make sure that you did not include any spaces."});
    }
  });


}).on("error", (err) => {
  console.log("Error: " + err.message);
});
});
/*********************************************/

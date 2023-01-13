const submitButton = document.getElementById("submitButton");
const calculateButton = document.getElementById('calculate_button');
const calculatePage = document.getElementById('calculationFormContanier');

let electricity_bill = 0;
let petrol_bill = 0;
let oil_bill = 0;
let lpg_bill = 0;

let carbon_footprint_by_electricity = 0;
let carbon_footprint_by_petrol = 0;
let carbon_footprint_by_oil = 0;
let carbon_footprint_by_lpg = 0;
let ideal_carbonFootprint = 42;
let current_carbonFootprint = 0;

let total_carbon_footprint = 0;
let pounds_of_CO2 = 0;

let zeropointone_percent = 0;
let data = [];
let lstWeeks = [];

submitButton.addEventListener('click', click);
function click(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let city = document.getElementById('city').value;
    if (name.length != 0 && email.length != 0 && city.length != 0){
        document.getElementById('infoPageContainer').style.display = 'none';
        document.getElementById('calculationPageContainer').style.display = 'block';
    }
};


// this will show the loading page when credential will be filled
calculateButton.addEventListener('click',showLodingPage);

function showLodingPage(){
    if(document.getElementById("Electricity_Bill").value.length !=0 && document.getElementById('Petrol').value.length != 0 && document.getElementById('diesel').value.length != 0 && document.getElementById('lpg').value.length != 0){
      electricity_bill = document.getElementById("Electricity_Bill").value;
      petrol_bill = document.getElementById("Petrol").value;
      oil_bill = document.getElementById('diesel').value;
      lpg_bill = document.getElementById('lpg').value;
      document.getElementById('body').classList.add("body");
      prepareData();
      document.getElementById('calculationPageContainer').style.display = 'none';
      document.getElementById('resultPageContainer').style.display = 'block';
      document.getElementById('result-graph').style.display = 'flex';
      // code for showing total cf and related stuff
};


//Peparing data for the graph and result page
function prepareData(){
    carbon_footprint_by_electricity = parseFloat((electricity_bill*0.85)).toFixed(2)
    carbon_footprint_by_lpg = parseFloat((lpg_bill*2.983)).toFixed(2);
    carbon_footprint_by_oil = parseFloat((oil_bill*2.653 )).toFixed(2);
    carbon_footprint_by_petrol = parseFloat((petrol_bill*2.296)).toFixed(2);

    total_carbon_footprint= +carbon_footprint_by_electricity + +carbon_footprint_by_lpg + +carbon_footprint_by_oil + +carbon_footprint_by_petrol;

    pounds_of_CO2 = parseFloat(total_carbon_footprint*2.204).toFixed(0);
    console.log(total_carbon_footprint);

    window.xValues = ["Electricity", "Petrol", "Diesel", "LPG"];
    window.yValues = [+carbon_footprint_by_electricity, +carbon_footprint_by_petrol, +carbon_footprint_by_oil, +carbon_footprint_by_lpg, 0];
    window.barColors = ["red", "green","blue","orange","brown"];
}; 
    showgraph();
    showtotalcfc();
};

function showtotalcfc(){
  if (+pounds_of_CO2<44){
    console.log("hello");
    document.getElementById('totalCFCContainer').style.display = 'block';
    document.getElementById('idealContainer').style.display = 'block';
    document.getElementById('idealtotalcf').innerHTML = pounds_of_CO2 + 'pounds';
  }
  else if (44<= +pounds_of_CO2 && +pounds_of_CO2 < 60){
    console.log("hello");
    document.getElementById('totalCFCContainer').style.display = 'block';
    document.getElementById('averageContainer').style.display = 'block';
    document.getElementById('averagetotalcf').innerHTML = pounds_of_CO2 + 'pounds';
  }
  else if (60<= +pounds_of_CO2){
    console.log("hello");
    document.getElementById('totalCFCContainer').style.display = 'block';
    document.getElementById('dangerContainer').style.display = 'block';
    document.getElementById('dangertotalcf').innerHTML = pounds_of_CO2 + 'pounds';
  }
}

//js for graph starts here
function showgraph(){
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Your Carbon footprint data"
      }
    }
  }); 
};

document.getElementById('solution-button').addEventListener('click',improvementTrigger);

function improvementTrigger(){
  current_carbonFootprint = pounds_of_CO2;
  data.push(current_carbonFootprint);
  zeropointone_percent = 1/1000*current_carbonFootprint;
  max_value_of_y = pounds_of_CO2;
  preparingData();
  document.getElementById('totalCF').innerHTML = pounds_of_CO2;
  document.getElementById('pointoneCF').innerHTML = zeropointone_percent;
  document.getElementById('solutionContainer').style.display = 'flex';
}
function preparingData(){
  let count = 0;
  while(current_carbonFootprint>ideal_carbonFootprint){
      let n = current_carbonFootprint - zeropointone_percent;
      current_carbonFootprint = n;
      if (count%30 == 0 && count!= 0){
          data.push(parseFloat(n).toFixed(2));
          console.log("hello");
      }
      count++;
  }
  if (current_carbonFootprint == ideal_carbonFootprint || current_carbonFootprint<ideal_carbonFootprint){ 
      let done = false;
      for(let i = 0; i<data.length+1;i++){
          lstWeeks.push((i*30).toString());
          if(i == data.length){
              done = true;
          }
          
      }
      console.log('hello there')
      if (done){
          bar();
          console.log(lstWeeks)
          console.log(data)
          document.getElementById('days').innerHTML = (lstWeeks[lstWeeks.length-1]);
          document.getElementById('chartContainer').style.display = 'block';
          document.getElementById('myChart2').style.display = 'block';
      }
  }
};

function bar(){
  var xValues = lstWeeks;
  var yValues = data;
  showChart();
  function showChart(){
    new Chart("myChart2",{
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "green",
          borderColor: "green",
          data: yValues
          }]
      },
      options: {
          legend: {display: false},
          scales: {
              yAxes: [{
                  ticks: 
                  {min: 30, max:+max_value_of_y}
              }],
          }
      },
    
    });
  }
}
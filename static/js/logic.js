
// //complete dropdown list
(async function testid() {
//     var url = "https://raw.githubusercontent.com/busy0312/Project2_Austin-Animal-Center/master/Animals.csv"
//     var data = await d3.csv(url);
    var data = await d3.json("/getData");
    var animalData = data.map(d => d)
    var type = animalData.map(d => d.Animal_Type)
    // To get dog and cat option in the dropdown
    var filteredtype = type.filter(function (item, pos) {
        return type.indexOf(item) == pos;
    });
    filteredtype.forEach(function (x) {
        var typetag = document.createElement('option');
        typetag.textContent = x
        document.querySelector('#selDataset').appendChild(typetag)
    })
    // call out init data
    var dropdown = d3.selectAll('option');
    var types = dropdown.property('value');
    getdata(types)
})()

//catch dropdown change
d3.selectAll("#selDataset").on("change", handlechange)

function handlechange() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input value from the form
    var choosetype = d3.select("#selDataset").node().value;
    // clear the input value
    d3.select("#selDataset").node().value = " ";
    d3.select(".alert-secondary").node().textContent = ' ';
    // show the id 
    d3.select("#selDataset").node().value = `${choosetype}`;
    // Build the plot with the new data
    getdata(choosetype);
}
// funtion to get count duplicate value in intake and outcome types
function gettypes(x) {
    var animal_counts = {}, i, value;
    for (i = 0; i < x.length; i++) {
        value = x[i];
        if (typeof animal_counts[value] === "undefined") {
            animal_counts[value] = 1;
        } else {
            animal_counts[value]++;
        }
    }
    return animal_counts
}

// function to get ascending value
function sortvalue(list) {
    var sortable = [];
    for (var x in list) {
        sortable.push([x, list[x]]);
    }
    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });
    return sortable
}
// function to get time differences
function difftime(t1, t2) {
    var diff = []
    var diff_days = []
    for (var x in t1, t2) {
        diff.push(Math.abs(t2[x] - t1[x]))
    }
    var diff_days = diff.map(d => Math.ceil(d / (1000 * 60 * 60 * 24)))
    return diff_days
}




async function getdata(choosetype) {
//     var url = "https://raw.githubusercontent.com/busy0312/Project2_Austin-Animal-Center/master/Animals.csv"
//     var data = await d3.csv(url);
    var data = await d3.json("/getData");
    var animalData = data.map(d => d)
    var animals = animalData.filter(d => d.Animal_Type === choosetype)

    var adoption = animals.filter(d => d.Outcome_Type == 'Adoption')

    // get all time that animals stayed at the center
    var animals_outcome_t = adoption.map(d => d.DateTime_Outcome)
    var animals_intake_t = adoption.map(d => d.DateTime_Intake)
    // parse time
    var outcome_t = animals_outcome_t.map(d => Date.parse(d))
    var intake_t = animals_intake_t.map(d => Date.parse(d))


    // get all the outcome and intake types
    var animals_outcometype = animals.map(d => d.Outcome_Type)
    var animals_intaketype = animals.map(d => d.Intake_Type)


    // To set two dates to two variables 
    var outcome_date = outcome_t.map(d => new Date(d))
    var intake_date = intake_t.map(d => new Date(d))
    // how many adop every year
    var keepyear = outcome_date.map(d => d.getFullYear())
    var total_adopt = gettypes(keepyear)

    // calculate time difference
    const diffdays = difftime(intake_date, outcome_date)

    // sum and get rid of NAN
    const arrSum = diffdays.filter(x => x > 0).reduce((x, y) => x + y, 0)
    // calculate avg
    const Average_days = Math.ceil(arrSum / diffdays.length)
    //append the data on alert bar
    var adpt_time = d3.select('.alert-secondary')
    adpt_time.append('h5').text(`The average time for a ${choosetype} to be adopted is ${Average_days} days.`)

    // counts for different outcome and intake types
    var animal_counts = gettypes(animals_outcometype)
    var animal_counts_intake = gettypes(animals_intaketype)

    //drop undefined value and null
    delete animal_counts_intake['']
    delete animal_counts_intake['null']
    
    // intake value
    var intake_keys = Object.keys(animal_counts_intake)
    var intake_value = Object.values(animal_counts_intake)
    // descending order
    var sortable_counts = sortvalue(animal_counts)

    // Keep top 5 outcome type
    var order = sortable_counts.reverse()
    var top5_outcome = order.slice(0, 5)
    //plotly(line for adoption)
    var trace_adopt = {
        x: Object.keys(total_adopt),
        y: Object.values(total_adopt),
        marker: { color: 'blue' },
        fill: 'tonexty',
        type: "scatter",
    };
    var layout = {
        title: {
            text: 'Adoption over Time',
            font: {
                size: 24,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                color: '#666'

            }
        }
    }
    var config = { responsive: true }
    var data_adopt = [trace_adopt];
    Plotly.newPlot('scatter', data_adopt, layout, config);

    // plotly(bar for outcome)
    var Animals_outcomekey = top5_outcome.map(d => d[0])
    var Animals_outcomevalue = top5_outcome.map(d => d[1])
    // sum all the value and calculate the percentage 
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var sum_outcome=Animals_outcomevalue.reduce(reducer)
    var final=Animals_outcomevalue.map(d=>(d/sum_outcome)*100)
   
    var trace = {
        x: Animals_outcomekey,
        y: final,
        marker: { color: 'DarkSeaGreen' },
        hovertemplate: '%{y:.0f}%' +
                        ' %{x}',
        showlegend: false,
        type: "bar"
    };
    var layout = {
        title: {
            text: 'Where Did the Animals Go?',
            font: {
                size: 24,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                color: '#666'
            },
            yaxis: {
                tickformat: '.0%' 
              }

        }
    }
    var config = { responsive: true }
    var data_bar = [trace];
    Plotly.newPlot("bar", data_bar, layout, config);
    // charts.js doughnut chart
    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
            labels: intake_keys,
            datasets: [
                {
                    // label: " ",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: intake_value
                }
            ]
        },
        options: {
            title: {
                fontSize: 24,
                FontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                display: true,
                text: 'How the Animals Were Found?'
            }
        }
    });


}





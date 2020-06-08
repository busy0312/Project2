
// //complete dropdown list
(async function testid() {
    var url = "https://raw.githubusercontent.com/busy0312/Project2/master/Animals.csv"
    var data = await d3.csv(url);
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
    console.log(choosetype);
    // clear the input value
    d3.select("#selDataset").node().value = " ";
    // show the id 
    d3.select("#selDataset").node().value = `${choosetype}`;
    // Build the plot with the new data
    getdata(choosetype);
}
// funtion to get count duplicate value in intake and outcome types
function gettypes(x){
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

async function getdata(choosetype) {
    var url = "https://raw.githubusercontent.com/busy0312/Project2/master/Animals.csv"
    var data = await d3.csv(url);
    var animalData = data.map(d => d)
    var animals = animalData.filter(d => d.Animal_Type === choosetype)
    var animals_outcometype = animals.map(d => d.Outcome_Type)
    var animals_intaketype = animals.map(d => d.Intake_Type)
    // counts for different outcome and intake types
    var animal_counts = gettypes(animals_outcometype)
    var animal_counts_intake = gettypes(animals_intaketype)
    // intake value
    var intake_keys = Object.keys(animal_counts_intake)
    var intake_value = Object.values(animal_counts_intake)


    // sort for freq outcome and income type
    var sortable = [];
    for (var x in animal_counts) {
        sortable.push([x, animal_counts[x]]);
    }
    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });
    // Keep top 5 outcome type
    var order = sortable.reverse()
    var top5_outcome = order.slice(0, 5)

    // plotly(barchart)
    var Animals_outcomekey = top5_outcome.map(d => d[0])
    var Animals_outcomevalue = top5_outcome.map(d => d[1])
    var trace = {
        x: Animals_outcomekey,
        y: Animals_outcomevalue,
        marker: { color: 'coral' },
        type: "bar",
    };
    var layout = {
        title: {
            text: 'Where Did the Animals Go?',
            font: {
                size: 24,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"

            }
        }
    }
    var data_bar = [trace];
    Plotly.newPlot("bar", data_bar, layout);

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
                display: true,
                text: 'How the Animals Were Found?'
            }
        }
    });



}





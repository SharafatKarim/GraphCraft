var cy = cytoscape({
    container: document.getElementById('cy'),
    layout: {
        name: 'cose'
    },
    "elements": [
    { "data": { "id": "a" } },
    { "data": { "id": "b" } },
    { "data": { "id": "c" } },
    { "data": { "id": "d" } },
    { "data": { "id": "e" } },
    { "data": { "id": "f" } },
    { "data": { "id": "1", "source": "a", "target": "d", "weight": 1 } },
    { "data": { "id": "2", "source": "b", "target": "e", "weight": 2 } },
    { "data": { "id": "3", "source": "c", "target": "f", "weight": 1 } },
    { "data": { "id": "4", "source": "a", "target": "b", "weight": 1 } },
    { "data": { "id": "5", "source": "b", "target": "c", "weight": 2 } },
    { "data": { "id": "6", "source": "c", "target": "d", "weight": 1 } },
    { "data": { "id": "7", "source": "d", "target": "e", "weight": 1 } },
    { "data": { "id": "8", "source": "e", "target": "f", "weight": 2 } },
    { "data": { "id": "9", "source": "f", "target": "a", "weight": 1 } }
],
    style: [
        {
            selector: 'node',
            style: {
                'label': 'data(id)'
            }
        },
        {
            selector: 'edge',
            style: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'label': 'data(weight)'
            }
        }
    ],
    // zoomingEnabled: false, // disable zooming
    userZoomingEnabled: false // disable user zooming
});

document.getElementById('myButton').addEventListener('click', function () {
    console.log('Analyze button clicked!');
    var string = document.getElementById('adjMatInp').value;
    console.log("input text :\n", string);

    // string to 2D array
    var arr = string.split('\n').map(function (line) {
        return line.split(' ');
    });
    console.log("2D array :\n", arr);
    length = arr.length;
    console.log("length : ", length);

    addAdjMatTable(length, arr);
    addNode(length, arr);

    // cy.add([
    //     { group: 'nodes', data: { id: 'a' } },
    //     { group: 'nodes', data: { id: 'b' } },
    //     { group: 'edges', data: { id: 'ab', source: 'a', target: 'b' } },
    //     { group: 'edges', data: { id: 'ba', source: 'b', target: 'a' } }
    // ]);
});

function addNode(length, arr) {
    var nodes = [];
    for (var i = 0; i < length; i++) {
        nodes.push({ data: { id: String.fromCharCode(97 + i) } });
    }
    console.log("nodes : ", nodes);
    cy.add(nodes);

    var edges = [];
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
            if (arr[i][j] != 0) {
                edges.push({ data: { id: i + "" + j, source: String.fromCharCode(97 + i), target: String.fromCharCode(97 + j), weight: arr[i][j] } });
            }
        }
    }
    console.log("edges : ", edges);
    cy.add(edges);
}

document.getElementById('clearGraph').addEventListener('click', function () {
    console.log('Button clicked!');
    cy.remove(cy.elements());
});

function addAdjMatTable(n, arr) {
    document.getElementById('adjText').style.visibility = 'visible';
    var myTableDiv = document.getElementById("adjMatTable");

    if (myTableDiv.hasChildNodes()) {
        myTableDiv.removeChild(myTableDiv.childNodes[0]);
    }

    var table = document.createElement('TABLE');

    table.className = 'table table-hover';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < 1; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j <= n; j++) {
            if (j == 0) {
                var th = document.createElement('TH');
                th.appendChild(document.createTextNode('#'));
                tr.appendChild(th);
                continue;
            }
            var th = document.createElement('TH');
            // th.appendChild(document.createTextNode("To " + toString(j+'a')));
            th.appendChild(document.createTextNode("To " + String.fromCharCode(96 + j)));
            tr.appendChild(th);
        }
    }

    for (var i = 0; i < n; i++) {
        var tr = document.createElement('TR');
        var th = document.createElement('TH');
        // th.appendChild(document.createTextNode("From " + i));
        th.appendChild(document.createTextNode("From " + String.fromCharCode(96 + i + 1)));
        tr.appendChild(th);
        tableBody.appendChild(tr);

        for (var j = 0; j < n; j++) {
            var td = document.createElement('TD');
            td.appendChild(document.createTextNode(arr[i][j]));
            tr.appendChild(td);
        }
    }
    myTableDiv.appendChild(table);
}
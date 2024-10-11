// aisles are defined row-by-row, with a single x/z plane over the y axis
// given to each call. These calls cannot use `...args` expansion because
// Rhino doesn't support it.  These functions can help design multiblocks
// in code, allowing you to transpose and rotate and get an aisle definition
// from a matrix version

// transpose m, assumes all elements of m have the same length
function transpose(m) {
    var transposed = [];
    for(let i=0; i<m[0].length; i++) {
        transposed.push(m.map(row => {
            return row[i];
        }));
    }
    return transposed;
}

// rotate m 90 degrees counter clockwise
function rotate(m) {
    var rotated = [];
    m.forEach(layer => {
        let transposed = [];
        for(let i=0; i<layer[0].length; i++) {
            let sp = layer.map(r => {
                return r[i];
            });
            transposed.push(sp.join(""));
        }
        rotated.push(transposed.reverse());
    })
    return rotated
}

// print "aisle" representations for m
function printAisles(m) {
    let s = "";
    m.forEach(row => {
        s += `\n.aisle(${JSON.stringify(row)})`
    })
    console.log(s);
}
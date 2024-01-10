priority: 0

// take returns a new object attributes from keys taken from obj
function take(obj, keys) {
    let ret = {};
    keys.split('').forEach(key => {
        ret[key] = obj[key];
    })
    return ret
}
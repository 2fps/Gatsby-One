
let throttle = function(delay) {
    let timer = null;

    return function(fn) {
        if (!timer) {
            timer = setTimeout(function() {
                fn();
                timer = null;
            }, delay);
        }
    }
}

export {
    throttle
}
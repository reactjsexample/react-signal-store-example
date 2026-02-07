module.exports = {
    plugins: [
        "babel-plugin-react-compiler", // must run first!
        "module:@preact/signals-react-transform"
    ],
};

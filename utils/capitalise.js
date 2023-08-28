exports.capitalise = (word) => {
    word = word.toString().slice(0,1).toUpperCase() + word.slice(1, word.length);
    return word;
}
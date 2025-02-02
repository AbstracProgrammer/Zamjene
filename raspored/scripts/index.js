const params = new URLSearchParams(window.location.search);
const absent = JSON.parse(params.get("absent"));
console.log(absent);

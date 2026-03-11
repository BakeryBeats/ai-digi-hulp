async function fetchAI(question){

let response = await fetch(
"https://hook.eu1.make.com/4o4be72uc2ov8ygf5vyalydygpmtb0d0",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
question:question
})
});

let data = await response.json();

return data.answer;

}

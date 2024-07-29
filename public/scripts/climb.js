import { setError, setMessage } from "./util.js";

// $("#addComment").on("click", addComment);

// function addComment(event){
//   event.preventDefault();
//   let id = $(event.target).attr("data-id");
//   let txt = $("#comment").val();
//   if(txt.length > 0){ pushComment(id, txt)}
//   // console.log(id, txt)
// }

// async function pushComment(id, text){

//   try {
//     const res = await fetch(`/api/activity/${climbId}`, {
//       method: "POST",
//       body: JSON.stringify({}),
//       headers: { "Content-Type": "application/json" },
//     });
//     if (!res.ok) {
//       if (res.status !== 401) {
//         let m = await res.json();
//         setError(m.message);
//       } else setError("You must be logged in to add a comment");
//       return false;
//     } else {
//       return true;
//     }
//   } catch (err) {
//     setError(err);
//     return false;
//   }
// }


$("#toDoButton").on("click", addActivity);

function addActivity(event) {
  event.preventDefault();
  let id = $(event.target).attr("data-id");

  if(addToActivity(id)){
    $("#toDoButton").css('visibility', 'hidden');
    setMessage("Climb added")
  }
}

async function addToActivity(climbId) {
  try {
    const res = await fetch(`/api/activity/${climbId}`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      if (res.status !== 401) {
        let m = await res.json();
        setError(m.message);
      } else setError("You must be logged in to add a climb activity");
      return false;
    } else {
      console.log("YEAH!!!!");
      return true;
    }
  } catch (err) {
    setError(err);
    return false;
  }
}

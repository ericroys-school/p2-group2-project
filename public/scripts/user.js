$(document).ready(function () {
    renderTodoList();
  });

async function renderTodoList(){
    const td = await getAssoc();
    let climbs = td && td.climbs ? td.climbs : [];

    let a = $("#completeBody");
    a.html = "";
    let climbsHtml = "";
    climbs.forEach(async c => {
        const cc = await getClimb(c.id);
        console.log(JSON.stringify(cc.id))
          a.append(`<h4><p data-climbId="${cc.id}">${cc.name}</p></h4>`);  
    }); 
   // a.html(climbsHtml)
    //console.log(JSON.stringify(x))
}

async function getClimb(climbid){
 let v;
    try {
      let res = await fetch(`/api/climb/${climbid}`);
      if (res.status === 200) {
        v = await res.json();
          console.log(v);
      } else {
        throw "Fetch of climb info failed";
      }
    //   console.log(JSON.stringify(v))
      return v;
    } catch (err) {
      $("#error-msg").text(err);
    }
  
}

function setActiveList(list){

    let a = $("#completeBody");
    a.empty();
    let climbsHtml = "";
    list.forEach(c => {
        // console.log(c.name);
        climbsHtml += `<h4><p data-climbId="${c.id}">${c.name}</p></h4>`;
    });
    a.html(climbsHtml)
}
async function getAssoc() {
    let v = {};
    try {
      let res = await fetch("/api/user/todo");
      if (res.status === 200) {
        v = await res.json();
        //   console.log(v);
      } else {
        throw "Fetch of user info failed";
      }
      return v;
    } catch (err) {
      $("#error-msg").text(err);
    }
  }
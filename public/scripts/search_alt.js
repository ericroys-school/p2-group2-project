// let locationData = getLocations();
///get data
async function getLocations() {
  let v = [];
  try {
    let res = await fetch("/api/location");
    if (res.status === 200) {
      v = await res.json();
      //   console.log(v);
    } else {
      throw "Fetch of location options failed";
    }
    return v;
  } catch (err) {
    $("#error-msg").text(err);
  }
}

async function getAreas(locationId) {
  let v = [];
  try {
    let res = await fetch(`/api/location/${locationId}`);
    if (res.status === 200) {
      let _v = await res.json();
      v = _v.areas || [];
    //   console.log(v);
    } else {
      throw "Fetch of areas failed";
    }
    return v;
  } catch (err) {
    $("#error-msg").text(err);
  }
}

async function getClimbs(areadId) {
    let v = [];
    try {
      let res = await fetch(`/api/area/${areadId}`);
      if (res.status === 200) {
        v = await res.json();
   
        console.log(v);
      } else {
        throw "Fetch of climbs failed";
      }
      return v;
    } catch (err) {
      $("#error-msg").text(err);
    }
  }

async function renderMenuOptions() {
  let locationData = await getLocations();
  if (locationData) {
    let selMen = $("#selectState");
    locationData.forEach((item) => {
      selMen.append(new Option(item.state, item.id));
    });
  } else {
    console.log("No location data");
  }
}

async function stateChangeHandler(event) {

  let selectedStateId = $(this).val();
  let areas = await getAreas(selectedStateId);
  if (areas) {
    let al = $("#areaList");
    areas.forEach((i) => {
      let areaLink = $("<a>")
        .text(i.name)
        .attr("href", "#")
        .data("areaId", i.id);

      al.append($("<div>").append(areaLink));
    });
    $("#areaInfo").empty();
  }
}

async function areaHandler(event){
    event.preventDefault();
    let selectedAreaId = $(this).data("areaId");
    console.log("Selected Area ID: ", selectedAreaId);
    let areaData = await getClimbs(selectedAreaId);
    if(areaData){
        let gmaps = `https://www.google.com/maps?q=${areaData.coordinates}`;
        let climbs = areaData.climbs || [];
        let climbsHtml = climbs.length > 0 ? "<h2>Climbs In This Area</h2>" : "";
        climbs.forEach(climb => {
            climbsHtml += `<div><a href="#" data-climbId="${climb.id}">${climb.name}</a></div>`;
        }) 

        $("#areaInfo").html(
            `<h1>${areaData.name}</h1>
                           <h3>State: ${areaData.location.state}</h3>
                           <p>Coordinates: <a href="${gmaps}" target="_blank">${areaData.coordinates}</a></p>
                           <img src="${areaData.photo}" alt="${areaData.name}" style="max-width: 100%; height: auto;">
                           ${climbsHtml}`
          );
    }
}

function climbHandler(event){
    event.preventDefault();

    let selectedClimbId = $(this).data("climbid");
    console.log("*************: " + selectedClimbId)
    $(location).prop('href', `/climb/${selectedClimbId}`)
    //document.location.replace(`/climb/${selectedClimbId}`);
}

$(document).ready(function () {
  // $("#selectState").on("selectmenuchange", handleSelect);
  // //add listener to addTask button
  // $("#btnAddTask").on("click", handleAddTask);
  // //show task list
  // // renderTaskList();
  renderMenuOptions();
  $("#selectState").on("change", stateChangeHandler);
  $("#areaList").on("click", "a", areaHandler);
  $("#areaInfo").on("click", "a[data-climbid]", climbHandler);
});

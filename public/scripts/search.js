//creates drop down menu
$( function() {
    $( "#selectState" ).selectmenu();
    
        Promise.all([
            fetch('../seeds/area.json').then(response => response.json()),
            fetch('../seeds/location.json').then(response => response.json()),
            fetch('../seeds/climb.json').then(response => response.json()),
            fetch('../seeds/difficulty_yds.json').then(response => response.json()),
            fetch('../seeds/climb_comment.json').then(response => response.json())
        ]) .then(([areaData, locationData, climbData, difficultyData, commentData]) => {
            console.log('Area Data: ', areaData);
            console.log('Location Data: ', locationData);
            console.log('Climb Data: ', climbData);
            console.log('Difficulty Data ', difficultyData);
            console.log('Comment Data: ', commentData);

            const locationDataMap = locationData.reduce((map, item) => {
                map[item.id] = item;
                return map;
            }, {});

            const difficultyMap = difficultyData.reduce((map, item) => {
                map[item.id] = item.name;
                return map;
            }, {});

            const commentMap = commentData.reduce((map, item) => {
                if (item.climb_id && item.text) {
                    map[item.climb_id] = item.text;
                }  
                return map;
            }, {});

            locationData.forEach(item => {
                $("#selectState").append(
                    new Option(item.state, item.id)
                );
            });

        $("#selectState").selectmenu("refresh");

            $("#selectState").on("selectmenuchange", function() {
                var selectedStateId = $(this).val();
                console.log("Selected State ID: ", selectedStateId);

                var areasForState =areaData.filter(item => item.location_id === selectedStateId);

                $("#areaList").empty();
                $("#areaInfo").empty();
                $("#climbList").empty();
                $("#climbInfo").empty();

                $("#areaList").append(`<h2>Area List:</h2>`);

                if (areasForState.length > 0) {
                    areasForState.forEach(item => {
                        var areaLink = $('<a>')
                            .text(item.name)
                            .attr('href', '#')
                            .data('areaId', item.id);

                        $("#areaList").append($('<div>').append(areaLink));
                    });
                    $("#areaInfo").empty();
                };

                $("#areaList").on("click", "a", function(event) {                    
                    event.preventDefault();

                    $("#climbInfo").empty();

                    var selectedAreaId = $(this).data('areaId');
                    console.log("Selected Area ID: ", selectedAreaId);

                    var selectedAreaData = areaData.find(item => item.id === selectedAreaId);
                    console.log('Selected Area Data: ', selectedAreaData);

                    if (selectedAreaData) {

                        var googleMapsUrl = `https://www.google.com/maps?q=${selectedAreaData.coordinates}`;

                        var climbsForArea = climbData.filter(climb => climb.area_id === selectedAreaId);

                        var climbsHtml = climbsForArea.length > 0 ? '<h2>Climbs In This Area:</h2>' : '';
                        climbsForArea.forEach(climb => {
                            climbsHtml += `<div><a href="#" data-climbId="${climb.id}">${climb.name}</a></div>`;
                        });
    
                        $("#areaInfo").html(
                             `<h1>${selectedAreaData.name}</h1>
                             <h3>State: ${locationDataMap[selectedAreaData.location_id].state}</h3>
                             <p>Coordinates: <a href="${googleMapsUrl}" target="_blank">${selectedAreaData.coordinates}</a></p>
                             <img src="${selectedAreaData.photo}" alt="${selectedAreaData.name}" style="max-width: 100%; height: auto;">
                             ${climbsHtml}`
                        );
                    };
            });
        });

            
        

        $("#areaInfo").on("click", "a[data-climbid]", function(event) {
            event.preventDefault();

            var selectedClimbId = $(this).data('climbid');
            console.log("Selected Climb ID: ", selectedClimbId);

            var selectedClimbData = climbData.find(climb => climb.id === selectedClimbId);
            console.log("Selected Climb Data: ", selectedClimbData);

            if (selectedClimbData) {
                var googleMapsUrl = `https://www.google.com/maps?q=${selectedClimbData.coordinates}`;

                const climbComment = commentMap[selectedClimbId] || 'No comment available';

                $("#climbInfo").html(
                    `<h1>${selectedClimbData.name}</h1>
                    <h3>Grade: ${difficultyMap[selectedClimbData.difficulty_id]}</h3>
                    <p>Length: ${selectedClimbData.length} meters</p>
                    <p>Coordinates: <a href="${googleMapsUrl}" target="_blank">${selectedClimbData.coordinates}</a></p>
                    <img src="${selectedClimbData.photo}" alt="${selectedClimbData.name} style="max-width: 100%; height: auto;">
                    <p>Comments:</p>
                    <p>${climbComment}</p>`
                );
            }
        });
    }).catch(error => {
        console.error("error fetching json:", error);
        $("#areaInfo").html("error loading data");
    });
});







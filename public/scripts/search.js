//creates drop down menu
$( function() {
    $( "#selectState" ).selectmenu();
    
        Promise.all([
            fetch('../seeds/area.json').then(response => response.json()),
            fetch('../seeds/location.json').then(response => response.json()),
            fetch('../seeds/climb.json').then(response => response.json())
        ]) .then(([areaData, locationData, climbData]) => {
            console.log('Area Data: ', areaData);
            console.log('Location Data: ', locationData);
            console.log('Climb Data: ', climbData);

            const locationDataMap = locationData.reduce((map, item) => {
                map[item.id] = item;
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

                    var selectedAreaId = $(this).data('areaId');
                    console.log("Selected Area ID: ", selectedAreaId);

                    var selectedAreaData = areaData.find(item => item.id === selectedAreaId);
                    console.log('Selected Area Data: ', selectedAreaData);

                    if (selectedAreaData) {

                        var googleMapsUrl = `https://www.google.com/maps?q=${selectedAreaData.coordinates}`;
    
                        $("#areaInfo").html(
                             `<h1>${selectedAreaData.name}</h1>
                             <h3>State: ${locationDataMap[selectedAreaData.location_id].state}</h3>
                             <p>Coordinates: <a href="${googleMapsUrl}" target="_blank">${selectedAreaData.coordinates}</a></p>
                             <img src="${selectedAreaData.photo}" alt="${selectedAreaData.name}" style="max-width: 100%; height: auto;">
                             <h2>Climbs In The Area:</h2>`
                        );
                    };
            })});
            }) .catch(error => {
                console.error("error fetching json:", error);
                $("#areaInfo").html("error loading data");
            });
                })

                // var selectedLocationData = locationDataMap[selectedId];
                // console.log('Selected Location Data: ', selectedLocationData);
                
                // if (selectedLocationData) {
                // var correspondingAreaData = areaDataMap[selectedLocationData.id];
                // console.log('Corresponding Area Data: ', correspondingAreaData);






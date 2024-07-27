//creates drop down menu
$( function() {
    $( "#selectState" ).selectmenu();
    
        Promise.all([
            fetch('../seeds/area.json').then(response => response.json()),
            fetch('../seeds/location.json').then(response => response.json())
        ]) .then(([areaData, locationData]) => {
            console.log('Area Data: ', areaData);
            console.log('Location Data: ', locationData);

            const locationDataMap = locationData.reduce((map, item) => {
                map[item.id] = item;
                return map;
            }, {});

            const areaDataMap = areaData.reduce((map, item) => {
                map[item.location_id] = item;
                return map;
            }, {});

            locationData.forEach(item => {
                $("#selectState").append(
                    new Option(item.state, item.id)
                );
            });

        $("#selectState").selectmenu("refresh");

            $("#selectState").on("selectmenuchange", function() {
                var selectedId = $(this).val();
                console.log("Selected Location ID: ", selectedId);

                var selectedLocationData = locationDataMap[selectedId];
                console.log('Selected Location Data: ', selectedLocationData);
                
                if (selectedLocationData) {
                var correspondingAreaData = areaDataMap[selectedLocationData.id];
                console.log('Corresponding Area Data: ', correspondingAreaData);

                if (correspondingAreaData) {
                    $("#areaInfo").html(
                         `<h1>${correspondingAreaData.name}</h1>
                         <h3>State: ${selectedLocationData.state}</h3>
                         <p>Coordinates: ${correspondingAreaData.coordinates}</p>
                         <img src="${correspondingAreaData.photo}" alt="${correspondingAreaData.name}" style="max-width: 100%; height: auto;">`
                    );
                };
        }});
        }) .catch(error => {
            console.error("error fetching json:", error);
            $("#areaInfo").html("error loading data");
        });
});



//creates drop down menu
$( function() {
    $( "#selectState" ).selectmenu();
    
    fetch('../seeds/area.json')
        .then(response => response.json())
        .then(jsonData => {
            console.log('JSON data:', jsonData);

        jsonData.forEach(item => {
            $("#selectState").append(
                new Option(item.name, item.id)
            );
        });

        $("#selectState").selectmenu("refresh");

            $("#selectState").on("selectmenuchange", function() {
                var selectedId = $(this).val();
                console.log("Selected ID: ", selectedId);

                var selectedData = jsonData.find(item => item.id === selectedId);
                console.log('Selected Data: ', selectedData);

                if (selectedData) {
                    $("#areaInfo").html(
                         `<h2>${selectedData.name}</h2>
                         <p>Coordinates: ${selectedData.coordinates}</p>
                         <img src="${selectedData.photo}" alt="${selectedData.name}" style="max-width: 100%; height: auto;">`
                    );
                };
            });
        }) .catch(error => {
            console.error("error fetching json:", error);
            $("#areaInfo").html("error loading data");
        });
});



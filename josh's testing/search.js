//creates drop down menu
$( function() {
    $( "#selectState" ).selectmenu();
    
    fetch('../seeds/area.json')
        .then(response => response.json())
        .then(jsonData => {
            $("#selectState").on("selectmenuchange", function() {
                var selectedValue = $(this).val();

                var selectedData = jsonData[selectedValue];

                if (selectedData) {
                    $("#areaInfo").html(
                        `<h3>${selectedValue}</h3>
                         <h2>${selectedData.name}</h2>
                         <p>${selectedData.coordinates}</p>
                         <img>${selectedData.photo}</img`
                    );
                };
            });
        });
});



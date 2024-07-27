//creates drop down menu
$( function() {
    $( "#selectState" ).selectmenu();
  
//grabs selected option's value
$("#selectState").on("selectmenuchange", function() {
    var selectedValue = $(this).val();

if (selectedValue === "Arizona") {
    alert("Hey, this is Arizona");
} else if (selectedValue === "California") {
    alert("Hey, this is California");
} else if (selectedValue === "Texas") {
    alert("Hey, this is Texas");
} else if (selectedValue === "Utah") {
    alert("Hey, this is Utah");
} else if (selectedValue === "Wyoming") {
    alert("Hey, this is Wyoming");
};
});
});
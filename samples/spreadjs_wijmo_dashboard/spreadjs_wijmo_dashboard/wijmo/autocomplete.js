function autocompleteComponent(){
    // create autocomplete area
  let theAutoComplete = new wijmo.input.AutoComplete('#wj-header-autoComplete', {
    placeholder:"검색",
    itemsSource:["mescius","spreadjs","wijmo","activereports"],
    isRequired:false,
    selectedIndex:-1,
  });

}
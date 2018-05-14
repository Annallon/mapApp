const userArray=[]

document.querySelector('#addNewUser').addEventListener('submit', function(event) {
    event.preventDefault()
    var addressField = document.getElementById("location")

    if((isPostcodeValid(addressField.value)) && (checkIfAlreadyAdded(userArray, addressField.value))){
        codeAddress(addressField.value, function(array){
            userArray.push(array)
            console.log(userArray)  
        });


    } else if(!isPostcodeValid(addressField.value)) {
        console.log('postcode error')
    }



});

function isPostcodeValid(postcode) {
    const regexPostcode = /^(([gG][iI][rR] {0,}0[aA]{2})|(([aA][sS][cC][nN]|[sS][tT][hH][lL]|[tT][dD][cC][uU]|[bB][bB][nN][dD]|[bB][iI][qQ][qQ]|[fF][iI][qQ][qQ]|[pP][cC][rR][nN]|[sS][iI][qQ][qQ]|[iT][kK][cC][aA]) {0,}1[zZ]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yxA-HK-XY]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/
    if (regexPostcode.test(postcode)) {
        return true
    }
    return false
}

function checkIfAlreadyAdded(userArray, addressField) {

    const boolean = userArray.findIndex(checkifPresent);

function checkifPresent(element, addressField) {
    console.log(element + "checking the element")
    console.log(addressField + "checking the addressfield")

    if (element == addressField) {
        return false;
    }
    return true; 
}

return boolean;
}





function codeAddress(address, callback) {
    var array = [];
    var geocoder = new google.maps.Geocoder();
     var request = {
        address: address,
        componentRestrictions: {
            country: 'UK'
        }
    }
      geocoder.geocode(request, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        
        array.push(latitude); 
        array.push(longitude);
        callback(array);
        
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

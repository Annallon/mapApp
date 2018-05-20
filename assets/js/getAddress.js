const userArray= createArray(2);
console.log(userArray);

document.querySelector('#addNewUser').addEventListener('submit', function(event) {
    event.preventDefault()
    var addressField = document.getElementById("location")

    if (isPostcodeValid(addressField.value)) {
        codeAddress(addressField.value, function(array){
        console.log(array);
        checkIfExisting(array);
        console.log(userArray + " userarry")
        });
    } else if(!isPostcodeValid(addressField.value)) {
        console.log('postcode error')
    }
});


function checkIfExisting(array) {
    if (postcodeCheck(array)){
        
        return false;
    }
    console.log(userArray + " display")

    userArray.push(array);
    return true;
    
}

function postcodeCheck(array) {
    return userArray.some(function(el) {
    return el.array === array;

});
}

function isPostcodeValid(postcode) {
    const regexPostcode = /^(([gG][iI][rR] {0,}0[aA]{2})|(([aA][sS][cC][nN]|[sS][tT][hH][lL]|[tT][dD][cC][uU]|[bB][bB][nN][dD]|[bB][iI][qQ][qQ]|[fF][iI][qQ][qQ]|[pP][cC][rR][nN]|[sS][iI][qQ][qQ]|[iT][kK][cC][aA]) {0,}1[zZ]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yxA-HK-XY]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/
    if (regexPostcode.test(postcode)) {
        return true
    }
    return false
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



  function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

let Car = [];
let maxSize = 0;
let availableSlot = []

let search =  (slot, prop, carArray) => {
    for (var i = 0; i < carArray.length; i++) {
      if (carArray[i][prop] === slot) {
        return carArray[i];
      }
    }
    return false;
  }
  
  let remove =  (slot, prop, carArray) => {
    var i = carArray.length;
    while (i--) {
      if (carArray[i]
        && carArray[i].hasOwnProperty(prop)
        && (arguments.length > 2 && carArray[i][prop] === slot)) {
        carArray.splice(i, 1);
      }
    }
    return carArray;
  }

let createParkingLot = (noOfLot) => {
  try {
    maxSize = parseInt(noOfLot);
  } catch (e) {
    return "Parameter is not a number!";
  }

  for (let i = 1; i <= maxSize; i++) {
    availableSlot.push(i);
  }
  return `Created a parking lot with ${availableSlot.length} slots`;

}


let park =  (registratonNo, color) => {
  if (maxSize === 0) {
    return `parking lot is not initiated`;
  } else if (maxSize === Car.length) {
    return `Sorry, parking lot is full`;
  } else {
    let slot = availableSlot[0];
    Car.push({
      'slot': slot,
      'registratonNo': registratonNo,
      'color': color
    });
   // console.log("pushed to car",Car);
    availableSlot.shift();
    return `Allocated slot number: ${slot}`
  }
}


let leave = async (slot) => {
  slot = parseInt(slot);
  if (maxSize === 0) {
    return "parking lot is not initiated";
  } else if (Car.length > 0) {

    if (await search(slot, 'slot', Car)) {

      Car = await remove(slot, 'slot', Car);

      // Add a the number back into slot 
      availableSlot.push(slot);
      availableSlot.sort();
      return `Slot  numbmer ${slot} is free`;

    } else {
      return ` Slot ${slot} is already empty `;
    }

    console.log('Car ==>', Car);

  } else {
    return `Parking lot is empty`
  }
}



let status =  () => {
  if (maxSize === 0) {
    return "parking lot is not initiated";
  } else if (Car.length > 0) {

     myArr = Array.from({length: maxSize}, (_, i) => i + 1)
     newarr=[]
    Car.map((ele) =>{
      if(!newarr.includes( ele.slot ))
      newarr.push(ele.slot)
    }
    );
      myArr.filter( ( el ) => !newarr.includes( el.slot ) );
      let finalArray = myArr.filter(function(obj) { return newarr.indexOf(obj) == -1; })
      return finalArray.map((i)=>i)
      
  } else {
    return `Parking lot is empty`
  }

}


let getRegistrationNumbersFromColor =  (color) => {

  if (maxSize === 0) {
    return "parking lot is not initiated";
  } else if (Car.length > 0) {
    let resultSet = [];
    Car.forEach(function (row) {
      if (row.color === color) {
        resultSet.push(row.registratonNo);
      }
    });

    let finalResponse = '';
    if (resultSet === undefined) return `Not found`;
    for (let i = 0; i < resultSet.length; i++) {
      if (!(i == resultSet.length - 1)) {
        finalResponse += resultSet[i] + ","
      } else {
        finalResponse += resultSet[i];
      }
    }
    return finalResponse;

  } else {
    return `Not found`
  }

}


let getSlotNumbersFromColor =  (color) => {
  if (maxSize === 0) {
    return "parking lot is not initiated";
  } else if (Car.length > 0) {
    let resultSet = [];
    
    Car.forEach(function (row) {
      if (row.color === color) {
        resultSet.push(row.slot);
      }
    });

    let finalResponse = '';
    if (resultSet === undefined) return `Not found`;

    for (let i = 0; i < resultSet.length; i++) {
      if (!(i == resultSet.length - 1)) {
        finalResponse += resultSet[i] + ","
      } else {
        finalResponse += resultSet[i];
      }
    }
    return finalResponse;

  } else {
    return `Not found`
  }
}

let getSlotNumberFromRegNo =  (registratonNo) => {
  if (maxSize === 0) {
    return "parking lot is not initiated";
  } else if (Car.length > 0) {
    let resultSet;
    Car.forEach(function (row) {
      if (row.registratonNo === registratonNo) {
        resultSet = row.slot;
      }
    });
    if (resultSet === undefined) return `Not found`
    return resultSet;
  } else {
    return `Not found`
  }
}

console.log(createParkingLot(6))
console.log(park("RT-eWE-9021","white"))
console.log(park("RT-eWE-9022","white"))
console.log(park("RT-eWE-9023","white"))
console.log(park("RT-eWE-9028","white"))
console.log(status())
console.log(getSlotNumberFromRegNo("RT-eWE-9027"))
console.log(getSlotNumberFromRegNo("RT-eWE-9028"))
console.log(getSlotNumberFromRegNo("RT-eWE-9024"))

console.log(leave(4))

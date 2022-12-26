
export class priceCalculator{

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  priceWithDiscount(price, discount) {
    var priceInt = parseInt(price);
    var rest = discount / 100;
    return priceInt * (1 - rest);
  }


}

export function getThreeWords(str){
  var arr = str.split(" ");
  var result = ''
for(let i = 0 ; i< 3; i++ ){
result += arr[i] + ' '
}
  return result + '...';
}

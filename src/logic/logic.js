
export class priceCalculator{

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };



  priceWithDiscount(price, discount) {
    var priceInt = parseInt(price);
    var rest = discount / 100;
    return Math.round((priceInt * (1 - rest)) / 1000) * 1000 ;
  }


   removeAccents(str) {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D');

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




export function getTenWords(str){
  var arr = str.split(" ");
  var result = ''
  if(arr.length > 9){
    for(let i = 0 ; i< 9; i++ ){
      result += arr[i] + ' '
      }
      result =  result + '...';
  }else{
    for(let i = 0 ; i< arr.length; i++ ){
      result += arr[i] + ' '
      }
  }

  return result ;
}

export default function isEmpty(str) {
  return !str.trim().length;
}

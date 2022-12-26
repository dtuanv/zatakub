function getThreeWords(){
  var str = 'Dầu gội Yunsey dành cho nam For Men 380ml '
  var arr = str.split(" ");
  var result = ''
for(let i = 0 ; i< 3; i++ ){
result += arr[i] + ' '
}
  return result + '...';
}

console.log("arr ",checkString())



let burgerBtn = document.querySelector('.burger')

let partOne = document.querySelector('.partOne');
let partTwo = document.querySelector('.partTwo');



let flag = 0

burgerBtn.addEventListener('click', () => {
    if (flag == 0) {
      partTwo.style.display = "none"
      flag = 1
    } else {
      partTwo.style.display = "block"
      flag = 0
    }
})


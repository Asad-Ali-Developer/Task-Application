

let burgerBtn = document.querySelector('.burger')

let partOne = document.querySelector('.partOne');
let partTwo = document.querySelector('.partTwo');



let flag = 0

burgerBtn.addEventListener('click', () => {
    if (flag == 0) {
      partTwo.style.transform = "translateX(0)"
      flag = 1
    } else {
      partTwo.style.transform = "translateX(100%)"
      flag = 0
    }
})


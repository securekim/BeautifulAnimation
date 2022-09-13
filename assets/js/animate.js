new WOW().init(); // 스크롤이 되었을 때 나타나도록

const beautifulAnimation = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
 
// 
beautifulAnimation('.button-85', 'backInDown').then((message) => {
    //애니메이션 종료 후 동작
    beautifulAnimation('.button-85', 'shakeY')
});

//smooth bookmark
let anchorlinks = document.querySelectorAll('a[href^="#"]')

for (let item of anchorlinks) { // relitere 
    item.addEventListener('click', (e)=> {
    let hashval = item.getAttribute('href')
    let target = document.querySelector(hashval)
    target.scrollIntoView({
      behavior: 'smooth'
    })
    history.pushState(null, null, hashval)
    e.preventDefault()
  })
}
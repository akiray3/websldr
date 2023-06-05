// import {initializeApp} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
// import {getDatabase, ref, set, update} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
// const firebaseConfig = {
//   apiKey: "AIzaSyDQQIudfNENPU7UpSKMixlAm5g4wCmiw9k",
//   authDomain: "websldr.firebaseapp.com",
//   databaseURL: "https://websldr-default-rtdb.asia-southeast1.firebasedatabase.app/",
//   projectId: "websldr",
//   storageBucket: "websldr.appspot.com",
//   messagingSenderId: "1035787511468",
//   appId: "1:1035787511468:web:ee62d3de4d557c9456a109"
// };
// var firebase = initializeApp(firebaseConfig);
// const db = getDatabase();
var jsPsych = initJsPsych();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const exp_id = urlParams.get('exp_id');

const slideImg = document.getElementById('slideImg');
const btnStart = document.getElementById('btnStart');
const btnNext = document.getElementById('btnNext');
const expSet = document.getElementById('expSet');
const stts = document.getElementById('stts');
const sld = document.getElementById('sld');
const sldC = document.getElementById('sldC');
const lct_x = document.getElementById('lct_x');
const lct_y = document.getElementById('lct_y');
const timer_i = document.getElementById('timer_i');
const verlab = document.getElementById('verlab');
var arrTmp1 = new Array(3) 
var arrTmp2 = new Array(3) 
var arrImgType = new Array(3) 
var arrImgNum = new Array(3) 
var arrImgSrc = new Array(3);

//ページの起動時処理
window.onload = function(){
  btnNext.disabled = true
  arrTmp1 = ['c', 'c', 'c'];
  arrTmp2 = ['01', '02', '03'];
  let flag = 1;
  while(flag > 0){
    for(let i = (arrTmp1.length - 1); 0 <= i; i--){
      let r = Math.floor(Math.random() * (i + 1));
      let tmp1 = arrTmp1[i];
      arrTmp1[i] = arrTmp1[r];
      arrTmp1[r] = tmp1;
      let tmp2 = arrTmp2[i];
      arrTmp2[i] = arrTmp2[r];
      arrTmp2[r] = tmp2;
    }
    let check = 0;
    // for(let i = 0; i <= arrTmp1.length; i++){
    //   if(arrTmp1[i] == arrTmp1[i + 1]){
    //     check = check + 1;
    //   }
    // } 
    if(arrTmp1.length == 3){
      check = 0;
    }
    flag = check;
  }
  arrImgType = arrTmp1;
  arrImgNum = arrTmp2;
  verlab.innerHTML = exp_id;
  var i = 0;
  for(i=0;i<arrTmp1.length;i++){
    arrImgSrc[i] = 'image/' + arrImgType[i] + arrImgNum[i] + '.jpg';
    var imgPreload = document.createElement('img');
    imgPreload.src =  'image/' + arrImgType[i] + arrImgNum[i] + '.jpg';
  }
  let instImg = ["01", "02", "03", "04", "05", "06"]
  for(i=0;i<instImg.length;i++){
    var imgPreload = document.createElement('img');
    imgPreload.src = 'image/inst' + instImg[i] + '.jpg'
  }
}

// draggable
var position = {x: 0, y: 0};
var positionFixed = {x: 0, y: 0};
var contW; 
var pointR;

interact('.draggable').draggable({
  inertia: false,
  modifiers: [
    interact.modifiers.restrict({
      restriction: 'parent',
      endOnly: false
    })
  ],
  listeners: {
    start(event) {
      document.getElementById('cont_w').innerHTML = document.getElementById('contDrg2').offsetHeight;
      document.getElementById('point_r').innerHTML = document.getElementById('point').offsetHeight;
      contW = document.getElementById('cont_w').innerHTML;
      pointR = document.getElementById('point_r').innerHTML;
    },
    move (event) {
      // position.x += event.dx;
      position.y += event.dy;
      event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      // positionFixed.x = Math.round(100 * Math.round(position.x) / (contW/2));
      positionFixed.y = Math.round(-100 * Math.round(position.y) / (contW/2));
      // lct_x.innerHTML = positionFixed.x;
      lct_y.innerHTML = positionFixed.y;
      // if (lct_x.innerHTML > 100) {
      //   lct_x.innerHTML = 100
      // }
      // if (lct_x.innerHTML < -100) {
      //   lct_x.innerHTML = -100
      // }
      if (lct_y.innerHTML > 100) {
        lct_y.innerHTML = 100
      }
      if (lct_y.innerHTML < -100) {
        lct_y.innerHTML = -100
      }
    },
    end (event) {
      // position.x = 0;
      position.y = 0;
      event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      // lct_x.innerHTML = 0;
      lct_y.innerHTML = 0;
    }
  }
})

// timer
var startTimeI
var timerID
var iArr = 0;
var arrItem = new Array(5000);
var arrTime = new Array(5000);
// var arrX = new Array(5000);
var arrY = new Array(5000);
var arrO = new Array(5000);


// 一定時間待つ関数
const waitsec = (sec) => {
  let waitID
  return new Promise((resolve, reject) => {
    waitID = setTimeout(resolve, sec*1000);
  });
};

function recorddata() {
  let timerID
  let currentTime = new Date(Date.now() - startTimeI);
  let s = currentTime.getSeconds();
  let ms = Math.floor(currentTime.getMilliseconds() / 100);
  timer_i.innerHTML = String(s)+'.'+String(ms);
  if (arrTime[iArr - 1] != timer_i.innerHTML) {
    arrItem[iArr] = sld.innerHTML
    arrTime[iArr] = timer_i.innerHTML
    // arrX[iArr] = lct_x.innerHTML
    arrY[iArr] = lct_y.innerHTML
    iArr = ++ iArr
    }
  timerID = setTimeout(recorddata, 100);
}

btnStart.addEventListener('click', 
  async function () {
    this.style.backgroundColor = '#ffffff';
    this.disabled = true;
    btnNext.style.backgroundColor = '#ffffff';
    btnNext.disabled = true;
    await waitsec(0.5);
    var i = 0;
    for(let i=0;i<arrImgType.length;i++){
      stts.innerHTML = "ready";
      slideImg.src = 'image/inst02.jpg';
      await waitsec(2.5);
      sldC.innerHTML = i + 1
      startTimeI = Date.now();
      sld.innerHTML = arrImgType[i] + arrImgNum[i];
      stts.innerHTML = "rating";
      slideImg.src = arrImgSrc[i]
      recorddata();
      await waitsec(10);
      clearTimeout(timerID);
      stts.innerHTML = "blank";
      slideImg.src = 'image/inst03.jpg';
      await waitsec(10);
      clearTimeout(timerID);
      stts.innerHTML = "reset";
      slideImg.src = 'image/inst04.jpg';
      await waitsec(2.5);
      slideImg.src = 'image/inst02.jpg';
    }
    slideImg.src = 'image/inst06.jpg';
    // jsPsych.data.get().push({
    //   item: arrItem.slice(0, iArr + 1),
    //   time: arrTime.slice(0, iArr + 1),
    //   x: arrX.slice(0, iArr + 1),
    //   y: arrY.slice(0, iArr + 1)
    // });
    // update(ref(db, exp_id), {
    //   prac: jsPsych.data.get().values()
    // });
    this.style.backgroundColor = '#919191';
    this.innerHTML = 'もう一度'
    this.disabled = false;
    btnNext.style.backgroundColor = ' #919191';
    btnNext.disabled = false;
  }
);

btnNext.addEventListener('click', 
  function () {
    window.location.href = 'tps_full.html?exp_id=' + exp_id;
  }
)
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {getDatabase, ref, set, update} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
require('dotenv').config();
const firebaseConfig = {
  apiKey: process.env.MY_FIREBASE_API_KEY,
  authDomain: "websldr.firebaseapp.com",
  databaseURL: process.env.MY_DATABASE_URL,
  projectId: "websldr",
  storageBucket: "websldr.appspot.com",
  messagingSenderId: process.env.MY_MESSAGING_SENDER_ID,
  appId: process.env.MY_APP_ID
};
var firebase = initializeApp(firebaseConfig);
const db = getDatabase();

var time_date = new Date();
var nowmonth = time_date.getMonth() + 1
var exp_id = time_date.getFullYear() + '' + nowmonth.toString().padStart(2, '0') + '' + time_date.getDate() + '' + time_date.getHours().toString().padStart(2, '0') + '' + time_date.getMinutes().toString().padStart(2, '0') + '' + time_date.getSeconds().toString().padStart(2, '0');

var jsPsych = initJsPsych();

var browsercheck = {
  type: jsPsychBrowserCheck,
  inclusion_function: (data) => {
    return  data.mobile == true
  },
  exclusion_message: (data) => {
    if(data.mobile == false){
      return '<p>この調査はスマートフォンからのみ参加できます<br>申し訳ありませんが、お持ちのスマートフォンから<br>再度アクセスしてください</p>';
    }
  }
};

const ageset = [...Array(63)].map((_, i) => i + 18);
var survey01 = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'html',
        prompt:
        '<h3>＊はじめにお読みください</h3><br><h1>感情に関する心理学実験</h1><h2>この研究の目的</h2>・この研究では、さまざまな画像に対する感情の変化を調べます。<br>・感情に関わる疾患の仕組みについて解明することを目的としています。<br>・実験開始前に以下をお読みいただき、ご協力いただける場合には、画面下の「次へ」を押してください。<br><h2>実験方法</h2>・この実験の所要時間は10分程度です。<br>・はじめる前に、周囲に人のいない、騒音等のない場所（自室など）に移動してください。<br>・音楽アプリ等を再生している場合は、事前に停止してください。<br>・まず、スマートフォンの画面に表示された画像を見ながら、「不快・快」の評価をしていただきます。<br>・評価は、画面のタッチ操作によって行います（後ほど動画で説明します）。<br>・実験後に、簡単なアンケートにご記入いただきます。<br>・途中保存はできませんので、実験の最後までブラウザを閉じないで下さい。<br><h2>個人情報とデータの取扱い</h2>・この研究では、個人が特定できるような情報は取得しません。<br>*研究利用のため、ご使用のスマートフォンのOSとブラウザの種類を取得します。<br>・取得したデータや個人情報は、研究目的以外には使用しません。<br>・データは、研究が終了してから 5 年後までに破棄します。<br><h2>実験対象者の権利について</h2>・この研究に参加するか否かは自由意志で決定してください。<br>・一度同意した後でいつでも同意を取り消すことができ、それによる不利益はありません。<br>・もしご自身のデータの取り消しを要求される場合は、下記連絡先までご連絡ください。<br><h2>報酬について</h2>・実験とアンケートが全て完了した方には、100ポイントを贈呈します。<br>・途中で終了したり、下記の手順を正しく行えない場合、ポイントをお渡しできませんのでご注意ください。<br><h2>報酬の受け取り方</h2>・実験とアンケートの終了後に、画面に報酬コードが表示されます。<br>・報酬の受け取りが完了するまで、このページは閉じないで下さい。<br>・報酬コードを確認したら、Yahoo!クラウドソーシングの画面に戻って、選択肢の中から報酬コードと同じものを選んで下さい。<br>・正しい選択肢を選ぶことで、報酬を受け取ることができます<h2>問い合わせ先</h2><h3>城西大学薬学部薬学科　助教　吉田　暁<br>Eメール: akyoshida@josai.ac.jp</h3>'
      }
    ],
    [
      {
        type: 'html',
        prompt:
        '<h1>注意</h1><h2>はじめる前に、周囲に人のいない、騒音のない場所（自室など）に移動してください。<br>・音楽アプリ等を再生している場合は、事前に停止してください。<br>・途中保存はできませんので、実験の最後までブラウザを閉じないで下さい。</h2>'
      }
    ]

  ],
  title: '',
  button_label_next: '次へ',
  button_label_back: '戻る',
  button_label_finish: '次へ',
  required_question_label: '',
  on_finish: function () {
    set(ref(db, exp_id), {
      survey01: jsPsych.data.get().values()
    }).then(function() {
      window.location.href = 'tutorial_video.html?exp_id=' + exp_id;
    })
  }
};
// jsPsych.run([browsercheck, survey01]);
jsPsych.run([survey01]);


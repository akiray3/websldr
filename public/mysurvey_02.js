import {initializeApp} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {getDatabase, ref, set, update} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDQQIudfNENPU7UpSKMixlAm5g4wCmiw9k",
  authDomain: "websldr.firebaseapp.com",
  databaseURL: "https://websldr-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "websldr",
  storageBucket: "websldr.appspot.com",
  messagingSenderId: "1035787511468",
  appId: "1:1035787511468:web:ee62d3de4d557c9456a109"
};
var firebase = initializeApp(firebaseConfig);
const db = getDatabase();
var jsPsych = initJsPsych();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const exp_id = urlParams.get('exp_id');

const ageset = [...Array(63)].map((_, i) => i + 18);
const perss_chs = ['1. まったくあてはまらない', '2. ややあてはまらない', '3. どちらともいえない', '4. ややあてはまる', '5. 非常にあてはまる'];
const basrr_chs = ['1. あてはまらない', '2. ややあてはまらない', '3. ややあてはまる', '4. あてはまる'];
const jpss_chs = ['0. まったくあてはまらない', '1. ややあてはまらない', '2. どちらともいえない', '3. ややあてはまる', '4. 非常にあてはまる'];

var survey02 = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'html',
        prompt: '【質問セクション(1/5)】<br><br>以下の質問に答えてください'
      },
      {
        type: 'drop-down',
        prompt: "あなたの性別を選んでください", 
        name: 'Q1_01_gender', 
        options: ['男性', '女性', 'その他'], 
        required: true,
        autofocus: true
      }, 
      {
        type: 'drop-down',
        prompt: "あなたの年齢を選んでください", 
        name: 'Q1_02_age', 
        options: ageset, 
        required: true,
        autofocus: true
      },
      {
        type: 'drop-down',
        prompt: "あなたの最終学歴（学生の方は現在の所属）を選んでください", 
        name: 'Q1_03_education', 
        options: ['中学校', '高等学校', '専門学校', '高等専門学校/高等専修学校', ' 短期大学', '大学', '大学院'], 
        required: true,
        autofocus: true
      }, 
      {
        type: 'drop-down',
        prompt: "あなたの現在の健康状態にもっとも当てはまるものを選んでください", 
        name: 'Q1_04_health', 
        options: ['非常に悪い', 'どちらかといえば悪い', 'どちらともいえない', 'どちらかといえば良い', '非常に良い'],
        required: true,
        autofocus: true
      }, 
      {
        type: 'drop-down',
        prompt: "あなたの利き手を選んでください", 
        name: 'Q1_05_kikite', 
        options: ['右利き', '左利き', '両利き'], 
        required: true,
        autofocus: true
      }, 
      {
        type: 'drop-down',
        prompt: "さきほどの実験の操作方法を選んでください", 
        name: 'Q1_06_sousa_te', 
        options: ['【両手操作】利き手でマーカーを操作し、非利き手でスマホを支えた', '【両手操作】非利き手でマーカーを操作し、利き手でスマホを支えた', '【片手操作】利き手だけでスマホを支え・操作もした', '【片手操作】非利き手だけでスマホを支え・操作もした'], 
        required: true,
        autofocus: true
      }, 
      {
        type: 'drop-down',
        prompt: "さきほどの実験でマーカーの操作に使った指を選んでください", 
        name: 'Q1_07_sousa_yubi', 
        options: ['親指', '人差し指', '中指', '薬指', '子指'], 
        required: true,
        autofocus: true
      }
    ],
    [
      {
        type: 'html',
        prompt: '【質問セクション(2/5)】<br><br>それぞれの項目に含まれる文章をひとつひとつ注意深く読んでください。<br> それぞれの項目で、<b><u>今日を含むこの2週間</u></b>のあなたの気持ちに最も近い文章をひとつ選んでください。<br>もし、ひとつの項目で当てはまる文章がいくつかある場合は、番号の大きい方を選んでください'
      },
      {
        type: 'multi-choice', prompt: 'No.01 ', name: 'Q2_beck01',
        options: [
          '0. わたしは気が滅入っていない',
          '1. しばしば気が滅入る',
          '2. いつも気が滅入っている',
          '3. とても気が滅入ってつらくて耐えがたい'
        ],
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.02', name: 'Q2_beck02',
        options: [
          '0. 将来について悲観していない',
          '1. 以前よりも将来について悲観的に感じる',
          '2. 物事が自分にとってうまくいくとは思えない',
          '3. 将来は絶望的で悪くなるばかりだと思う'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.03', name: 'Q2_beck03',
        options: [
          '0. 自分を落伍者だとは思わない',
          '1. 普通の人より失敗が多かったと思う',
          '2. 人生を振り返ると失敗ばかりを思い出す',
          '3. 自分は人間として完全な落伍者だと思う'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.04', name: 'Q2_beck04',
        options: [
          '0. 自分が楽しいことには以前と同じくらい喜びを感じる',
          '1. 以前ほど物事を楽しめない',
          '2. 以前は楽しめたことにもほとんど喜びを感じなくなった',
          '3. 以前は楽しめたことにもまったく喜びを感じなくなった'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.05', name: 'Q2_beck05',
        options: [
          '0. 特に罪の意識はない',
          '1. 自分のしたことやすべきだったことの多くに罪悪感を感じる',
          '2. ほとんどいつも罪悪感を感じている',
          '3. 絶えず罪悪感を感じている'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.06', name: 'Q2_beck06',
        options: [
          '0. 自分が罰を受けているようには感じない',
          '1. 自分は罰を受けるかもしれないと思う',
          '2. 自分は罰を受けるだろう',
          '3. 自分は今罰されていると感じる'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.07', name: 'Q2_beck07',
        options: [
          '0. 自分自身に対する意識は以前と変わらない',
          '1. 自分自身に対して自信をなくした',
          '2. 自分自身に失望している',
          '3. 自分自身が嫌でたまらない'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.08', name: 'Q2_beck08',
        options: [
          '0. 以前よりも自分自身に批判的ということはない',
          '1. 以前より自分自身に批判的だ',
          '2. あらゆる自分の欠点が気になり自分を責めている',
          '3. 何か悪いことが起こると、全て自分のせいだと思う'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.09', name: 'Q2_beck09',
        options: [
          '0. 自殺したいと思うことはまったくない',
          '1. 自殺したいと思うことはあるが、本当にしようとは思わない',
          '2. 自殺したいと思う',
          '3. 機会があれば自殺するだろう'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.10', name: 'Q2_beck10',
        options: [
          '0. 以前よりも涙もろいということはない',
          '1. 以前より涙もろい',
          '2. どんなささいなことにも涙が出る',
          '3. 泣きたいと感じるのに涙が出ない'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.11', name: 'Q2_beck11',
        options: [
          '0. 普段以上に落ち着きがなかったり緊張しやすくはない',
          '1. 普段より落ち着きがなかったり緊張しやすい',
          '2. 気持ちが落ち着かずじっとしているのが難しい',
          '3. 気持ちが落ち着かず絶えず動いたり何かしていないと気が済まない'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.12', name: 'Q2_beck12',
        options: [
          '0. 他の人や活動に対する関心を失ってはいない',
          '1. 以前より他の人や物事に対する関心が減った',
          '2. 他の人や物事への関心がほとんどなくなった',
          '3. 何事にも興味をもつことが難しい'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.13', name: 'Q2_beck13',
        options: [
          '0. 以前と同じように物事を決断できる',
          '1. 以前より決断するのが難しくなった',
          '2. 以前より決断するのがずっと難しくなった',
          '3. どんなことを決めるにもひどく苦労する'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.14', name: 'Q2_beck14',
        options: [
          '0. 自分に価値がないとは思わない',
          '1. 以前ほど自分に価値があり人の役に立てる人間だと思えない',
          '2. 他の人に比べて自分は価値がないと思う',
          '3. 自分はまったく価値がないと思う'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.15', name: 'Q2_beck15',
        options: [
          '0. 以前と同じように活力がある',
          '1. 以前と比べて活力が減った',
          '2. 活力が足りなくて十分動けない',
          '3. 活力がなく何もできない'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.16', name: 'Q2_beck16',
        options: [
          '0. 睡眠習慣に変わりはない',
          '1a. 以前より少し睡眠時間が長い',
          '1b. 以前より少し睡眠時間が短い',
          '2a. 以前よりかなり睡眠時間が長い',
          '2b. 以前よりかなり睡眠時間が短い',
          '3a. ほとんど一日中寝ている',
          '3b. 以前より1～2時間早く目がさめて、再び眠れない'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.17', name: 'Q2_beck17',
        options: [
          '0. 普段よりイライラしやすいわけではない',
          '1. 普段よりイライラしやすい',
          '2. 普段よりかなりイライラしやすい',
          '3. いつもイライラしやすい'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.18', name: 'Q2_beck18',
        options: [
          '0. 食欲は以前と変わらない',
          '1a. 以前より少し食欲が落ちた',
          '1b. 以前より少し食欲が増えた',
          '2a. 以前よりかなり食欲が落ちた',
          '2b. 以前よりかなり食欲が増えた',
          '3a. まったく食欲がなくなった',
          '3b. いつも何か食べたくてたまらない'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.19', name: 'Q2_beck19',
        options: [
          '0. 以前と同じように集中できる',
          '1. 以前ほどは集中できない',
          '2. 何事にも長い間集中することは難しい',
          '3. 何事にも集中できない'
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.20', name: 'Q2_beck20',
        options: [
          '0. 以前と比べて疲れやすいわけではない',
          '1. 以前より疲れやすい',
          '2. 以前ならできた多くのことが疲れてしまってできない',
          '3. 以前ならできたほとんどのことが疲れてしまってできない'              
        ], 
        required: true
      },
      {
        type: 'multi-choice', prompt: 'No.21', name: 'Q2_beck21',
        options: [
          '0. 性欲は以前と変わらない',
          '1. 以前ほど性欲がない',
          '2. 最近めっきり性欲が減退した',
          '3. まったく性欲がなくなった'
        ], 
        required: true
      }
    ],
    [
      {
        type: 'html',
        prompt: '【質問セクション(3/5)】<br><br>以下の項目について、あなた自身にどの程度あてはまるか答えてください。'
      },
      {
        type: 'multi-choice', prompt: '01. 何か好きなことをするチャンスをみつけると、私はすぐに興奮する', name: 'Q3_basrr01',
        options: basrr_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '02. 競争に勝ったら、私は興奮するだろう', name: 'Q3_basrr02',
        options: basrr_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '03. 私は、欲しい物を手に入れたとき、興奮し、活気づけられる', name: 'Q3_basrr03',
        options: basrr_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '04. よいことが私の身に起こると、そのことは、私に強い影響を与える', name: 'Q3_basrr04',
        options: basrr_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '05. 何かがうまくいっているときは、それを続けることがとても楽しいと思う', name: 'Q3_basrr05',
        options: basrr_chs, required: true
      }
    ],
    [
      {
        type: 'html',
        prompt: '【質問セクション(4/5)】<br><br>最近１ヶ月間のこととして以下の質問にお答え下さい。最もよくあてはまる答えを一つ選んでください。'
      },
      {
        type: 'multi-choice', prompt: '01. 思いがけない事で精神的に混乱してしまったことが有りますか？', name: 'Q4_jpss01',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '02. 大事な判断をできずに困ったことがあワますか？', name: 'Q4_jpss02',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '03. 神経質になったりストレスを感じたことがありますか？', name: 'Q4_jpss03',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '04. 面倒なことをうまく処理できましたか？', name: 'Q4_jpss04',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '05. 生活の変化にうまく対応できますか？', name: 'Q4_jpss05',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '06. ストレスを乗り切るのは上手な方ですか？', name: 'Q4_jpss06',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '07. すべてうまくいっていますか？', name: 'Q4_jpss07',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '08. 仕事や付き合いで失敗したことがありましたか？', name: 'Q4_jpss08',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '09. イライラして我慢できないことがありますか？', name: 'Q4_jpss09',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '10. 仕事や付き合いは順調ですか？', name: 'Q4_jpss10',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '11. うまくゆかないことがあるとカーとなって怒りやすいですか？', name: 'Q4_jpss11',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '12. 仕事の悩みは多いですか？', name: 'Q4_jpss12',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '13. 自分で時間の予定をたてるのは上手ですか？', name: 'Q4_jpss13',
        options: jpss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '14. 面倒なことが多くて困っていますか？', name: 'Q4_jpss14',
        options: jpss_chs, required: true
      }
    ],
    [
      {
        type: 'html',
        prompt: '【質問セクション(5/5)】あと少しです！<br><br>この質問票は、あなたが何らかの感情を経験したときに、どのように反応するかをさまざまな角度から測るために作られています。<br>以下の項目について、あなたの日常生活にどの程度あてはまるかを点数で答えてください。'
      },
      {
        type: 'multi-choice', prompt: '01. すぐに幸せな気持ちになるほうだ', name: 'Q5_perss01',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '02. すぐに動揺するほうだ', name: 'Q5_perss02',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '03. 幸せな気持ちになると、それがしばらく続く', name: 'Q5_perss03',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '04. 動揺すると、抜け出すのに時間がかかる', name: 'Q5_perss04',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '05. 楽しい気持ちになると、それをとても深く感じる', name: 'Q5_perss05',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '06. 他の人よりも動揺を強く感じる', name: 'Q5_perss06',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '07. ポジティブな出来事があると、すぐに良い気分になる', name: 'Q5_perss07',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '08. すぐに失望する', name: 'Q5_perss08',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '09. ポジティブな気分になると、一日の大半はそのような気分でいられる', name: 'Q5_perss09',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '10. 失敗から立ち直るのは難しい', name: 'Q5_perss10',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '11. 私はこのアンケートに真面目に回答していない', name: 'Q6_trust_checker',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '12. ポジティブな気分をとても強く感じる', name: 'Q5_perss11',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '13. 不幸なときはいつも、それをとても強く感じる', name: 'Q5_perss12',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '14. 良い知らせには、すぐに反応する', name: 'Q5_perss13',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '15. ネガティブな出来事があると、すぐに悲観的になる', name: 'Q5_perss14',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '16. 長いあいだ熱中したままでいられる', name: 'Q5_perss15',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '17. 一度ネガティブな気分になると、なかなか抜け出せない', name: 'Q5_perss16',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '18. 何かに熱中していると、それをとても強く感じる', name: 'Q5_perss17',
        options: perss_chs, required: true
      },
      {
        type: 'multi-choice', prompt: '19. ネガティブな気分をとても強く感じる', name: 'Q5_perss18',
        options: perss_chs, required: true
      }
    ]
  ],
  title: '',
  button_label_next: '次へ',
  button_label_back: '戻る',
  button_label_finish: '終了',
  required_question_label: '',
  on_finish: function () {
    update(ref(db, exp_id), {
      survey02: jsPsych.data.get().values()
    }).then(function() {
      window.location.href = 'finishing.html';
    })
  }
};
jsPsych.run([survey02]);


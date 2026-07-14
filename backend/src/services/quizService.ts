import {
  DifficultyLevel
} from "@prisma/client";

import prisma from "../config/prisma";

import {
  getNextQuizRecommendation
} from "./adaptiveService";

interface AnswerInput {
  questionId:string;
  selectedOptionId:string;
}

interface SubmitQuizInput {
  userId:string;
  quizId:string;
  answers:AnswerInput[];
}


// ================= HELPERS =================

const getAdaptiveLevel=(
score:number
):DifficultyLevel=>{

if(score<40){
return "BEGINNER";
}

if(score<=75){
return "INTERMEDIATE";
}

return "ADVANCED";

};


// ================= GET QUIZ =================

export const getQuizByTopic=
async(
topicId:string
)=>{

if(!topicId){

throw new Error(
"Topic ID required"
);

}

const quiz=
await prisma.quiz.findFirst({

where:{
topicId
},

include:{

questions:{

include:{
options:true
}

}

}

});

if(!quiz){

throw new Error(
"Quiz not found"
);

}

return quiz;

};


// ================= SUBMIT QUIZ =================

export const submitQuiz=
async({

userId,
quizId,
answers

}:SubmitQuizInput)=>{

try{


// ---------- Validation ----------

if(!userId){

throw new Error(
"User ID required"
);

}

if(!quizId){

throw new Error(
"Quiz ID required"
);

}

if(
!answers ||
answers.length===0
){

throw new Error(
"Answers required"
);

}


// ---------- Prevent duplicate answers ----------

const answerSet=
new Set<string>();

for(
const answer
of answers
){

if(
answerSet.has(
answer.questionId
)
){

throw new Error(
`Duplicate answer detected for ${answer.questionId}`
);

}

answerSet.add(
answer.questionId
);

}


// ---------- Fetch Quiz ----------

const quiz=
await prisma.quiz.findUnique({

where:{
id:quizId
},

include:{

questions:{

include:{
options:true
}

}

}

});


if(!quiz){

throw new Error(
"Quiz not found"
);

}


// ---------- Topic ----------

const topicId=
quiz.topicId;

if(!topicId){

throw new Error(
"Topic not linked"
);

}


// ---------- Faster Answer Lookup ----------

const userAnswers=
new Map(

answers.map(
a=>[
a.questionId,
a.selectedOptionId
]
)

);


// ---------- Score Calculation ----------

let correctCount=0;

for(
const question
of quiz.questions
){

const selectedOptionId=
userAnswers.get(
question.id
);

if(
!selectedOptionId
){

continue;

}

const correctOption=
question.options.find(
option=>
option.isCorrect
);

if(
!correctOption
){

continue;

}

if(
selectedOptionId===
correctOption.id
){

correctCount++;

}

}


// ---------- Final Score ----------

const totalQuestions=
quiz.questions.length;

const score=
totalQuestions>0

? Number(

(
(correctCount/
totalQuestions)
*100

).toFixed(2)

)

:0;


// ---------- Adaptive ----------

const adaptiveLevel=
getAdaptiveLevel(
score
);


// ---------- Recommendation ----------

const recommendation=
await getNextQuizRecommendation(
topicId,
score
);


// ---------- Debug ----------

console.log(
"[SAVING TO DB]",
{
userId,
topicId,
score,
adaptiveLevel
}
);


// ---------- Transaction ----------

await prisma.$transaction(

async(tx)=>{

await prisma.progress.upsert({

  where:{
    userId_topicId:{
      userId:userId,
      topicId:topicId
    }
  },

  update:{
    score:score,
    completed:true,
    adaptiveLevel:adaptiveLevel
  },

  create:{
    userId:userId,
    topicId:topicId,
    score:score,
    completed:true,
    adaptiveLevel:adaptiveLevel
  }

});


// Verify immediately

const progressCheck=
await prisma.progress.findFirst({

  where:{
    userId,
    topicId
  }

});

console.log(
"[PROGRESS SAVED]"
);

console.log(
progressCheck
);

});


// ---------- Verify Save ----------

const savedProgress=
await prisma.progress.findFirst({

where:{

userId,
topicId

}

});


const savedAttempt=
await prisma.quizAttempt.findFirst({

where:{
userId
},

orderBy:{
createdAt:"desc"
}

});


console.log(
"[DB VERIFY]"
);

console.log(
"Progress:",
savedProgress
);

console.log(
"Attempt:",
savedAttempt
);


// ---------- Response ----------

return{

success:true,

quizId,

topicId,

totalQuestions,

correctAnswers:
correctCount,

wrongAnswers:
totalQuestions-
correctCount,

score,

adaptiveLevel,

recommendation,

attemptSaved:
!!savedAttempt

};


}catch(error:any){

console.error(
"[QUIZ SUBMIT ERROR]"
);

console.error(
error.message
);

console.error(
error.stack
);

throw error;

}

};

'use client';
import { Progress } from "../ui/progress";
import { TbCircleLetterAFilled } from "react-icons/tb";
import { TbCircleLetterBFilled } from "react-icons/tb";
import { TbCircleLetterCFilled } from "react-icons/tb";
import { TbCircleLetterDFilled } from "react-icons/tb";
import quiz from '@/app/exams/107_ Pathology.json'
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RevealSole from "./reveal_sol";
import useSound from 'use-sound';

const icons = [<TbCircleLetterAFilled key='a' />, <TbCircleLetterBFilled key='b' />, <TbCircleLetterCFilled key='c' />, <TbCircleLetterDFilled key='d' />]
export default function QuizList() {
    const [historyQuizIndex, setHistoryQuizIndex] = useState<number[]>([]) // 歷史的所有題目，總共10題
    const [correctRate, setCorrectRate] = useState<boolean[]>([]) // 每題答對狀況 1:成功 0:失敗
    const [quizRound, setQuizRound] = useState(1) // 顯示目前答到第幾題
    const [quizIndex, setQuizIndex] = useState(0) //題目的index
    const [selected, setSelected] = useState('') //目前選的選項
    const [isDisabled, setIsDisabled] = useState(false); //換頁轉態 禁止再次點擊
    const router = useRouter()
    const searchParams = useSearchParams()
    const [playSuccess] = useSound('/sounds/plunger.mp3', {
        volume: 0.25,
    });
    const [playError] = useSound('/sounds/boop.mp3', {
        volume: 0.25,
    });
    useEffect(() => {
        setQuizIndex(Math.floor(Math.random() * 76))
    }, [])

    useEffect(() => {
  console.log("✅ correctRate 改變了:", correctRate);
}, [correctRate]);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    const generateRandomNumber = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * 76);
        } while (historyQuizIndex.includes(newIndex))
        return Math.floor(Math.random() * 76);
    }
    const handleSetQuizIndex = (selectIndex: string, correct: boolean) => {
        setIsDisabled(true)
        setSelected(selectIndex)
        setHistoryQuizIndex([...historyQuizIndex, quizIndex])
        setQuizRound(quizRound + 1)
        if (correct) {
            playSuccess()
            setCorrectRate([...correctRate, true])
        }
        else {
            playError()
            setCorrectRate([...correctRate, false])
        }

        setTimeout(() => {
            setSelected('')
            if (quizRound === 10) {
                if(correct){
                     const score: string = ((correctRate.filter(value => value === true).length+1) * 10).toString();
                     router.push('/result' + '?' + createQueryString('score', score))
                }else{
                     const score: string = (correctRate.filter(value => value === true).length * 10).toString();
                     router.push('/result' + '?' + createQueryString('score', score))
                }
               
            }
            else {
                setQuizIndex(generateRandomNumber())
            }
            setIsDisabled(false)
        }, 400); // Delay of 1 second
    }
    return (
        <div className="h-screen overflow-hidden w-full md:py-16 py-8 pb-16 flex flex-col gap-4">
            <Progress value={quizRound * 10 - 10} className="w-[90%] md;h-10 h-5 border-2 border-zinc-800 border-solid mx-auto" />
            <div className="flex flex-col gap-16 justify-between">
                <QuizBoard quizIndex={quizIndex} />
                <div className="flex flex-col gap-2 ">
                    {Object.entries(quiz.questions[quizIndex].options).map(([key, value], index) => (
                        <QuizItem key={index} icon={icons[index]} quizkey={key} ans={quiz.questions[quizIndex].answer} setQuizIndex={handleSetQuizIndex} selected={selected} isDisabled={isDisabled}>
                            {value}
                        </QuizItem>
                    ))}
                </div>
            </div>
        </div>
    );
}

const QuizBoard = ({ quizIndex }: { quizIndex: number }) => {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950/50 to-zinc-900/80 p-6 mx-auto max-w-[90%] pt-3">
            <div className="-mx-6 mb-6 flex items-center justify-between border-b border-zinc-700 px-6 pb-3">
                <div className="flex items-center gap-3">
                    <button className="rounded px-1.5 py-0.5 text-sm font-medium transition-colors bg-indigo-600 text-slate-50">{quiz.exam_information.subject}</button>
                    <button className="rounded px-1.5 py-0.5 text-sm font-medium transition-colors bg-zinc-800 text-slate-50 hover:bg-slate-700 font-mono">{quiz.exam_information.year}</button>
                </div>
            </div>
            <RevealSole>
                {quiz.questions[quizIndex].question}
            </RevealSole>

        </div>

    )
}

const QuizItem = ({ icon, children, quizkey, ans, setQuizIndex, selected, isDisabled }: { icon: any, children: string, quizkey: string, ans: string, setQuizIndex: (selectIndex: string, correct: boolean) => void, selected: string, isDisabled: boolean }) => {
    const [correction, setCorrection] = useState(false);
    console.log(correction)
    const selectQuestion = () => {
        if (isDisabled) {
            return
        }
        if (quizkey === ans) {
            setCorrection(true)
            setQuizIndex(quizkey, true)
        }
        else {
            setCorrection(false)
            setQuizIndex(quizkey, false)

        }
    }
    return (
        <div
            className={`relative max-w-[90%]  mx-auto flex w-full items-center gap-3 rounded border border-zinc-700 bg-zinc-900 p-3 ${isDisabled ? '' : 'hover:bg-zinc-700 cursor-pointer '} ${selected === quizkey ? correction ? '!bg-green-700 hover:!bg-green-700 animate-success' : '!bg-red-700 hover:!bg-red-700 animate-shake' : ''}`}
            onClick={selectQuestion}
        >
            {icon}
            <RevealSole>
                < p
                    className='text-white transition-colors'
                >

                    {children}

                </p >
            </RevealSole>
        </div >
    )
}

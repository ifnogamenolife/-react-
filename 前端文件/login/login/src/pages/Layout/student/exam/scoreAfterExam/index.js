import { getDataId, http, removeTime } from '@/utils';
import { Result, Button, Card, message } from 'antd';
import { useEffect, useId, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './index.scss'
import moment from 'moment';
function ScoreAfterExam(){

    const [Score,setResultScore] = useState({
        result:0,
    })

    //获得examCode
    const [params] = useSearchParams()
    const id = params.get('id')
    //获得当前用户id
    const userId = getDataId()
    useEffect(()=>{
        const scoreMessage =async()=>{
            //从数据库得到成绩
          const res =  await http.get(`/lastScore/${userId}/${id}`)
          //再得到总分，再运算一下
           const resTotalScore =  await http.get(`/paperTatalScore/${id}/`)
           //再得到试卷信息
           const resExamScore = await http.get(`exam/${id}`)
            //通过用户id查到学生信息
           const resUserMessage =  await http.get(`/student/${userId}`)
           //获取当前日期
           const examData = moment().format('YYYY-MM-DD')

           const lastScore = Math.ceil((res.data/resTotalScore.data)*resExamScore.data.totalScore)

            //往数据库写入成绩
          const resResult = await http.post(`/score?examCode=${id}&studentId=${userId}&studentName=${resUserMessage.data.studentName}&subject=${resExamScore.data.source}&etScore=${lastScore}&answerDate=${examData}`)
           if (resResult.code==200) {
               //删除答题卡
               const res = await http.delete(`/deleteCard/${id}/${userId}`)
               if (res.code==200) {
                   message.success("答题卡删除成功")
               }
           }
          
        //   http.post()

          setResultScore({
              result:lastScore
          })
        }
        scoreMessage()
    },[])
    //***************************************************************** */
        const navicate = useNavigate()
        const toStudentIndex=()=>{  
            removeTime()
            navicate("/student")
        }
    //***************************************************************** */

    return(
        <div>
            <Card className='cardOne'>
                <Result
                    status={ "success"}
                    title={"您的分数是"+Score.result+"分"}
                    subTitle={"Congratuallations!!!"}
                    extra={[
                    <Button type="primary" key="console" onClick={toStudentIndex}>
                        返回
                    </Button>,
                    
                    ]}
                />
            </Card>
        </div>
    )
}

export default ScoreAfterExam
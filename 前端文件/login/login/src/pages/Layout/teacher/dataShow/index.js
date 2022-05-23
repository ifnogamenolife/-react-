import Bar from "@/components/Bar"
import { Calendar, Card } from 'antd';
import './index.scss'
const DataShow=()=>{

    function onPanelChange(value, mode) {
        console.log(value, mode);
      }

    return(
        <div className="site-outside">
            <Card className="site-calendar-demo-card">
                <Calendar fullscreen={false} onPanelChange={onPanelChange} /> 
            </Card>
            <div className="site-Bar">
                {/**准备一个挂载节点 */}
                <Bar title='test' xData={['react','vre','web']} yData={[30,20,10]} style={{width:'500px',height:'400px'}}/>
            </div>   
        </div>

        
        
    )
}

export default DataShow
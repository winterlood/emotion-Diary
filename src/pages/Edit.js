import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {

  const[originData, setOriginData] = useState();
  const diaryList = useContext(DiaryStateContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{
    if (diaryList.length >= 1){
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))

      if(targetDiary){
        setOriginData(targetDiary);
      }else{
        alert("존재하지 않는 일기입니다.")
        navigate('/', {replace : true});
      }
    };
  },[id, diaryList])

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  )
}

export default Edit;
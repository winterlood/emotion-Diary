import { useContext, useEffect, useState } from "react";

import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {

  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const headText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

  useEffect(()=>{
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,23,59,59
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }else{
      setData([])
    }
  }, [diaryList, currentDate]);


  const increaseMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())
    );
  }

  const decreaseMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate())
    );
  }

  return (
    <div>
      <MyHeader 
        headText = {headText}
        leftChild = {<MyButton text={'<'} onClick={decreaseMonth} />}
        rightChild = {<MyButton text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  )
}

export default Home;
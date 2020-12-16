// エラーログ用
const nameOfComponent = "mondayTimer/index";

// Form > input を取得
const elH = document.clockForm.hour;
const elM = document.clockForm.minute;
const elS = document.clockForm.sec;

// 現在時刻の取得
const getCurrentTime = () => {
	const now = new Date();
	return { 
        day: now.getDay(),
	    hour: now.getHours(),
	    min: now.getMinutes(),
        sec: now.getSeconds(),
    }
}

// 月曜なら 0:00:00, そうでなければ残り時間を計算
const getRemain = (obj) => {
    if(obj.day === 1) {
        return { hour: 0, min: "00", sec: "00" };
    } else {
        return calcRemain(obj);
    }
}

// 月曜日までの残り日数を取得 
const getD = (day) => {
    if(day > 0) {
        return 7;
    } else {
        return 0;
    }
}

// 月曜日までの残り時間を取得
const getH = (obj) => {
    const day = (getD(obj.day) - obj.day) * 24;
    let hour = 24 - obj.hour;
    if(obj.min > 0) hour--;
    if (day >= 24) hour += day;
    return hour;
}

// 月曜日までの残り時間（分）を取得
const getM = (obj) => {
    let min = 60 - obj.min;
	if (obj.sec > 0) min--;
    if (min === 60) min = 0;
    if (min < 10) min = "0" + min;
    return min;
}

// 月曜日までの残り時間（秒）を取得
const getS = (obj) => {
    let sec = 60 - obj.sec;
    if (sec === 60) {
        return "00";
    } else if(sec > 9) {
        return sec;
    } else {
        return "0" + sec;
    }
}

// 残り時間（時間、分、秒）を計算して出力
const calcRemain = (obj) => {
    const hour = getH(obj);
    const min = getM(obj);
    const sec = getS(obj);
    return { hour: hour, min: min, sec: sec };
}

const MondayTimer = (props) => {
    const [hms, setHms] = useState(getRemain(getCurrentTime()));
    useEffect(() => {
        const time = setInterval(() => {
            setHms(getRemain(getCurrentTime()));
        }, 1000);
        return () => clearInterval(time);
    }, []);

    return (
        <div className="container tool mondayTimer">
            <h1>月曜日まであと</h1>
            <h2>
                <span className="time">{ hms.hour }</span>
                <span className="words">時間</span>
                <span className="time">{ hms.min }</span>
                <span className="words">分</span>
                <span className="time">{ hms.sec }</span>
                <span className="words">秒です。</span>
            </h2>
        </div>
    );
}

const setTimer = () => {
    const hms = getRemain(getCurrentTime());
    // const elH = document.clockForm.hour;
	// const elM = document.clockForm.minute;
    // const elS = document.clockForm.sec;
    elH.value = hms.hour;
    elM.value = hms.min;
    elS.value = hms.sec;
    setTimeout(setTimer, 1000);
}

// const init = () => {
    // const hms = getRemain(getCurrentTime());
	// const elH = document.clockForm.hour;
	// const elM = document.clockForm.minute;
    // const elS = document.clockForm.sec;
    // const els = {
    //     hour: document.clockForm.hour,
    //     min: document.clockForm.minute,
    //     sec: document.clockForm.sec,
    // }
	// setTimer(hms, els);
// }

window.onload = setTimer();
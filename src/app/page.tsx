'use client'

import styles from './page.module.css'
import {AnimatePresence, motion} from 'framer-motion'
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation"

const deadline = (new Date(2023, 11, 16)).getTime();

function declOfNum(number: number, titles: string[]) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

const getDate = (mil: number) => {
    const days = Math.floor(mil / 1000 / 60 / 60 / 24)
    const hours = Math.floor(mil / 1000 / 60 / 60) % 24
    const minutes = Math.floor(mil / 1000 / 60) % 60;
    const seconds = Math.floor(mil / 1000) % 60;

    return {
        days: days < 10 ? '0' + days : days,
        hours: hours < 10 ? '0' + hours : hours,
        minutes: minutes < 10 ? '0' + minutes : minutes,
        seconds: seconds < 10 ? '0' + seconds : seconds
    }
}

export default function Home() {
    const params = useSearchParams()

    const timer = useRef< NodeJS.Timeout>()

    const [date, setDate] = useState(deadline - Date.now())

    useEffect(() => {
        timer.current = setInterval(() => {
            setDate((prev) => {
                if(prev <= 0) {
                    clearInterval(timer.current)
                    return 0
                }
                return deadline - Date.now()
            })
        }, 1000)
    }, []);

    const dataView = getDate(date)

    const [value, setValue] = useState("")

    const handleClick = async (agreement: boolean) => {
        if(!value && value.length < 8) return
        fetch("/api/user", {method: "POST", body: JSON.stringify({username: value, agreement})})
    }

  return (
    <main className={styles.main}>
            <Image className={styles.bg} src="/fon.jfif" alt="fon" width={640} height={1136} />
      <div className={styles.mainContent}>
          <AnimatePresence>
              <motion.div
                  className={styles.title1}
                  initial={{ opacity: 0, top: 0 }}
                  animate={{ opacity: 1, top: "30%" }}
                  transition={{ duration: 1.5 }}
              >
                  Амир
              </motion.div>
              <motion.div
                  className={styles.title2}
                  initial={{ opacity: 0, top: 0 }}
                  animate={{ opacity: 1, top: "40%" }}
                  transition={{ duration: 1.5 }}
              >
                  и
              </motion.div>
              <motion.div
                  className={styles.title3}
                  initial={{ opacity: 0, top: 0 }}
                  animate={{ opacity: 1, top: "50%" }}
                  transition={{ duration: 1.5 }}
              >
                  Дилия
              </motion.div>

              <motion.div
                  className={styles.date}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, top: "80%" }}
                  transition={{ duration: 1.5 }}
              >
                  16 Декабря 2023
              </motion.div>
          </AnimatePresence>
      </div>
        <div className={styles.fraza1Container}>
            <div>
                <Image style={{width: "100%", height: "auto", borderRadius: "32px"}} src="/1im.jpg" alt="1" width={1280} height={1099}></Image>
            </div>
            <div className={styles.fraza}>
                "Истинная любовь похожа на привидение: все о ней говорят, но мало кто ее видел" -<br/>Француа де Ларошфуко
            </div>
        </div>
        <div className={styles.fraza2}>
            Если вы все-таки хотите ее увидеть, то мы ждем вас на нашей свадьбе 16 декабря 2023г!
        </div>

            <div className={styles.timeContainer}>
                {params.get("a") === "6445b78d191f0b03d0cb57e83cf66ff0" && <>
                    <div className={styles.time}>15:15</div>
                    <div className={styles.timeDescription}>Сбор гостей на регистрацию</div>
                    <div className={styles.time}>15:30</div>
                    <div className={styles.timeDescription}>
                        <div>Начало регистрации брака</div>
                        <div className={styles.timeDescriptionSubtitle}>По адресу г. Йошкар-Ола, Набережная Брюгге, 5</div>
                    </div>
                </>}
                <div className={styles.time}>16:30</div>
                <div className={styles.timeDescription}>
                    <div>Сбор гостей и праздничный фуршет</div>
                    <div className={styles.timeDescriptionSubtitle}>В ресторане "Камелот" на ул. Бульвар Победы, 5</div>
                </div>
                <div className={styles.time}>17:00</div>
                <div className={styles.timeDescription}>
                    <div>Начало банкета</div>
                </div>
            </div>
        <div style={{padding: "0 10%", marginBottom: "50px"}}>
            <Image style={{width: "100%", height: "auto", borderRadius: "32px"}} src="/photo_2023-10-23_21-05-08.jpg" alt="2" width={1280} height={1232}></Image>
        </div>

        <div style={{fontSize: "30px", padding: "0 10%", marginBottom: "30px"}}>Мы создали чат для общения и обмена фотографиями после мероприятия. Присоединяйтесь и будем на связи!</div>
        <Link target="_blank" href="https://t.me/+yocN7Fxq0ds1MmEy"><Image style={{width: "100px", height: "auto", marginBottom: "30px"}} src="/icon_t.png" alt="3" width={512} height={512}></Image></Link>


        <div className={styles.fraza3}>
            Мы очень старались сделать праздник незабываемым, поэтому будем рады, если вы подтвердите свое присутствие до <span style={{fontWeight: "bold"}}>27.11.2023</span>
        </div>

        <div className={styles.actions}>
            <div className={styles.inputContainer}>
                <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ваше имя и фамилия" />
            </div>
            <button onClick={() => handleClick(true)}>Я приду!</button>
            <button onClick={() => handleClick(false)} className={styles.secondary}>Не смогу прийти :(</button>
        </div>

        <div className={styles.timerTitle}>До нашей свадьбы осталось...</div>

        <div className={styles.downTimer}>
            <div className={styles.timerSection}>
                <div className={styles.timerValue}>{dataView.days}</div>
                <div className={styles.timerName}>{declOfNum(+dataView.days, ['День', 'Дня', 'Дней'])}</div>
            </div>
            <div className={styles.timerSection}>
                <div className={styles.timerValue}>{dataView.hours}</div>
                <div className={styles.timerName}>{declOfNum(+dataView.hours, ['Час', 'Часа', 'Часов'])}</div>
            </div>
            <div className={styles.timerSection}>
                <div className={styles.timerValue}>{dataView.minutes}</div>
                <div className={styles.timerName}>{declOfNum(+dataView.minutes, ['Минута', 'Минуты', 'Минут'])}</div>
            </div>
            <div className={styles.timerSection}>
                <div className={styles.timerValue}>{dataView.seconds}</div>
                <div className={styles.timerName}>{declOfNum(+dataView.seconds, ['Секунда', 'Секунды', 'Секунд'])}</div>
            </div>
        </div>

    </main>
  )
}

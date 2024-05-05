import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Checkbox from '../Checkbox'

import passwordGif from '../../assets/gif/password.gif'
import copyIcon from '../../assets/icons/copy.svg'
import refreshIcon from '../../assets/icons/refresh.svg'

import './index.css'

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [password, setPassword] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [copiedPassword, setcopiedPassword] = useState<boolean>(false)
  const [conditions, setConditions] = useState<any>({
      uppers:true,
      lowers:false,
      numbers:true,
      symbols:false
  })
    const uppers:string ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowers:string ="abcdefghijklmnopqrstuvwxyz"
    const numbers:string ="0123456789"
    const symbols:string ="!@#$%^&*()"
   const onChangePasswordLength = (value: any) => {
    setPasswordLength(value)
  }
  const generatePassword=()=>{
        let lettersAcc:string='';
         if(conditions.uppers)lettersAcc =lettersAcc.concat(uppers)
        if(conditions.lowers)lettersAcc =lettersAcc.concat(lowers)
        if(conditions.numbers)lettersAcc =lettersAcc.concat(numbers)
        if(conditions.symbols)lettersAcc =lettersAcc.concat(symbols)

       let passwordInfo="",index:number;
        for(let i=0;i<passwordLength;i++){
            const rand=Math.random()*lettersAcc.length
            index=Math.floor(rand)
            passwordInfo = passwordInfo.concat(lettersAcc[index])
        }
        setPassword(passwordInfo)
      setcopiedPassword(false)
      verification()

  }
  const  verification=()=>{
        if(passwordLength<8){
            setMessage('Too Short')
        }else {
            const letters =password.split('');
            const counts =[letters.filter(l=>uppers.includes(l)).length,letters.filter(l=>lowers.includes(l)).length,
                letters.filter(l=>numbers.includes(l)).length,letters.filter(l=>symbols.includes(l)).length].filter(num=>num>0)

           console.log(counts)
            switch (counts.length){
                case 4:setMessage("Hard");break
                case 3:setMessage("Medium");break
                default:setMessage("Easy");
            }

        }
    }
    useEffect(()=>{
        generatePassword();
    },[])

    function updateCheck(key: string) {
        setConditions((oldcond:any)=>{
            const cond= {...oldcond,[key]:!oldcond[key]}
            if(Object.values(cond).indexOf(true)==-1){
                cond['lowers']=true
            }
            return cond
        })
    }
    let className='fw-500 ';
    if(message=='Hard')className= className.concat('success')
    else if(message=='Medium')className= className.concat('warning')
    else className= className.concat('danger')

    return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Ensure online account safety by creating strong and secure passwords
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value={password} />
          <img src={refreshIcon} alt="refresh the password" onClick={generatePassword}/>
        </div>
          <CopyToClipboard text={password} onCopy={()=>setcopiedPassword(true)}>
              <button className="copy-btn" >
                  <img src={copyIcon} alt="copy password"/>
                  {copiedPassword?'Copied':'copy'}
              </button>
          </CopyToClipboard>

      </div>
        <span className={className}>{message}</span>
        <div className="slider">
            <div>
            <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox id="uppercase" label="Uppercase" checked={conditions.uppers} name="upper" onChange={()=>updateCheck("uppers")}/>
        <Checkbox id="lowercase" label="Lowercase" checked={conditions.lowers} name="lower" onChange={()=>updateCheck("lowers")}/>
        <Checkbox id="numbers" label="Numbers" checked={conditions.numbers} name="numbers" onChange={()=>updateCheck("numbers")} />
        <Checkbox
          id="special chars" onChange={()=>updateCheck("symbols")}
          label="Special Characters"
          checked={conditions.symbols}
          name="specialChars"
        />
      </div>
    </div>
  )
}

export default PasswordGenerator

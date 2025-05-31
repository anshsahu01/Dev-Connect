import React,{useEffect,useState} from 'react'
import service from '../appwrite/Services'
import Input from './Input'
import { useForm } from 'react-hook-form';
import Button from './Button';
import authService from '../appwrite/Auth';





function Messages() {
    const [messages,setMessages]=useState([]);
    
    const {register,handleSubmit,reset}=useForm();

    useEffect(()=>{
        getMessages();
        

       





    },[])

    const getMessages=async ()=>{
        const response=await service.getMessages();
        console.log(response);
         setMessages(response);
    }

    const handleMessage=async (data)=>{
        const currentUser=await authService.getCurrentUser();
        console.log(currentUser);
        const newMessage = await service.createMessage({
        UserId: currentUser.$id,
        Username: currentUser.name,
        Body: data.message,
    });
    // setMessages(newMessage);
       

        console.log(data);
    //    setMessages({})


               



    }




  return (
    <>
    <form onSubmit={handleSubmit(handleMessage)}>
    <div>
       <Input 
       label="Write message"
       placeholder="Message"
       {...register('message',{required:true})}
       />

       <Button type='submit'>Send</Button>

       
      
    </div>
     </form>

     {messages.length>0 ?(
        messages.map((message,idx)=>{
            return <p key={idx}>{message.Body}</p>
        })
     ) : (
         <p>No message</p>
     )

     }

    </>
  )
}

export default Messages



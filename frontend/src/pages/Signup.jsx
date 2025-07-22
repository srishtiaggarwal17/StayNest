import React, { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input"; 
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup=()=>{
    const [input,setInput]=useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    })
    const {user,loading}=useSelector(store=>store.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch();

    const changeEventHAndler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const changeFileHandler=(e)=>{
        setInput({...input,file:e.target.files?.[0]});
    }

    const SubmitHandler=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("fullname",input.fullname)
        formData.append("email",input.email)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("password",input.password)
        formData.append("role",input.role)
        if(input.file){
            formData.append("file",input.file)
        }
        try{
            dispatch(setLoading(true));
            const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            if(res.data.success){
                navigate("/login")
                toast.success(res.data.message)
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message)
        }
        finally{
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/")
        }
    })
    return(
        <div>
            {/* <Navbar/> */}
            <div className="flex items-center justify-center max-w-7xl mx-auto mt-18 pt-28">
                <form onSubmit={SubmitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10 ">
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input 
                        type="text" 
                        value={input.fullname}
                        name="fullname"
                        onChange={changeEventHAndler}
                        placeholder="Enter your Full name"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input 
                        type="email" 
                        value={input.email}
                        name="email"
                        onChange={changeEventHAndler}
                        placeholder="Enter Email Address"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input 
                        type="tel" 
                        value={input.phoneNumber}
                        name="phoneNumber"
                        onChange={changeEventHAndler}
                        placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input 
                        type="password" 
                        value={input.password}
                        name="password"
                        onChange={changeEventHAndler}
                        placeholder="Enter Password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="user" checked={input.role=='user'} onChange={changeEventHAndler} className="cursor-pointer"/>
                                <Label htmlFor="option-one">User</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="hotelOwner" checked={input.role=='hotelOwner'} onChange={changeEventHAndler} className="cursor-pointer"/>
                                <Label htmlFor="option-two">Owner</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center gap-2">
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer"></Input>
                        </div>
                    </div>
                    {
                        loading? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>:
                        <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;
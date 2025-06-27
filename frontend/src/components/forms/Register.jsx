import React, { useState } from 'react'
import { post } from '../../utils/Api'
import { useNavigate } from 'react-router-dom';

const register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, status } = await post("/api/auth/signup", { name, email, password });
            console.log("Success:", data);
            navigate('/Login');
        } catch (err) {
            if (err.response) {
                if (err.response.status === 409) {
                    console.warn("Conflict:", err.response.data);
                    // Show user-friendly message: "Email already exists"
                } else {
                    console.error("Other error:", err.response.status);
                }
            } else {
                console.error("Network or setup error:", err);
            }
        }
    };


    return (
        <>
            <div class="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <div class="w-full max-w-md space-y-8">
                    <div class="bg-white shadow-md rounded-md p-6">

                        <img class="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

                        <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign up for an account
                        </h2>

                        <form action="" onSubmit={handleSubmit} class="space-y-6" method="POST">

                            <div>
                                <label htmlFor="name" class="block text-sm font-medium text-gray-700">Username</label>
                                <div class="mt-1">
                                    <input onChange={(e) => setName(e.target.value)} name="name" type="text" required
                                        class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" class="block text-sm font-medium text-gray-700">Email</label>
                                <div class="mt-1">
                                    <input name="email" onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required
                                        class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" class="block text-sm font-medium text-gray-700">Password</label>
                                <div class="mt-1">
                                    <input name="password" type="password" autoComplete="new-password" required
                                        onChange={(e) => setPassword(e.target.value)}
                                        class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                    class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Register
                                    Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default register
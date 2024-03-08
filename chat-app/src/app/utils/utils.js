"use server"
import { auth, currentUser } from "@clerk/nextjs"
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"

export async function getProfile(userId) {
    await sql `SELECT FROM profile WHERE userid=${userId}`

    revalidatePath('/posts')
}

export async function setProfile() {
    const {userId} = auth()
    const user = await currentUser()
    const email_address = user.emailAddresses[0].emailAddress
    async function handleSetProfile(formData){
    "use server"
    const user_name = formData.get('user_name')
    const location = formData.get('location')
    const userId = formData.get('userId')
    const email_address = formData.get('email_address')

    await sql `INSERT INTO profile (user_name, location, userId, email_address) VALUES(${user_name},${location},${userId},${email_address})`

    }
   return (
    <div>
        <div>
            <form action={handleSetProfile} >
                <label >nick name</label>
                <input name="nick_name" placeholder="enter your nick name"></input>
                <label >location</label>
                <input name="loaction" placeholder="enter your location"></input>
                <input name="email_address" value={email_address}></input>
                <input name="userId" value={userId}></input>
            </form>
        </div>
    </div>
   )
}
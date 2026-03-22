// src/app/api/users/route.js
import { query } from "../../../../../lib/db.js";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("user-id");

  const usersInfo = await query("SELECT * FROM users where id=$1", [userID]);
  const usersProfiles = await query("SELECT * FROM user_profiles where user_id=$1", [userID]);
  const usersContacts = await query("SELECT * FROM user_contacts where user_id=$1", [userID]);
  const usersAddresses = await query("SELECT * FROM user_addresses where user_id=$1", [userID]);
  
  const userInfo = usersInfo[0];
  const profile = usersProfiles[0];
  const contacts = usersContacts[0];
  const address = usersAddresses[0];


  return new Response(JSON.stringify({userInfo, profile, contacts, address, success: true}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
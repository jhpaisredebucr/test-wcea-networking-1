import Card from "../common/card";

export default function ReferralsMember({userInfo}) {
    return (
        <div>
            <p>Your Referral Code: {userInfo?.referral_code}</p>

            <div className="grid grid-cols-2 gap-5 mt-5">
                <Card title="Total Referred" value="0" info=""/>
                <Card title="Pending" value="0" info=""/>
            </div>

            <div className="grid grid-cols-4 shadow-sm p-5 mt-5 rounded-lg bg-white">
                <div>
                    <p>Username</p> 
                </div>
                <div>
                    <p>Full Name</p>
                </div>
                <div>
                    <p>Data Joined</p>
                </div>
                <div>
                    <p>Status</p>
                </div>
            </div>
        </div>
    )
}
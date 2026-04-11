import SemanticCard from "@/app/components/ui/SemanticCard";
import WithdrawCard from "../components/ui/WithdrawCard";

export default function Withdraw(){

    
    return (<>
        <div className="grid md:grid-cols-2 sm:grid-cols-1">
            <WithdrawCard
                title="Withdrawal Card"
            >

                <SemanticCard semantic={"neutral"}>
                    Semantic Card
                </SemanticCard>
                
                <SemanticCard semantic={"success"}>
                    Semantic Card
                </SemanticCard>
                
                <SemanticCard semantic={"error"}>
                    Semantic Card
                </SemanticCard>
                
                
                test
            </WithdrawCard>

            <WithdrawCard>

            </WithdrawCard>
        </div>
    </>)
}
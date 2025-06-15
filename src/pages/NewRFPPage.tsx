
import { NewRFPForm } from "@/components/rfps/NewRFPForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const NewRFPPage = () => {
  return (
    <div className="p-4 md:p-8">
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Submit a new RFP</CardTitle>
                <CardDescription>Fill out the form below to add a new Request for Proposal to the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <NewRFPForm />
            </CardContent>
        </Card>
    </div>
  );
};

export default NewRFPPage;

import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { AssignSchools } from "../components/AssignSchools";
import { Page } from "../layout/Page";

export const AdminAssignSchools = () => {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <Page>
            <PageHeader title="Assign Schools" subTitle="Select which schools this user can access.">
                
            </PageHeader>

            <AssignSchools
                apiSchoolMethod="linkUser"
                preLoadData={{userId: params.userId}}
                onLoadMap={(school)=>{
                    return school.attributes.schoolLinks.find((link)=>{
                        return params.userId === link.attributes.userId;
                    });
                }}
                onAssigedMap={(link, newLink)=>link.id === newLink.id}
            />
        </Page>
    );
};

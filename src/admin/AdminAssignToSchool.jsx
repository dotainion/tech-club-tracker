import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { PageHeaderButton } from "../components/PageHeaderButton";
import { routes } from "../routes/Routes";
import { AssignSchools } from "../components/AssignSchools";
import { Page } from "../layout/Page";

export const AdminAssignToSchool = () => {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <Page>
            {/* Header */}
            <PageHeader title="Assign Group to School" subTitle="Select the schools the group can be linked to.">
                <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().admin())}>
                    🏡 Home
                </PageHeaderButton>
            </PageHeader>
            
            <AssignSchools
                apiSchoolMethod="linkGroup"
                preLoadData={{groupId: params.groupId}}
                onLoadMap={(school)=>{
                    return school.attributes.linkToGroup.find((link)=>{
                        return params.groupId === link.attributes.groupId;
                    });
                }}
                onAssigedMap={(link, newLink)=>link.id === newLink.attributes.schoolId}
            />
        </Page>
    );
};

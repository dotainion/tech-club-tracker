import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { PageHeaderButton } from "../components/PageHeaderButton";
import { routes } from "../routes/Routes";
import { AssignGroups } from "../components/AssignGroups";
import { Page } from "../layout/Page";

export const AdminAssignToGroup = () => {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <Page>
            {/* Header */}
            <PageHeader title="Assign School to Group" subTitle="Select the group the school can be linked to.">
                <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().admin())}>
                    🏡 Home
                </PageHeaderButton>
            </PageHeader>
            
            <AssignGroups
                apiGroupMethod="linkSchool"
                preLoadData={{schoolId: params.schoolId}}
                onLoadMap={(group)=>{
                    console.log(group);
                    return group.attributes.linkToSchools.find((link)=>{
                        return params.schoolId === link.attributes.schoolId;
                    });
                }}
                onAssigedMap={(link, newLink)=>link.id === newLink.attributes.groupId}
            />
        </Page>
    );
};

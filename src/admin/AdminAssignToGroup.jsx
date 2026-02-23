import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { AssignGroups } from "../components/AssignGroups";
import { Page } from "../layout/Page";
import { useEffect, useState } from "react";
import { api } from "../request/Api";

export const AdminAssignToGroup = () => {
    const [school, setSchool] = useState(null);

    const params = useParams();

    useEffect(()=>{
        api.school.list({schoolId: params.schoolId}).then((response)=>{
            setSchool(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    return (
        <Page>
            {/* Header */}
            <PageHeader title="Assign School to Group" subTitle="Select the group the school can be linked to.">
                
            </PageHeader>

            {school && (
                <h6>{school.attributes.name}</h6>
            )}
            
            <AssignGroups
                apiGroupMethod="linkSchool"
                preLoadData={{schoolId: params.schoolId}}
                onLoadMap={(group)=>{
                    return group.attributes.linkToSchools.find((link)=>{
                        return params.schoolId === link.attributes.schoolId;
                    });
                }}
                onAssigedMap={(link, newLink)=>link.id === newLink.attributes.groupId}
            />
        </Page>
    );
};

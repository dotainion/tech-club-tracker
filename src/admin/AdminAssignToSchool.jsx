import { useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { AssignSchools } from "../components/AssignSchools";
import { Page } from "../layout/Page";
import { api } from "../request/Api";
import { useState } from "react";

export const AdminAssignToSchool = () => {
    const [group, setGroup] = useState(null);

    const params = useParams();
    
    useEffect(()=>{
        api.group.list({groupId: params.groupId}).then((response)=>{
            setGroup(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    return (
        <Page>
            {/* Header */}
            <PageHeader title="Assign Group to School" subTitle="Select the schools the group can be linked to.">
                
            </PageHeader>

            {group && (
                <h6>{group.attributes.name}</h6>
            )}
            
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
